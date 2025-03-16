<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure super-admin role exists
        if (!Role::where('name', 'super-admin')->exists()) {
            $superAdminRole = Role::create(['name' => 'super-admin']);
        } else {
            $superAdminRole = Role::where('name', 'super-admin')->first();
        }
        
        // Super admin details
        $superAdminEmail = 'benedick.agdipa@mcgi.org.au';
        $user = User::where('email', $superAdminEmail)->first();

        if ($user) {
            // If user exists, make sure they have super-admin role
            if (!$user->hasRole('super-admin')) {
                $user->assignRole($superAdminRole);
            }
            // Update existing user data
            $user->update([
                'first_name' => "Benedick",
                'last_name' => "Agdipa",
                'admin_approved' => true,
                'email_verified_at' => now(),
            ]);
        } else {
            // Create the super admin account
            $newUser = User::create([
                'first_name' => "Benedick",
                'last_name' => "Agdipa",
                'email' => $superAdminEmail,
                'phone' => '0450780530',
                'locale' => '1',
                'privacy' => true,
                'admin_approved' => true,
                'email_verified_at' => now(),
                'password' => Hash::make('MCGI@ustraliaAdmin123'),
            ]);
            $newUser->assignRole($superAdminRole);
        }
    }
} 