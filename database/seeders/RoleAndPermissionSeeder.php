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
                'local' => '1',
                'privacy' => false,
                'password' => Hash::make('mcgi@123'),
            ]);
            $newUser->assignRole($superAdminRole);
        }
        if (!Role::where('name', 'guest')->exists()) {
            $superAdminRole = Role::create(['name' => 'guest']);
        }
    }
}
