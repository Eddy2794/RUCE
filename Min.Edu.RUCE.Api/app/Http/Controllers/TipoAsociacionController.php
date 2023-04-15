<?php

namespace App\Http\Controllers;

use App\Models\TipoAsociacion;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class TipoAsociacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = TipoAsociacion::all();
        $respuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => count($data)
            ]
        ];
        return response()->json($respuesta,200);
    }

    public function filtro(Request $request): JsonResponse  
    {
        $estaActivo = $request->query->get('EstaActivo');
        $pageNumber = $request->query->get('PageNumber');
        $pageSize = $request->query->get('PageSize');

        $data = TipoAsociacion::where('estadoActivo',$estaActivo)->get()->toArray();

        $errores = [];

        // dd($data, $estaActivo, $pageNumber, $pageSize);

        // determina a partir de que indice toma los registros
        $offset = ($pageNumber - 1) * $pageSize;

        // toma los registros a partir del offset teniendo en cuenta pageSize
        $elementos_pagina = array_slice($data, $offset, $pageSize);

        $total_paginas = intval(ceil(count($data) / $pageSize));

        // dd($offset/5+1,$elementos_pagina,count($elementos_pagina),$total_paginas);

        // cuenta la cantidad de elementos se enviar en elementos_pagina
        $cantidad = count($elementos_pagina);

        $respuesta = [
            'entities' => $elementos_pagina,
            'succeded' => true,
            'message' => "",
            'errors' => $errores,
            'paged' => [
                'entitiyCount' => $cantidad,
                'pageSize' => count($data),
                'pageIndex' => $total_paginas,
                'pageNumber' =>  intval($pageNumber)
            ]
        ];
        return response()->json($respuesta,200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'descripcion' => 'required',
        ]);
    
        $tipoAsociacion = new TipoAsociacion();
        
        $tipoAsociacion->descripcion = $request->descripcion;

        $tipoAsociacion->save();

        return response($tipoAsociacion);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TipoAsociacion  $tipoAsociacion
     * @return \Illuminate\Http\Response
     */
    public function show(TipoAsociacion $tipoAsociacion): JsonResponse 
    {
        $data = [$tipoAsociacion];
        $cantidad = count($data);

        $errores = [];

        $respuesta = [
            'entities' => $data,
            'succeded' => true,
            'message' => "",
            'errors' => $errores,
            'paged' => [
                'entitiyCount' => $cantidad
            ]
        ];
        return response()->json($respuesta,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\TipoAsociacion  $tipoAsociacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, TipoAsociacion $tipoAsociacion)
    {
        $request->validate([
            'descripcion' => 'required',
        ]);
        
        $tipoAsociacion->update([
            'descripcion' => $request->descripion
        ]);

        return response($tipoAsociacion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TipoAsociacion  $tipoAsociacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(TipoAsociacion $tipoAsociacion)
    {
        $tipoAsociacion->delete();
        return response()->noContent();
    }
}
