<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            [
                'name' => 'MCGI Adelaide',
                'address' => '272-274 North East Road',
                'city' => 'Klemzig',
                'state' => 'SA',
                'postal_code' => '5087',
                'locale_id' => 5, // Adelaide
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Barmera',
                'address' => '19 Kelly Ave',
                'city' => 'Barmera',
                'state' => 'SA',
                'locale_id' => 5, // Adelaide
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Brisbane',
                'address' => '8 Boyland Avenue',
                'city' => 'Coopers Plains',
                'state' => 'QLD',
                'locale_id' => 4, // Brisbane
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Cairns',
                'address' => '7 Forest Gardens Blvd',
                'city' => 'Mount Sheridan',
                'state' => 'QLD',
                'postal_code' => '4868',
                'locale_id' => 6, // Cairns
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Canberra',
                'city' => 'Canberra',
                'state' => 'ACT',
                'has_physical_location' => false
            ],
            [
                'name' => 'MCGI Darwin',
                'address' => '4/5 Damaso Place',
                'city' => 'Woolner',
                'state' => 'NT',
                'postal_code' => '0820',
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Mackay',
                'address' => '2/114 Sydney St',
                'city' => 'Mackay',
                'state' => 'QLD',
                'postal_code' => '4740',
                'locale_id' => 7, // Mackay
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Gladstone',
                'address' => '113 Auckland St',
                'city' => 'Gladstone Central',
                'state' => 'QLD',
                'postal_code' => '6480',
                'locale_id' => 4, // Brisbane
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Moranbah',
                'city' => 'Moranbah',
                'state' => 'QLD',
                'has_physical_location' => false
            ],
            [
                'name' => 'MCGI Sunshine Coast',
                'address' => '65 Currie Street',
                'city' => 'Nambour',
                'state' => 'QLD',
                'postal_code' => '4560',
                'locale_id' => 4, // Brisbane
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Townsville',
                'city' => 'Townsville',
                'state' => 'QLD',
                'has_physical_location' => false
            ],
            [
                'name' => 'MCGI Toowoomba',
                'address' => 'Unit 4, 453 Ruthven Street',
                'city' => 'Toowoomba',
                'state' => 'QLD',
                'postal_code' => '4350',
                'locale_id' => 4, // Brisbane
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Melbourne',
                'address' => 'Unit 5 / 230 Blackshaws Rd',
                'city' => 'Altona North',
                'state' => 'VIC',
                'postal_code' => '3025',
                'locale_id' => 1, // Melbourne
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Perth',
                'address' => '30 Bowen Street',
                'city' => 'Kardinya',
                'state' => 'WA',
                'postal_code' => '6163',
                'locale_id' => 3, // Perth
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Bunbury',
                'city' => 'Bunbury',
                'state' => 'WA',
                'has_physical_location' => false
            ],
            [
                'name' => 'MCGI Kalgoorlie',
                'address' => '66 Burt Street',
                'city' => 'Boulder',
                'state' => 'WA',
                'postal_code' => '6432',
                'locale_id' => 3, // Perth
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Singleton',
                'address' => '154-156 John St',
                'city' => 'Singleton',
                'state' => 'NSW',
                'postal_code' => '2330',
                'locale_id' => 2, // Sydney
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Sydney',
                'address' => 'Unit 11 A, 516-524 Great Western Highway',
                'city' => 'St. Marys',
                'state' => 'NSW',
                'locale_id' => 2, // Sydney
                'has_physical_location' => true
            ],
            [
                'name' => 'MCGI Wodonga',
                'city' => 'Wodonga',
                'state' => 'VIC',
                'has_physical_location' => false
            ],
        ];

        foreach ($locations as $location) {
            DB::table('locations')->insert($location);
        }
    }
} 