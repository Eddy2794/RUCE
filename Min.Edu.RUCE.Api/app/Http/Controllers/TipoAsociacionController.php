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
        $resuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => count($data)
            ]
        ];
        return response()->json($resuesta,200);
    }

    public function filtro(Request $request): JsonResponse  
    {
        $estaActivo = $request->query->get('EstaActivo');
        $pageNumber = $request->query->get('PageNumber');
        $pageSize = $request->query->get('PageSize');


        $data = TipoAsociacion::all();
        $cantidad = count($data);

        $resuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => $cantidad
            ]
        ];
        return response()->json($resuesta,200);
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

        $resuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => $cantidad
            ]
        ];
        return response()->json($resuesta,200);
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
