<?php

namespace Database\Seeders;

use App\Models\RefCargo;
use App\Models\RefTipoAsociacion;
use App\Models\RefTipoComision;
use App\Models\RefTipoDocumentoRUCE;
use App\Models\RefTipoFondo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RefSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Tipos de Documento
        $refTipoDocumento = new RefTipoDocumentoRUCE();
        $refTipoDocumento->tipoDocumentoDesc = '';
        $refTipoDocumento->save();




        // Tipos de Cargo
        $refCargo = new RefCargo();
        $refCargo->cargoDesc = '';
        $refCargo->save();




        // Tipos de Asociacion
        $refTipoAsociacion = new RefTipoAsociacion();
        $refTipoAsociacion->tipoAsociacionDesc = "Asociacion Simple";
        $refTipoAsociacion->save();

        $refTipoAsociacion = new RefTipoAsociacion();
        $refTipoAsociacion->tipoAsociacionDesc = "Asociacion Civil";
        $refTipoAsociacion->save();




        // Tipos de Comision
        $refTipoComision = new RefTipoComision();
        $refTipoComision->tipoComisionDesc = '';
        $refTipoComision->save();




        // Tipos de Fondo
        $refTipoFondo = new RefTipoFondo();
        $refTipoFondo->tipoFondoDesc = '';
        $refTipoFondo->save();
    }
}
