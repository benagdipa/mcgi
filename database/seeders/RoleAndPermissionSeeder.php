<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // create super admin role if it doesn't exist
        if (!Role::where('name', 'super-admin')->exists()) {
            $superAdminRole = Role::create(['name' => 'super-admin']);
        } else {
            $superAdminRole = Role::where('name', 'super-admin')->first();
        }
        $superAdminEmail = 'sanjay1@pcsoftnepal.com';
        $user = User::where('email', $superAdminEmail)->first();

        if ($user) {
            if (!$user->hasRole('super-admin')) {
                $user->assignRole($superAdminRole);
            }
        } else {
            $newUser = User::create([
                'first_name' => "Super",
                'last_name' => "Admin",
                'email' => $superAdminEmail,
                'phone' => '1234567890',
                'local' => '1',
                'privacy' => false,
                'password' => Hash::make(''),
            ]);
            $newUser->assignRole($superAdminRole);
        }
        if (!Role::where('name', 'guest')->exists()) {
            $superAdminRole = Role::create(['name' => 'guest']);
        }
        
        // Permission::create(['name' => 'create-users']);
        // Permission::create(['name' => 'edit-users']);
        // Permission::create(['name' => 'delete-users']);

        // Permission::create(['name' => 'create-blog-posts']);
        // Permission::create(['name' => 'edit-blog-posts']);
        // Permission::create(['name' => 'delete-blog-posts']);

        // $adminRole = Role::create(['name' => 'admin']);
        // $editorRole = Role::create(['name' => 'user']);

        // $adminRole->givePermissionTo([
        //     'create-users',
        //     'edit-users',
        //     'delete-users',
        //     'create-blog-posts',
        //     'edit-blog-posts',
        //     'delete-blog-posts',
        // ]);

        // $editorRole->givePermissionTo([
        //     'create-blog-posts',
        //     'edit-blog-posts',
        //     'delete-blog-posts',
        // ]);
    }
}
