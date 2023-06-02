<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FondoIndexResourse extends JsonResource
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
            'fkTipoFondo',
            'fkCooperadora',
            'fondoRecibido',
            'fondoRendido',
            'monto',
            'fechaRecibido',
            'fechaRendicion',
            'anioOtorgado',
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
