<?php

namespace App\Http\Resources;

use Exception;
use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Support\Facades\Schema;
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

    private function recFkData(mixed $registro){
        try{
            foreach ($registro->getAttributes() as $clave => $valor){                
                if(str_contains($clave,'fk')){
                    $modelo = 'App\Models'.'\\'.substr($clave,2);
                    $modelo = new $modelo;
                    $valor = $modelo::where('id',$valor)->get()[0];
                    if($valor!=[]){
                        unset($valor['created_at']);
                        unset($valor['updated_at']);
                        unset($valor['deleted_at']);
                        // unset($valor['idUsuarioAlta']);
                        // unset($valor['idUsuarioModificacion']);
                        $registro[$clave]=$this->recFkData($valor);
                    }
                }
            }
            return $registro;
        }
        catch(Exception){
            return $registro;
        }
    }

    public function addFkData(Object $datos){
        //obtiene los datos de cada clave foranea que contenga cualquier modelo
        foreach ($datos as $registro)
            $registro = $this->recFkData($registro);
        return $datos;
    }

    public function toArray($request)
    {
        if ($this->model != ''){
            // crea una instancia del modelo dianmico
            $modelo = new $this->model();

            // obtiene los datos del modelo dianmico
            $datos = $modelo::where('id',$this->id)->get();

            // agrega los datos de las claves foraneas
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
            'message' => 'Success',
            'succeded' => true
        ];
    }
}
