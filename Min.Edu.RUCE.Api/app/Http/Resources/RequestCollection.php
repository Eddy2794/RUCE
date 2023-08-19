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
    private $paginaActual;
    private $porPagina;
    private $total;
    private $filtros;
    private $desc;
    private $campos;
    
    public function __construct($data, $perPage=10, $currentPage=0, $filtros=[], $descContains="")
    {
        $this->data = new LengthAwarePaginator($data, $data->count(), $perPage, $currentPage);
        $this->paginaActual = $currentPage;
        $this->porPagina = $perPage;
        $this->total = $data->count();
        $this->filtros = $filtros?$filtros:[];
        if ($descContains!="" && $descContains!=null) {
            $this->desc = $descContains;
            $this->campos = $this->data->items()[0]->getFillable();
        }
    }

    private function filterData($datos)
    {
        foreach($this->filtros as $clave => $valor) {
            $datos = $datos->filter(function ($item) use ($clave, $valor) {
                return $item[$clave] == $valor;
            });
        }
        $this->total = $datos->count();
        $items = $datos->forPage($this->paginaActual, $this->porPagina)->values();
        $this->data = new LengthAwarePaginator($items, $this->total, $this->porPagina, $this->paginaActual);
        $datos = $this->data;
        return $datos;
    }

    private function adjustForeignKeys($data)
    {
        $data->transform(function ($item) {
            foreach ($item->getAttributes() as $clave => $valor) {
                if (str_contains($clave, 'fk')) {
                    $foraneo = substr($clave, 2);
                    $item->$foraneo;
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
        
        $datos = $query->get();

        $this->total = $datos->count();
        
        $items = $datos->forPage($this->paginaActual, $this->porPagina)->values();

        $this->data = new LengthAwarePaginator($items, $this->total, $this->porPagina, $this->paginaActual);

        return $this->data;
    }

    public function toArray($data){
        $datos = $this->filterData($this->data);

        if($this->campos != [])
            $datos = $this->busqueda($datos,$this->campos,$this->desc);

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
                'entityCount' => $this->total,
                'pageSize' => $this->porPagina,
                'pageNumber' => $this->paginaActual
            ]
        ];
    }
}
