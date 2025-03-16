<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CreateSuperAdminCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:create-super-admin';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a super admin user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Create permissions table if it doesn't exist
        $tableNames = config('permission.table_names');
        $columnNames = config('permission.column_names');
        
        if (!$this->tableExists($tableNames['roles'])) {
            $this->info('Creating permissions tables...');
            $this->call('migrate', ['--path' => 'vendor/spatie/laravel-permission/database/migrations']);
        }
        
        // Create super-admin role if it doesn't exist
        if (!Role::where('name', 'super-admin')->exists()) {
            $superAdminRole = Role::create(['name' => 'super-admin']);
            $this->info('Super admin role created');
        } else {
            $superAdminRole = Role::where('name', 'super-admin')->first();
            $this->info('Super admin role already exists');
        }
        
        // Create the super admin user
        $email = 'benedick.agdipa@mcgi.org.au';
        $user = User::where('email', $email)->first();
        
        if ($user) {
            // Update existing user
            $user->update([
                'first_name' => 'Benedick',
                'last_name' => 'Agdipa',
                'admin_approved' => true,
                'email_verified_at' => now(),
            ]);
            
            if (!$user->hasRole('super-admin')) {
                $user->assignRole($superAdminRole);
            }
            
            $this->info('Existing super admin user updated');
        } else {
            // Create new user
            $user = User::create([
                'first_name' => 'Benedick',
                'last_name' => 'Agdipa',
                'email' => $email,
                'phone' => '0450780530',
                'local' => '1',
                'privacy' => true,
                'admin_approved' => true,
                'email_verified_at' => now(),
                'password' => Hash::make('MCGI@ustraliaAdmin123'),
            ]);
            
            $user->assignRole($superAdminRole);
            $this->info('New super admin user created');
        }
        
        $this->info('Super admin user created/updated successfully with email: ' . $email);
    }
    
    /**
     * Check if a database table exists
     */
    private function tableExists($tableName)
    {
        try {
            return \Schema::hasTable($tableName);
        } catch (\Exception $e) {
            $this->error('Error checking table existence: ' . $e->getMessage());
            return false;
        }
    }
} 