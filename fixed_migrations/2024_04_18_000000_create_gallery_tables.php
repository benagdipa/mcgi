<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Albums table
        Schema::create('albums', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('cover_image')->nullable();
            $table->boolean('is_public')->default(true);
            $table->foreignId('category_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes();
            
            // Add indexes for better MySQL performance
            $table->index('is_public');
        });
        
        // Attachments table (for images in albums)
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('album_id')->constrained()->onDelete('cascade');
            $table->string('file_path');
            $table->string('file_name');
            $table->string('file_type');
            $table->integer('file_size');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->integer('display_order')->default(0);
            $table->timestamps();
            $table->softDeletes();
            
            // Add indexes for better MySQL performance
            $table->index('file_type');
            $table->index('display_order');
        });
        
        // Banner albums for specific site sections
        Schema::create('banner_albums', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location'); // header, home-slider, etc.
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
        
        // Banner images
        Schema::create('banner_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('banner_album_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_link')->nullable();
            $table->integer('position')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Add index for ordered display
            $table->index('position');
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('banner_images');
        Schema::dropIfExists('banner_albums');
        Schema::dropIfExists('attachments');
        Schema::dropIfExists('albums');
    }
}; 