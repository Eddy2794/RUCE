<?php

namespace Database\Seeders;

use App\Models\TipoAsociacion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TipoAsociacionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $asociacionSimple = new TipoAsociacion();
        $asociacionSimple->descripcion = "Asociacion Simple";
        $asociacionSimple->save();


        $asociacionCivil = new TipoAsociacion();
        $asociacionCivil->descripcion = "Asociacion Civil";
        $asociacionCivil->save();
    }
}
