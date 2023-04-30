<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModelResourse extends JsonResource
{
    public static $wrap = 'entities';

    private $model = '';
    
    public function __construct($resource, $model = '')
    {
        // Llama al constructor de la clase padre
        parent::__construct($resource);

        // Añade aquí tu propio código personalizado
        if (class_exists($model)) {
            $this->model = $model;
        }
    }

    public function toArray($request)
    {
        if ($this->model != ''){
            $modelo = new $this->model();
            $datos = $modelo::where('id'.$this->model,$request->get('id'))
                                ->get()->toArray();
            return $datos;
        }
        else return [];
    }

    public function with($request)
    {
        return [
            'message' => '',
            'succeded' => true
        ];
    }
}
