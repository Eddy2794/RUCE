<?php

namespace App\Http\Resources;

use App\Models\OrganizacionRUCE;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizacionRUCEResourse extends JsonResource
{
    public static $wrap = 'entities';
    
    public function toArray($request)
    {
        $model = new OrganizacionRUCE();
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
