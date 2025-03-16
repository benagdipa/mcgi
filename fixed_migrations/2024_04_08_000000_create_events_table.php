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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->longText('content')->nullable();
            $table->string('location');
            $table->string('address')->nullable();
            $table->string('category');
            $table->enum('event_type', ['internal', 'external'])->default('internal');
            $table->boolean('requires_registration')->default(true);
            $table->integer('max_attendees')->nullable();
            $table->string('featured_image')->nullable();
            $table->foreignId('author')->nullable()->constrained('users')->onDelete('set null');
            $table->string('status')->default('publish');
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->timestamps();
            $table->softDeletes();
            
            // Add indexes for better MySQL performance
            $table->index('start_date');
            $table->index('end_date');
            $table->index('status');
            $table->index('event_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
}; 