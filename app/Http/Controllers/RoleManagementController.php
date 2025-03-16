<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleManagementController extends Controller
{
    public function admin_index()
    {
        $roles = Role::with('permissions')->whereNot('name', 'super-admin')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name')->toArray(),
            ];
        });
        return Inertia::render('Roles/Admin/RoleIndex', [
            'roles' => $roles
        ]);
    }

    public function admin_store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|unique:roles,name',
                'permissions' => 'sometimes|array',
            ]);

            // Create any new permissions that don't exist yet
            if (!empty($request->input('permissions')) && is_array($request->input('permissions'))) {
                foreach ($request->input('permissions') as $permission) {
                    $permissionExists = Permission::where('name', $permission)->exists();
                    if (!$permissionExists) {
                        Permission::create(['name' => $permission]);
                    }
                }
            }

            // Create the role
            $role = Role::create(['name' => $request->name]);
            
            // Assign permissions to the role
            if (!empty($request->input('permissions'))) {
                $role->givePermissionTo($request->input('permissions'));
            }

            return to_route('admin.roles.index')->with('success', 'Role created successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to create role: ' . $e->getMessage()]);
        }
    }

    public function admin_update(Request $request, $id)
    {
        try {
            $request->validate([
                'name' => 'required|unique:roles,name,' . $id,
                'permissions' => 'sometimes|array',
            ]);
            
            $role = Role::findOrFail($id);
            
            // Don't allow modifying system roles
            if ($role->name === 'super-admin') {
                throw new \Exception('The super-admin role cannot be modified.');
            }

            // Create any new permissions that don't exist yet
            if (!empty($request->input('permissions')) && is_array($request->input('permissions'))) {
                foreach ($request->input('permissions') as $permission) {
                    $permissionExists = Permission::where('name', $permission)->exists();
                    if (!$permissionExists) {
                        Permission::create(['name' => $permission]);
                    }
                }
            }
            
            // Update the role name
            $role->name = $request->name;
            $role->update();
            
            // Sync permissions
            if (!empty($request->permissions)) {
                $newPermissions = Permission::whereIn('name', $request->permissions)->get();
                $role->permissions()->detach();
                $role->syncPermissions($newPermissions);
            } else {
                // If no permissions were selected, remove all permissions
                $role->permissions()->detach();
            }
            
            return to_route('admin.roles.index')->with('success', 'Role updated successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to update role: ' . $e->getMessage()]);
        }
    }

    public function admin_delete($id)
    {
        try {
            $role = Role::findOrFail($id);
            
            // Don't allow deleting system roles
            if ($role->name === 'super-admin' || $role->name === 'guest') {
                throw new \Exception('System roles cannot be deleted.');
            }
            
            // Reassign users to the guest role
            $usersAssignedToRole = $role->users()->get();
            if ($usersAssignedToRole->isNotEmpty()) {
                $newRole = Role::findByName('guest');
                if (!$newRole) {
                    $newRole = Role::create(['name' => 'guest']);
                }
                
                foreach ($usersAssignedToRole as $user) {
                    $user->syncRoles([$newRole->name]);
                }
            }
            
            // Delete the role
            $role->delete();
            
            return to_route('admin.roles.index')->with('success', 'Role deleted successfully');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete role: ' . $e->getMessage()]);
        }
    }
}
