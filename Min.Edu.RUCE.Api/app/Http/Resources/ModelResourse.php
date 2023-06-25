<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModelResourse extends JsonResource
{
    public static $wrap = 'entities';

    private $model = '',$nombre;
    private $id;
    
    public function __construct($resource=null, $nombre = '')
    {
        if($resource != null){
            // Llama al constructor de la clase padre
            parent::__construct($resource);

            // Añade aquí tu propio código personalizado
            if (class_exists('App\Models'.'\\'.$nombre)) {
                $this->model = 'App\Models'.'\\'.$nombre;
                $this->nombre = $nombre;
                $this->id = $resource;
            }
        }
    }

    public function addFkData(Object $datos, $completo=true){
        //obtiene los datos de cada clave foranea que contenga cualquier modelo
        foreach ($datos as $registro) {
            foreach ($registro->getAttributes() as $clave => $valor) {
                if(str_contains($clave,'fk')){
                    $modelo = 'App\Models'.'\\'.substr($clave,2);
                    $modelo = new $modelo;
                    $valor = $modelo::where('id',$valor)->get()[0];
                    if($valor!=[])
                        $registro[$clave]=$valor;
                    // if(!$completo){
                    //     $registro->delete()
                    // }
                }
            }
}       return $datos;
    }

    public function toArray($request)
    {
        if ($this->model != ''){
            $modelo = new $this->model();
            $datos = $modelo::where('id',$this->id)->get();

            $datos=$this->addFkData($datos);

            return ['entities'=>$datos[0]];
        }
        else return [
            'entities'=>[]
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
