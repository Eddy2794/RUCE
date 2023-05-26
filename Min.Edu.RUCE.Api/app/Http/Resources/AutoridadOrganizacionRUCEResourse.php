<?php

namespace App\Http\Resources;

use App\Models\AutoridadOrganizacionRUCE;
use Illuminate\Http\Resources\Json\JsonResource;

class AutoridadOrganizacionRUCEResourse extends JsonResource
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
        $model = new AutoridadOrganizacionRUCE();
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
