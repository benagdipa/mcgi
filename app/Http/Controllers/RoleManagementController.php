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
        $request->validate([
            'name' => 'required|unique:roles,name',
        ]);

        if (!empty($request->input('permissions')) && is_array($request->input('permissions'))) {
            foreach ($request->input('permissions') as $permission) {
                $permissionExists = Permission::where('name', $permission)->exists();
                if (!$permissionExists) {
                    Permission::create(['name' => $permission]);
                }
            }
        }
        $role = Role::create(['name' => $request->name]);
        $role->givePermissionTo($request->input('permissions'));
        return to_route('admin.roles.index');
    }

    public function admin_update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $role = Role::findOrFail($id);
        if (!empty($request->input('permissions')) && is_array($request->input('permissions'))) {
            foreach ($request->input('permissions') as $permission) {
                $permissionExists = Permission::where('name', $permission)->exists();
                if (!$permissionExists) {
                    Permission::create(['name' => $permission]);
                }
            }
        }
        if ($role) {
            $role->name = $request->name;
            $role->update();
            $newPermissions = Permission::whereIn('name', $request->permissions)->get();
            $role->permissions()->detach();
            $role->syncPermissions($newPermissions);
            return to_route('admin.roles.index');
        }
    }

    public function admin_delete($id)
    {
        $role = Role::findOrFail($id);
        if ($role && $role->name !== 'guest') {
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
            $role->delete();
            return to_route('admin.roles.index');
        }

    }
}
