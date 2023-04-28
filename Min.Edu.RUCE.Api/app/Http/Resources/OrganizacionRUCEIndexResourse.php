<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OrganizacionRUCEIndexResourse extends JsonResource
{
    public static $wrap = 'entities';
    
    public function toArray($request)
    {
        return [
            'idOrganizacionRUCE',
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
            'created_at',
            'updated_at',
            'fechaEliminacion',
            'idUsuarioAlta',
            'idUsuarioModificacion'
        ];
    }

    public function with($request)
    {
        return [
            'sessage' => '',
            'succeded' => true
        ];
    }
}
