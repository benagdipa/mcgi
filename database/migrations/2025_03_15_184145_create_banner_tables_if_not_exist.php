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
        if (!Schema::hasTable('banner_albums')) {
            Schema::create('banner_albums', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('location'); // header, home-slider, etc.
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('banner_images')) {
            Schema::create('banner_images', function (Blueprint $table) {
                $table->id();
                $table->foreignId('banner_album_id')->nullable()->constrained()->onDelete('cascade');
                $table->string('image_path')->nullable();
                $table->string('bannerpath')->nullable();
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
        } else {
            // Ensure bannerpath column exists
            if (!Schema::hasColumn('banner_images', 'bannerpath')) {
                Schema::table('banner_images', function (Blueprint $table) {
                    $table->string('bannerpath')->nullable();
                });
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // We don't want to drop the tables in the down method
        // as they might contain important data
    }
};
