<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AutoridadOrganizacionRUCEIndexResourse extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */

    public static $wrap = 'entities';

    public function toArray($request)
    {
        return [
            'fkRefCargo',
            'fkPersonaRUCE',
            'fkOrganizacionRUCE',
            'inicioCargo',
            'finCargo',
            'estaActivo',
            'fechaEliminacion',
            'idUsuarioAlta',
            'idUsuarioModificacion'
        ];
    }

    public function with($request)
    {
        return [
            'messaje' => '',
            'succes' => true
        ];
    }
}
