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
            'fkCooperadora' => 'required',
            'nroExpediente' => 'required',
            'cantObservaciones' => 'required',
            'observacionesDesc' => 'required',
            'observacionesRespondidas' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required',
        ]);

        $expediente = new Expediente();

        $expediente-> fkCooperadora = $request->fkCooperadora;
        $expediente-> nroExpediente = $request->nroExpediente;
        $expediente-> cantObservaciones = $request->cantObservaciones;
        $expediente-> observacionesDesc = $request->observacionesDesc;
        $expediente-> observacionesRespondidas = $request->observacionesRespondidas;
        $expediente-> estaActivo = $request->estaActivo;
        $expediente-> fechaEliminacion = $request->fechaEliminacion;
        $expediente-> idUsuarioAlta = $request->idUsuarioAlta;
        $expediente-> idUsuarioModificacion = $request->idUsuarioModificacion;

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
            'fkCooperadora' => 'required',
            'nroExpediente' => 'required',
            'cantObservaciones' => 'required',
            'observacionesDesc' => 'required',
            'observacionesRespondidas' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required',
        ]);

        $expediente->update([
            'fkCooperadora' => $request->fkCooperadora,
            'nroExpediente' => $request->nroExpediente,
            'cantObservaciones' => $request->cantObservaciones,
            'observacionesDesc' => $request->observacionesDesc,
            'observacionesRespondidas' => $request->observacionesRespondidas,
            'estaActivo' => $request->estaActivo,
            'fechaEliminacion' => $request->fechaEliminacion,
            'idUsuarioAlta' => $request->idUsuarioAlta,
            'idUsuarioModificacion' => $request->idUsuarioModificacion,
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
