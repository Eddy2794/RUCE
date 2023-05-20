<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class RequestCollection extends ResourceCollection
{
    public static $wrap = 'entities';
    private $data;
    
    public function __construct($data)
    {
        $this->data = $data;
    }


    public function toArray($data)
    {
        return $this->data->items();
    }

    public function with($data)
    {
        return [
            'message' => '',
            'succeeded' => true,
            'paged' => [
                'entityCount' => $this->data->total(),
                'pageSize' => $this->data->perPage(),
                'pageNumber' => $this->data->currentPage()
            ]
        ];
    }
}
