<?php

namespace App\Http\Resources;

use App\Models\AutoridadComision;
use Illuminate\Http\Resources\Json\JsonResource;

class AutoridadComisionResourse extends JsonResource
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
        $model = new AutoridadComision();
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
