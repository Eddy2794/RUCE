<?php

namespace App\Http\Resources;

use App\Models\Balance;
use Illuminate\Http\Resources\Json\JsonResource;

class BalanceResourse extends JsonResource
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
        $model = new Balance();
        $datos = $model::where('idBalance',$request->get('id'))->get()->toArray();
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
