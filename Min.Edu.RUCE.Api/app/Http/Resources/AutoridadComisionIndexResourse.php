<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AutoridadComisionIndexResourse extends JsonResource
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
            'fkPersonaRUCE',
            'fkRefCargo',
            'fkComision',
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
