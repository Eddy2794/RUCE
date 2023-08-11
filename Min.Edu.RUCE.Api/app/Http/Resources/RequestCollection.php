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
    
    public function __construct($data, $filtros=[], $descContains="")
    {
        $this->data = new LengthAwarePaginator($data->items(), $data->total(), $data->perPage(), $data->currentPage());
        $this->paginaActual = $data->currentPage();
        $this->porPagina = $data->perPage();
        $this->total = $data->total();
        $this->filtros = $filtros;
        if ($descContains!="" && $descContains!=null) {
            $this->desc = $descContains;
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
            $this->total = $datos->count();
            $items = $datos->forPage($this->paginaActual, $this->porPagina)->values();
            $this->data = new LengthAwarePaginator($items, $this->total, $this->porPagina, $this->paginaActual);
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
        
        $datos = $query->get();

        $this->total = $datos->count();
        $this->porPagina = $this->total;
        
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
                'entityCount' => $this->data->total(),
                'pageSize' => $this->data->perPage(),
                'pageNumber' => $this->data->currentPage()
            ]
        ];
    }
}
