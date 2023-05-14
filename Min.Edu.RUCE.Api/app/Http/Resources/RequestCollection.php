<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class RequestCollection extends ResourceCollection
{
    public static $wrap = 'entities';
    private $data, $request, $cant_entities, $tam_pagina,$cant_entities_page;
    
    public function __construct($request, $data)
    {
        // asignacion de los datos de la peticion
        $this->request = $request;

        // asignacion del tamanio de la pagina
        $this->tam_pagina = intval(ceil(count($data) / $request['pageSize']));

        //asignacion de los datos provenientes de los parametros
        $this->data = $data;
        
        // cuenta la cantidad de elementos se enviar en elementos_pagina
        $this->cant_entities = count($this->data);
    }


    public function toArray($data)
    {
        // determina a partir de que indice toma los registros
        $offset = ($this->request['pageNumber'] - 1) * $this->request['pageSize'];

        // toma los registros a partir del offset teniendo en cuenta pageSize
        $elementos_pagina = array_slice($this->data->toArray(), $offset, $this->request['pageSize']);

        // asignaicon de la cantidad de elementos que se muestran por pagina
        $this->cant_entities_page = count($elementos_pagina);

        return $elementos_pagina;
    }

    public function with($data)
    {
       
        return [
            'message' => '',
            'succeeded' => true,
            'paged' => [
                'entitiyCount' => $this->cant_entities,
                'pageSize' => $this->cant_entities_page,
                'pageIndex' => $this->tam_pagina,
                'pageNumber' =>  intval($this->request['pageNumber'])
            ]
        ];
    }
}
