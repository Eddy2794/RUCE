<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RefCargoIndexResourse extends JsonResource
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
            'cargoDesc'
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
