<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BannerAlbums;
use App\Models\BannerImage;

class BannerTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a default banner album
        $album = \App\Models\BannerAlbums::firstOrCreate(
            ['name' => 'Home Slider'],
            [
                'location' => 'home-slider',
                'is_active' => true
            ]
        );

        // Create sample banner images
        $banners = [
            [
                'title' => 'Welcome to MCGI',
                'image_path' => 'sample-banner-1.jpg',
                'bannerpath' => 'sample-banner-1.jpg',
                'description' => 'Join us for worship and fellowship',
                'button_text' => 'Learn More',
                'button_link' => '/about-us',
                'position' => 1,
                'is_active' => true
            ],
            [
                'title' => 'Upcoming Events',
                'image_path' => 'sample-banner-2.jpg',
                'bannerpath' => 'sample-banner-2.jpg',
                'description' => 'Check out our upcoming events',
                'button_text' => 'View Events',
                'button_link' => '/events',
                'position' => 2,
                'is_active' => true
            ],
            [
                'title' => 'Latest News',
                'image_path' => 'sample-banner-3.jpg',
                'bannerpath' => 'sample-banner-3.jpg',
                'description' => 'Stay updated with our latest news',
                'button_text' => 'Read More',
                'button_link' => '/blogs',
                'position' => 3,
                'is_active' => true
            ]
        ];

        foreach ($banners as $banner) {
            \App\Models\BannerImage::firstOrCreate(
                ['title' => $banner['title']],
                array_merge($banner, ['banner_album_id' => $album->id])
            );
        }
    }
}
