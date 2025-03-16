<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Welcome to MCGI',
                'slug' => 'welcome-to-mcgi',
                'excerpt' => 'Welcome to the Members Church of God International Australia website.',
                'content' => 'We are delighted to welcome you to our online platform. Here you will find information about our services, events, and community.',
                'meta_title' => 'Welcome to MCGI Australia',
                'meta_description' => 'Official website of Members Church of God International in Australia',
                'status' => 'published',
                'category_id' => 1, // News category
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Upcoming Events',
                'slug' => 'upcoming-events',
                'excerpt' => 'Check out our upcoming events and activities.',
                'content' => 'Stay tuned for our upcoming events. We have many exciting activities planned for our community.',
                'meta_title' => 'MCGI Australia Events',
                'meta_description' => 'Upcoming events and activities at MCGI Australia',
                'status' => 'published',
                'category_id' => 2, // Events category
                'published_at' => now(),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        foreach ($posts as $post) {
            DB::table('posts')->insert($post);
        }
    }
}
