<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

use Illuminate\Pagination\LengthAwarePaginator;

use App\Http\Resources\ModelResourse;
use Illuminate\Support\Facades\Schema;

class RequestCollection extends ResourceCollection
{
    public static $wrap = 'entities';
    private $data;
    private $filtros;
    
    public function __construct($data, $filtros=[])
    {
        $this->data = new LengthAwarePaginator($data->items(), $data->total(), $data->perPage(), $data->currentPage());
        $this->filtros = $filtros;
    }

    protected function getBoolean(mixed $registros){
        foreach($registros as $registro){
            foreach ($registro->getAttributes() as $clave => $valor){
                $fieldType = Schema::getColumnType(class_basename($registro), $clave);
                if ($fieldType === 'boolean') {
                    ($valor==0)?$registro[$clave]=false:$registro[$clave]=true;
                }
            }
        }
        return $registros;
    }

    public function toArray($data){
        $datos = $this->data;
        
        if($this->filtros!=[]){
            foreach($this->filtros as $clave => $valor) {
                $datos = $datos->filter(function ($item) use ($clave, $valor) {
                    return $item[$clave] == $valor;
                });
            }
            $paginaActual = $this->data->currentPage();
            $porPagina = $this->data->perPage();
            $total = $datos->count();
            $items = $datos->forPage($paginaActual, $porPagina)->values();        
            $this->data = new LengthAwarePaginator($items, $total, $porPagina, $paginaActual);
        }

        $datos = $this->getBoolean($datos);

        //agrega informacion de las claves foraneas
        $addFkData = new ModelResourse(null,'');
        $datos=$addFkData->addFkData($datos);
        
        return $datos->values()->toArray();
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