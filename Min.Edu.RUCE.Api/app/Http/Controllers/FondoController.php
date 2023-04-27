<?php

namespace App\Http\Controllers;

use App\Models\Fondo;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class FondosCooperarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = Fondo::all();
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

        $data = Fondo::where('estaActivo',$estaActivo)->get()->toArray();

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
            'fkIdTipoFondo' => 'required',
            'fkCooperadora' => 'required',
            'fondoRecibido' => 'required',
            'fondoRendido' => 'required',
            'monto' => 'required',
            'fechaRecibido' => 'required',
            'fechaRendicion' => 'required',
            'anioOtorgado' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required',
        ]);

        $fondo = new Fondo();

        $fondo->fkIdTipoFondo = $request->fkIdTipoFondo;
        $fondo->fkCooperadora = $request->fkCooperadora;
        $fondo->fondoRecibido = $request->fondoRecibido;
        $fondo->fondoRendido = $request->fondoRendido;
        $fondo->monto = $request->monto;
        $fondo->fechaRecibido = $request->fechaRecibido;
        $fondo->fechaRendicion = $request->fechaRendicion;
        $fondo->anioOtorgado = $request->anioOtorgado;
        $fondo->estaActivo = $request->estaActivo;
        $fondo->fechaEliminacion = $request->fechaEliminacion;
        $fondo->idUsuarioAlta = $request->idUsuarioAlta;
        $fondo->idUsuarioModificacion = $request->idUsuarioModificacion;

        $fondo->save();

        return response($fondo);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Fondo  $fondo
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = Fondo::where('id', $id)->get();
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
     * @param  \App\Models\Fondo  $fondo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Fondo $fondo)
    {
        $request->validate([
            'fkIdTipoFondo'=>'required',
            'fkCooperadora'=>'required',
            'fondoRecibido'=>'required',
            'fondoRendido'=>'required',
            'monto'=>'required',
            'fechaRecibido'=>'required',
            'fechaRendicion'=>'required',
            'anioOtorgado'=>'required',
            'estaActivo'=>'required',
            'fechaEliminacion'=>'required',
            'idUsuarioAlta'=>'required',
            'idUsuarioModificacion'=>'required'
        ]);

        $fondo->update([
            'fondos_recibidos' => $request->fondos_recibidos,
            'fkIdTipoFondo' => $request->fkIdTipoFondo,
            'fkCooperadora' => $request->fkCooperadora,
            'fondoRecibido' => $request->fondoRecibido,
            'fondoRendido' => $request->fondoRendido,
            'monto' => $request->monto,
            'fechaRecibido' => $request->fechaRecibido,
            'fechaRendicion' => $request->fechaRendicion,
            'anioOtorgado' => $request->anioOtorgado,
            'estaActivo' => $request->estaActivo,
            'fechaEliminacion' => $request->fechaEliminacion,
            'idUsuarioAlta' => $request->idUsuarioAlta,
            'idUsuarioModificacion' => $request->idUsuarioModificacion
        ]);

        return response($fondo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Fondo  $fondo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Fondo $fondo)
    {
        $fondo->delete();
        return response()->noContent();
    }
}
