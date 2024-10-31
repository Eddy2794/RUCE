<?php

namespace Database\Seeders;

use App\Models\PersonaRUCE;
use Illuminate\Database\Seeder;

class PersonaRUCESeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $persona1 = new PersonaRUCE();
        $persona1->fkRefTipoDocumentoRUCE = 1;
        $persona1->documento = 12345678;
        $persona1->cuil = 27123456787;
        $persona1->email = "super_admin@ruce.com";
        $persona1->nombre = "super";
        $persona1->apellido = "admin";
        $persona1->telefono = 3885143456;
        $persona1->idUsuarioAlta = 1;
        $persona1->idUsuarioModificacion = 1;
        $persona1->save();

        $persona2 = new PersonaRUCE();
        $persona2->fkRefTipoDocumentoRUCE = 1;
        $persona2->documento = 44706400;
        $persona2->cuil = 20447064007;
        $persona2->email = "admin@ruce.com";
        $persona2->nombre = "admin";
        $persona2->apellido = "admin";
        $persona2->telefono = 3884558285;
        $persona2->idUsuarioAlta = 1;
        $persona2->idUsuarioModificacion = 1;
        $persona2->save();

        $persona3 = new PersonaRUCE();
        $persona3->fkRefTipoDocumentoRUCE = 1;
        $persona3->documento = 44706401;
        $persona3->cuil = 20447064018;
        $persona3->email = "viewer@ruce.com";
        $persona3->nombre = "viewer";
        $persona3->apellido = "viewer";
        $persona3->telefono = 3884558123;
        $persona3->idUsuarioAlta = 1;
        $persona3->idUsuarioModificacion = 1;
        $persona3->save();
    }
}
