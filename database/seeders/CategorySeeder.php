<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'News',
                'slug' => 'news',
                'description' => 'Latest news and updates',
                'type' => 'post',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Events',
                'slug' => 'events',
                'description' => 'Upcoming and past events',
                'type' => 'post',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Announcements',
                'slug' => 'announcements',
                'description' => 'Important announcements',
                'type' => 'post',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert($category);
        }
    }
}
