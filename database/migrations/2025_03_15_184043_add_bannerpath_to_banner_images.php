<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('banner_images', function (Blueprint $table) {
            $table->string('bannerpath')->after('image_path')->nullable();
        });

        // Copy data from image_path to bannerpath
        DB::statement('UPDATE banner_images SET bannerpath = image_path WHERE bannerpath IS NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('banner_images', function (Blueprint $table) {
            $table->dropColumn('bannerpath');
        });
    }
};
