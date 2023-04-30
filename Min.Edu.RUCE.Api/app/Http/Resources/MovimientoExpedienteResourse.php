<?php

namespace App\Http\Resources;

use App\Models\MovimientoExpediente;
use Illuminate\Http\Resources\Json\JsonResource;

class OrganizacionRUCEResourse extends JsonResource
{
    public static $wrap = 'entities';
    
    public function toArray($request)
    {
        $model = new MovimientoExpediente();
        return $model->getFillable();
    }

    public function with($request)
    {
        return [
            'message' => '',
            'succeded' => true
        ];
    }
}
