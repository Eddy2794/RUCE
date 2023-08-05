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

    private function filterData($data)
    {
        $datos = $data;

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
        return $datos;
    }

    private function adjustForeignKeys($data)
    {
        $data->transform(function ($item) {
            foreach ($item->getAttributes() as $clave => $valor) {
                if (str_contains($clave, 'fk')) {
                    $foraneo = substr($clave, 2);
                    //$item[$clave] = $item->$foraneo->toArray();
                    $item->$foraneo;
                    //dd($item->toArray());
                }
            }
            return $item;
        });
        return $data;
    }

    public function toArray($data){
        $datos = $this->filterData($this->data);

        //agrega informacion de las claves foraneas
        $datos = $this->adjustForeignKeys($datos);
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
