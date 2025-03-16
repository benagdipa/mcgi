<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class CreateSampleBannerImages extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:create-sample-banner-images';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create sample banner images for the application';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Creating sample banner images...');
        
        // Create the uploads directory if it doesn't exist
        if (!Storage::exists('public/uploads')) {
            Storage::makeDirectory('public/uploads');
        }
        
        // Create sample banner images with different colors
        $bannerImages = [
            'sample-banner-1.jpg' => [255, 100, 100], // Red
            'sample-banner-2.jpg' => [100, 255, 100], // Green
            'sample-banner-3.jpg' => [100, 100, 255], // Blue
        ];
        
        foreach ($bannerImages as $filename => $color) {
            $this->createSampleImage($filename, $color[0], $color[1], $color[2]);
        }
        
        $this->info('Sample banner images created successfully!');
        $this->info('Run "php artisan storage:link" if you haven\'t already to make the images accessible.');
        
        return Command::SUCCESS;
    }
    
    /**
     * Create a sample image with the given color.
     */
    private function createSampleImage($filename, $r, $g, $b)
    {
        // Create a 1200x400 image
        $image = imagecreatetruecolor(1200, 400);
        
        // Set the background color
        $bgColor = imagecolorallocate($image, $r, $g, $b);
        imagefill($image, 0, 0, $bgColor);
        
        // Add some text
        $textColor = imagecolorallocate($image, 255, 255, 255);
        $text = str_replace('.jpg', '', $filename);
        
        // Center the text
        $fontSize = 5;
        $textWidth = imagefontwidth($fontSize) * strlen($text);
        $textHeight = imagefontheight($fontSize);
        $x = (1200 - $textWidth) / 2;
        $y = (400 - $textHeight) / 2;
        
        imagestring($image, $fontSize, $x, $y, $text, $textColor);
        
        // Save the image
        ob_start();
        imagejpeg($image, null, 90);
        $imageData = ob_get_clean();
        
        // Save to storage
        Storage::put('public/uploads/' . $filename, $imageData);
        
        // Free memory
        imagedestroy($image);
        
        $this->info("Created {$filename}");
    }
}
