<?php

namespace App\Http\Resources;

use Exception;
use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Support\Facades\Schema;

class ModelResourse extends JsonResource
{
    public static $wrap = 'entities';

    private $model = '', $nombre;
    private $id;

    public function __construct($resource = null, $nombre = '')
    {
        if ($resource != null) {
            // Llama al constructor de la clase padre
            parent::__construct($resource);

            // 
            if (class_exists('App\Models' . '\\' . $nombre)) {
                $this->model = 'App\Models' . '\\' . $nombre;
                $this->nombre = $nombre;
                $this->id = $resource;
            }
        }
    }

    public function addFkData($data)
    {
        //obtiene los datos de cada clave foranea que contenga cualquier modelo
        $data->transform(function ($item) {
            foreach ($item->getAttributes() as $clave => $valor) {
                if (str_contains($clave, 'fk')) {
                    $foraneo = substr($clave, 2);
                    // $item[$clave] = $item->$foraneo->toArray();
                    // dd($item[$clave]);
                    if($valor)
                        $item->$foraneo->toArray();
                }
            }
            return $item;
        });
        return $data;
    }

    public function toArray($request)
    {
        if ($this->model !== '' && $this->model !== 'App\Models\Cooperadora' && $this->model !== 'App\Models\OrganizacionRUCE') {
            // crea una instancia del modelo dianmico
            $modelo = new $this->model();
            // obtiene los datos del modelo dianmico
            $datos = $modelo::where('id', $this->id)->get();

            // agrega los datos de las claves foraneas
            $datos = $this->addFkData($datos);

            return ['entities' => $datos[0]];
        } else {
            if ($this->model == 'App\Models\Cooperadora') {
                $cooperadora = new $this->model();
                $datos = $cooperadora::with(['OrganizacionRUCE', 'RefTipoAsociacion', 'AtencionSeguimiento', 'Comision', 'Balance', 'Expediente', 'Personeria', 'Fondo', 'Informe_gral'])->find($this->id);

                return ['entities' => $datos->toArray()];
            } elseif ($this->model == 'App\Models\OrganizacionRUCE') {
                $organizacion = new $this->model();
                $datos = $organizacion::with(['Cooperadora'])->find($this->id);
                return ['entities' => $datos->toArray()];
            }
            return [
                'entities' => []
            ];
        }
    }

    public function with($request)
    {
        return [
            'message' => 'Success',
            'succeded' => true
        ];
    }
}
