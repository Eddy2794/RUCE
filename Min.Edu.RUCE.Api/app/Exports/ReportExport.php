<?php

namespace App\Exports;

use App\Models\Informe_gral;
use Maatwebsite\Excel\Concerns\FromCollection;

class ReportExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $informes = Informe_gral::all()->toArray();
        $respuesta = [];
        foreach($informes as $dato){
            array_push($respuesta,[$dato["datos"][0]]);
        }
        return collect($respuesta);
    }
}
