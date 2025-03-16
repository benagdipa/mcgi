<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class EventsOptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            // Check if the table exists
            if (Schema::hasTable('events_options')) {
                // Check if the record already exists
                $exists = DB::table('events_options')->where('name', 'attend_duration')->exists();
                
                if (!$exists) {
                    // Insert the attend_duration option
                    DB::table('events_options')->insert([
                        'name' => 'attend_duration',
                        'value' => '30', // Default to 30 minutes
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    
                    $this->command->info('Events options seeded successfully.');
                } else {
                    $this->command->info('Attend duration option already exists.');
                }
            } else {
                $this->command->error('The events_options table does not exist.');
            }
        } catch (\Exception $e) {
            $this->command->error('Error seeding events options: ' . $e->getMessage());
        }
    }
} 