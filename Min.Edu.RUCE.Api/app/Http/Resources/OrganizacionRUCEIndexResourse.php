<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrganizacionRUCEIndexResourse extends JsonResource
{
    public static $wrap = 'entities';
    
    public function toArray($request)
    {
        return [
            'organizacionDesc',
            'cue',
            'anexo',
            'region',
            'nivel',
            'localidad',
            'departamento',
            'telefono',
            'email',
            'domicilio',
            'estaActivo',
            'fechaEliminacion',
            'idUsuarioAlta',
            'idUsuarioModificacion'
        ];
    }

    public function with($request)
    {
        return [
            'message' => '',
            'succeded' => true
        ];
    }
}
