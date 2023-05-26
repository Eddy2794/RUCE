<?php

namespace App\Http\Resources;

use App\Models\Comision;
use Illuminate\Http\Resources\Json\JsonResource;

class ComisionResourse extends JsonResource
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
        $model = new Comision();
        $datos = $model::where('id',$request->get('id'))->get()->toArray();
        return $datos;
    }

    public function with($request)
    {
        return [
            'message' => '',
            'succeded' => true
        ];
    }
}
