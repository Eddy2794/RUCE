<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CooperadoraIndexResourse extends JsonResource
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
            'fkRefTipoAsociacion',
            'fkOrganizacionRUCE',
            'cuit',
            'legajo',
            'denominacion',
            'estado',
            'convenioCsEconomicas',
            'estadoAfip',
            'estadoRentas',
            'inscripcionRenacopes',
            'estaActivo',
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
