<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('locations', function (Blueprint $table) {
            $table->foreignId('locale_id')->nullable()->constrained('locales')->nullOnDelete();
            $table->index('locale_id');
        });
    }

    public function down(): void
    {
        Schema::table('locations', function (Blueprint $table) {
            $table->dropForeign(['locale_id']);
            $table->dropColumn('locale_id');
        });
    }
}; 