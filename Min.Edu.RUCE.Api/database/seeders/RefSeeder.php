<?php

namespace Database\Seeders;

use App\Models\RefCargo;
use App\Models\RefInstanciaInstrumento;
use App\Models\RefTipoAsociacion;
use App\Models\RefTipoComision;
use App\Models\RefTipoDocumentoRUCE;
use App\Models\RefTipoFondo;
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
        $refTipoDocumento = new RefTipoDocumentoRUCE(['tipoDocumentoDesc' => 'DNI']);
        $refTipoDocumento->save();
        $refTipoDocumento = new RefTipoDocumentoRUCE(['tipoDocumentoDesc' => 'PASAPORTE']);
        $refTipoDocumento->save();





        // Tipos de Cargo
        $refCargo = new RefCargo(['cargoDesc' => 'DIRECTOR']);
        $refCargo->save();
        $refCargo = new RefCargo(['cargoDesc' => 'PRESIDENTE']);
        $refCargo->save();
        $refCargo = new RefCargo(['cargoDesc' => 'SECRETARIO']);
        $refCargo->save();
        $refCargo = new RefCargo(['cargoDesc' => 'TESORERO']);
        $refCargo->save();




        
        // Tipo de Fondo
        $refTipoComision = new RefTipoComision(['tipoComisionDesc'=>'COMISION DIRECTIVA']);
        $refTipoComision->save();
        $refTipoComision = new RefTipoComision(['tipoComisionDesc'=>'COMISION REGULARIZADORA']);
        $refTipoComision->save();




        
        // Tipos de Asociacion
        $refTipoAsociacion = new RefTipoAsociacion(['tipoAsociacionDesc' => "SIMPLE"]);
        $refTipoAsociacion->save();
        $refTipoAsociacion = new RefTipoAsociacion(['tipoAsociacionDesc' => "CIVIL"]);
        $refTipoAsociacion->save();




        
        // Tipos de Fondo
        $refTipoFondo = new RefTipoFondo(['tipoFondoDesc'=>'COOPERAR']);
        $refTipoFondo->save();




        
        
        // Tipo Instancia Instrumento
        $refInstanInstr = new RefInstanciaInstrumento(['instrumentoDesc'=>'SECRETARIA DE BIENESTAR']);
        $refInstanInstr->save();
        $refInstanInstr = new RefInstanciaInstrumento(['instrumentoDesc'=>'FISCALIA']);
        $refInstanInstr->save();
        $refInstanInstr = new RefInstanciaInstrumento(['instrumentoDesc'=>'SECRETARIA DE EQUIDAD']);
        $refInstanInstr->save();




        // Tipo Comision
        $refTipoComision = new RefTipoComision(['tipoComisionDesc' => 'DIRECTIVA']);
        $refTipoComision->save();
        $refTipoComision = new RefTipoComision(['tipoComisionDesc' => 'REGULARIZADORA']);
        $refTipoComision->save();
    }
}
