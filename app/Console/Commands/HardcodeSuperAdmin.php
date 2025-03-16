<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class HardcodeSuperAdmin extends Command
{
    protected $signature = 'app:create-super-admin';
    protected $description = 'Create a hardcoded super admin user';

    public function handle()
    {
        // Create tables if needed
        if (!$this->hasUserTable()) {
            $this->call('migrate');
        }
        
        // Create roles table if needed
        if (!$this->hasRolesTable()) {
            $this->call('migrate', ['--path' => 'vendor/spatie/laravel-permission/database/migrations']);
        }
        
        // Create super admin role
        $superAdminRole = $this->getOrCreateSuperAdminRole();
        
        // Create or update the super admin user
        $email = 'benedick.agdipa@mcgi.org.au';
        $user = User::where('email', $email)->first();
        
        $userData = [
            'first_name' => 'Benedick',
            'last_name' => 'Agdipa',
            'email' => $email,
            'phone' => '0450780530',
            'local' => '1',
            'privacy' => true,
            'admin_approved' => true,
            'password' => Hash::make('MCGI@ustraliaAdmin123'),
            'email_verified_at' => now(),
        ];
        
        try {
            if ($user) {
                $user->update($userData);
                $this->info('Super admin user updated');
            } else {
                $user = User::create($userData);
                $this->info('Super admin user created');
            }
            
            // Assign role
            if (!$user->hasRole('super-admin')) {
                $user->assignRole($superAdminRole);
            }
            
            $this->info('Super admin user set up successfully');
        } catch (\Exception $e) {
            $this->error('Error creating/updating user: ' . $e->getMessage());
        }
    }
    
    private function hasUserTable()
    {
        try {
            return \Schema::hasTable('users');
        } catch (\Exception $e) {
            $this->error('Error checking users table: ' . $e->getMessage());
            return false;
        }
    }
    
    private function hasRolesTable()
    {
        try {
            return \Schema::hasTable('roles');
        } catch (\Exception $e) {
            $this->error('Error checking roles table: ' . $e->getMessage());
            return false;
        }
    }
    
    private function getOrCreateSuperAdminRole()
    {
        if (!Role::where('name', 'super-admin')->exists()) {
            return Role::create(['name' => 'super-admin', 'guard_name' => 'web']);
        }
        
        return Role::where('name', 'super-admin')->first();
    }
} 