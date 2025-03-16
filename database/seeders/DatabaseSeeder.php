<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        // 1. Core system data
        $this->call([
            RoleAndPermissionSeeder::class, // Must run first to set up roles
            SuperAdminSeeder::class,        // Depends on roles
        ]);

        // 2. Reference data
        $this->call([
            LocaleSeeder::class,            // Independent
            CategorySeeder::class,          // Independent
            LocationSeeder::class,          // Depends on locales
            EventsOptionsSeeder::class,     // Independent
        ]);

        // 3. Sample content (only if not in production)
        if (app()->environment() !== 'production') {
            $this->call([
                PostSeeder::class,          // Depends on categories
                BannerTablesSeeder::class,  // Independent
            ]);
        }
    }
}
