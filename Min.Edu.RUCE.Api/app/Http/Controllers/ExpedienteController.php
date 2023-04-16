<?php

namespace App\Http\Controllers;

use App\Models\Expediente;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ExpedienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = Expediente::all();
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

        $data = Expediente::where('estaActivo',$estaActivo)->get()->toArray();

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
            'nro_expediente' => 'required',
            'observaciones' => 'required',
            'observaciones_respondidas' => 'required',
            'instrumento_publico' => 'required',
        ]);

        $expediente = new Expediente();

        $expediente->nro_expediente = $request->nro_expediente;
        
        if($request->observaciones)
            $expediente->observaciones = $request->observaciones;
        if($request->observaciones_respondidas)
            $expediente->observaciones_respondidas = $request->observaciones_respondidas;
        if($request->instrumento_publico)
            $expediente->instrumento_publico = $request->instrumento_publico;

        if($request->fiscalia_estado)
            $expediente->fiscalia_estado = $request->fiscalia_estado;
        if($request->nro_resolucion)
            $expediente->nro_resolucion = $request->nro_resolucion;
            
        if ($request->decreto)
            $expediente->decreto = $request->decreto;

        $expediente->save();

        return response($expediente);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Expediente  $expediente
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = Expediente::where('id', $id)->get();
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
     * @param  \App\Models\Expediente  $expediente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Expediente $expediente)
    {
        $request->validate([
            'nro_expediente' => 'required',
            'observaciones' => 'required',
            'observaciones_respondidas' => 'required',
            'instrumento_publico' => 'required',
            'decreto' => 'required',
        ]);

        $expediente->update([
            'nro_expediente' => $request->nro_expediente,
            'observaciones' => $request->observaciones,
            'observaciones_respondidas' => $request->observaciones_respondidas,
            'instrumento_publico' => $request->instrumento_publico,

            'fiscalida_estado' => $request->fiscalida_estado,
            'nro_resolucion' => $request->fiscalida_estado,

            'decreto' => $request->decreto,
            'fecha' => Carbon::createFromFormat('Y-m-d H:i:s',Carbon::now())->format('d-m-Y'),
        ]);

        return response($expediente);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Expediente  $expediente
     * @return \Illuminate\Http\Response
     */
    public function destroy(Expediente $expediente)
    {
        $expediente->delete();
        return response()->noContent();
    }
}
