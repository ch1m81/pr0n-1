<?php

use Illuminate\Database\Seeder;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
			public function run() {
        DB::table('articles')->insert([
            'title' => str_random(10),
            'slugUrl' => str_random(12),
            'blabla' => str_random(256),
        ]);
			}
    }
}
