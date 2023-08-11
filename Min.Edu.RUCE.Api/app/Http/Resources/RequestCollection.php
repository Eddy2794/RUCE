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
    private $desc;
    private $campos;
    
    public function __construct($data, $filtros=[], $descContain="")
    {
        $this->data = new LengthAwarePaginator($data->items(), $data->total(), $data->perPage(), $data->currentPage());
        $this->filtros = $filtros;
        if ($descContain!==[]) {
            $this->desc = $descContain;
            $this->campos = $this->data->items()[0]->getFillable();
        }
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

    private function busqueda($datos, $campos, $desc)
    {
        $query = get_class($datos->first())::query();
        foreach ($campos as $campo) {
            $query->orWhere($campo, 'LIKE', '%' . $desc . '%');
        }
        return  new LengthAwarePaginator($query->get, $this->data->total(), $this->data->perPage(), $this->data->currentPage());
    }

    public function toArray($data){
        $datos = $this->filterData($this->data);

        // if($this->campos != [])
        //     $datos = $this->busqueda($datos,$this->campos,$this->desc);
        
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
