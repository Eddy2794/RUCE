<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModelResourse extends JsonResource
{
    public static $wrap = 'entities';

    private $model = '',$nombre;
    private $id;
    
    public function __construct($resource, $nombre = '')
    {
        // Llama al constructor de la clase padre
        parent::__construct($resource);

        // Añade aquí tu propio código personalizado
        if (class_exists('App\Models'.'\\'.$nombre)) {
            $this->model = 'App\Models'.'\\'.$nombre;
            $this->nombre = $nombre;
            $this->id = $resource;
        }
    }

    public function toArray($request)
    {
        if ($this->model != ''){
            $modelo = new $this->model();
            $datos = $modelo::where('id'.$this->nombre,$this->id)->get();
            return ['entity'=>$datos];
        }
        else return [
            'entity'=>[]
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
