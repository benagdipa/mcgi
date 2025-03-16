<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class LocaleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('locales')->insert([
            ['title' => 'Melbourne'],
            ['title' => 'Sydney'],
            ['title' => 'Perth'],
            ['title' => 'Brisbane'],
            ['title' => 'Adelaide'],
            ['title' => 'Cairns'],
            ['title' => 'Mackay'],
        ]);
    }
}
