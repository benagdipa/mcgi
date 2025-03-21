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
        // Define all permissions
        $permissions = [
            // Blog Permissions
            'create blog',
            'edit blog',
            'delete blog',
            'view blog',
            
            // Event Permissions
            'create event',
            'edit event',
            'delete event',
            'view event',
            
            // Location Permissions
            'create location',
            'edit location',
            'delete location',
            'view location',
            
            // User Permissions
            'create user',
            'edit user',
            'delete user',
            'view user',
            
            // Role Permissions
            'create role',
            'edit role',
            'delete role',
            'view role',
            
            // Album Permissions
            'create album',
            'edit album',
            'delete album',
            'view album',
            
            // Banner Permissions
            'create banner',
            'edit banner',
            'delete banner',
            'view banner',
            
            // Email Template Permissions
            'create email-template',
            'edit email-template',
            'delete email-template',
            'view email-template',
            
            // Dashboard Permission
            'access dashboard',
            
            // Admin Section Permission
            'access admin',
            
            // Custom permissions for this application
            'manage settings',
            'manage services',
            'manage service times',
            'manage prayer meetings',
            'manage thanksgiving services',
            'manage worship services',
        ];

        // Create permissions if they don't exist
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // create super admin role if it doesn't exist
        if (!Role::where('name', 'super-admin')->exists()) {
            $superAdminRole = Role::create(['name' => 'super-admin']);
        } else {
            $superAdminRole = Role::where('name', 'super-admin')->first();
        }

        // Assign all permissions to the super-admin role
        $superAdminRole->syncPermissions(Permission::all());

        $superAdminEmail = 'support@mcgi.org.au';
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
                'locale' => '1',
                'privacy' => false,
                'password' => Hash::make('mcgi@123'),
            ]);
            $newUser->assignRole($superAdminRole);
        }
        
        if (!Role::where('name', 'guest')->exists()) {
            $guestRole = Role::create(['name' => 'guest']);
        }
    }
}
