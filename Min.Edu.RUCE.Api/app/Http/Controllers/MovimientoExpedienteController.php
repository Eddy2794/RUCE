<?php

namespace App\Http\Controllers;

use App\Models\MovimientoExpediente;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class MovimientoExpedienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = MovimientoExpediente::all();
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

        $data = MovimientoExpediente::where('estaActivo',$estaActivo)->get()->toArray();

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
        //visualiza los datos que se estan mandando en el requiest de la peticion
        // dd($request->all());
        $request->validate([
            'fkExpediente' => 'required',
            'fkRefInstanciaInstrumento' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required'
        ]);

        $movimientoExpediente = new MovimientoExpediente();

        $movimientoExpediente->fkExpediente = $request->fkExpediente;
        $movimientoExpediente->fkRefInstanciaInstrumento = $request->fkRefInstanciaInstrumento;
        $movimientoExpediente->estaActivo = $request->estaActivo;
        $movimientoExpediente->fechaEliminacion = $request->fechaEliminacion;
        $movimientoExpediente->idUsuarioAlta = $request->idUsuarioAlta;
        $movimientoExpediente->idUsuarioModificacion = $request->idUsuarioModificacion;

        $movimientoExpediente->save();

        return response($movimientoExpediente);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\MovimientoExpediente  $MovimientoExpediente
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = MovimientoExpediente::where('id', $id)->get();
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
     * @param  \App\Models\MovimientoExpediente  $MovimientoExpediente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'fkExpediente'=>'required',
            'fkRefInstanciaInstrumento'=>'required',
            'estaActivo'=>'required',
            'fechaEliminacion'=>'required',
            'idUsuarioAlta'=>'required',
            'idUsuarioModificacion'=>'required'
        ]);

        MovimientoExpediente::where('id',$id)->update([
            'fkExpediente' => $request->fkExpediente,
            'fkRefInstanciaInstrumento' => $request->fkRefInstanciaInstrumento,
            'estaActivo' => $request->estaActivo,
            'fechaEliminacion' => $request->fechaEliminacion,
            'idUsuarioAlta' => $request->idUsuarioAlta,
            'idUsuarioModificacion' => $request->idUsuarioModificacion,
        ]);

        return response(MovimientoExpediente::where('id',$id)->get()[0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\MovimientoExpediente  $MovimientoExpediente
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        MovimientoExpediente::where('id',$id)->delete();
        return response()->noContent();
    }
}
