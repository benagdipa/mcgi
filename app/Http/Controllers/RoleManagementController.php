<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class RoleManagementController extends Controller
{
    public function admin_index()
    {
        $roles = Role::whereNot('name', 'super-admin')->get();
        return Inertia::render('Roles/Admin/RoleIndex', [
            'roles' => $roles
        ]);
    }

    public function admin_store(Request $request)
    {
        $request->validate([
            'role_name' => 'required|unique:roles,name',
        ]);
        // TODO: Create Permissions based on input and asign permission to the created role



        // $role = Role::create(['name' => $request->name]);
        // $role->givePermissionTo($request->permissions);
        // return redirect()->route('admin.roles.index');
    }
}
