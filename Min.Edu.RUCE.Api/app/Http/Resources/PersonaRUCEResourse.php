<?php

namespace App\Http\Resources;

use App\Models\PersonaRUCE;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonaRUCEResourse extends JsonResource
{
    public static $wrap = 'entities';
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $model = new PersonaRUCE();
        $datos = $model::where('idPersonaRUCE',$request->get('id'))->get()->toArray();
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
