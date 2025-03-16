<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\User;

class ResetPermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'permissions:reset {email? : The email of the user to assign super-admin role to}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset all permissions and assign them to the super-admin role';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Resetting permissions...');

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
        $this->info('Creating permissions...');
        $progressBar = $this->output->createProgressBar(count($permissions));
        $progressBar->start();
        
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
            $progressBar->advance();
        }
        
        $progressBar->finish();
        $this->newLine();

        // Create super-admin role if it doesn't exist
        $this->info('Ensuring super-admin role exists...');
        if (!Role::where('name', 'super-admin')->exists()) {
            $superAdminRole = Role::create(['name' => 'super-admin']);
            $this->info('Super-admin role created.');
        } else {
            $superAdminRole = Role::where('name', 'super-admin')->first();
            $this->info('Super-admin role already exists.');
        }

        // Assign all permissions to the super-admin role
        $this->info('Assigning all permissions to super-admin role...');
        $superAdminRole->syncPermissions(Permission::all());

        // If email is provided, assign super-admin role to that user
        $email = $this->argument('email') ?? 'benedick.agdipa@mcgi.org.au';
        $this->info("Looking for user with email: $email");
        
        $user = User::where('email', $email)->first();
        if ($user) {
            $this->info("User found: {$user->first_name} {$user->last_name}");
            
            // Clear existing roles
            $this->info('Clearing existing roles...');
            $user->roles()->detach();
            
            // Assign super-admin role
            $this->info('Assigning super-admin role...');
            $user->assignRole($superAdminRole);
            
            // Also assign all permissions directly
            $this->info('Assigning all permissions directly...');
            $user->syncPermissions(Permission::all());
            
            $this->info('Done! User now has super-admin role with all permissions.');
        } else {
            $this->error("User with email $email not found.");
            $this->info('Only the super-admin role was updated with all permissions.');
        }

        return Command::SUCCESS;
    }
} 