<?php

namespace Database\Seeders;

use App\Models\Persona;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PersonaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $persona1 = new Persona();
        $persona1->cuil = 27342859127;
        $persona1->email = "edgardo@example.com";
        $persona1->nombre = "Edgardo";
        $persona1->apellido = "Mamani";
        $persona1->telefono = 3885143456;
        $persona1->save();
        
        $persona2 = new Persona();
        $persona2->cuil = 20447064007;
        $persona2->email = "samuel@example.com";
        $persona2->nombre = "Samuel";
        $persona2->apellido = "Paredes";
        $persona2->telefono = 3884558285;
        $persona2->save();    }
}
