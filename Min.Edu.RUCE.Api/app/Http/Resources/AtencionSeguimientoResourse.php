<?php

namespace App\Http\Resources;

use App\Models\AtencionSeguimiento;
use Illuminate\Http\Resources\Json\JsonResource;

class AtencionSeguimientoResourse extends JsonResource
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
        $model = new AtencionSeguimiento();
        $datos = $model::where('idAtencionSeguimiento',$request->get('id'))->get()->toArray();
        return $datos;
    }

    public function with($request){
        return[
            'message' =>'',
            'succeded' => true
        ];
    }
}
