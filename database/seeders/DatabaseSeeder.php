<?php

namespace Database\Seeders;

use App\Models\ServiceCode;
use App\Models\StateId;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        ServiceCode::insert([
            [
                'service_code' => 'TB0',
                'number_of_items' => 1,
                'total_weight' => 1,
                'total_cubit_volume' => '0.004',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_code' => 'TB1',
                'number_of_items' => 1,
                'total_weight' => 1,
                'total_cubit_volume' => '0.004',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_code' => 'TB3',
                'number_of_items' => 1,
                'total_weight' => 3,
                'total_cubit_volume' => '0.012',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_code' => 'TB5',
                'number_of_items' => 1,
                'total_weight' => 5,
                'total_cubit_volume' => '0.02',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_code' => 'TBKG',
                'number_of_items' => 1,
                'total_weight' => 7,
                'total_cubit_volume' => '0.03438',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service_code' => 'TBKG',
                'number_of_items' => 1,
                'total_weight' => 8,
                'total_cubit_volume' => '0.03438',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        StateId::insert([
            [
                'state_id' => 1,
                'name' => 'Australian Capital Territory',
                'code' => 'ACT',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'state_id' => 2,
                'name' => 'New South Wales',
                'code' => 'NSW',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'state_id' => 3,
                'name' => 'Northern Territory',
                'code' => 'NT',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'state_id' => 4,
                'name' => 'Queensland',
                'code' => 'QLD',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'state_id' => 5,
                'name' => 'South Australia',
                'code' => 'SA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'state_id' => 6,
                'name' => 'Tasmania',
                'code' => 'TAS',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'state_id' => 7,
                'name' => 'Victoria',
                'code' => 'VIC',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'state_id' => 8,
                'name' => 'Western Australia',
                'code' => 'WA',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
