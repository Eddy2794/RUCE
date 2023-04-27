<?php

namespace App\Http\Controllers;

use App\Models\AtencionSeguimiento;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class AtencionSeguimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = AtencionSeguimiento::all();
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

        $data = AtencionSeguimiento::where('estaActivo',$estaActivo)->get()->toArray();

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
            'fkIdCooperadora' => 'required',
            'fkIdPersonaRUCE'=>'required',
            'llamadas' => 'required',
            'mensajes' => 'required',
            'emailEnviados' => 'required',
            'atencionOficina' => 'required',
            'atencionTerritorial' => 'required',
            'fecha' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required',
        ]);

        $atencionSeguimiento = new AtencionSeguimiento();

        $atencionSeguimiento->fkIdCooperadora = $request->fkIdCooperadora;
        $atencionSeguimiento->llamadas = $request->llamadas;
        $atencionSeguimiento->mensajes = $request->mensajes;
        $atencionSeguimiento->emailEnviados = $request->emailEnviados;
        $atencionSeguimiento->atencionOficina = $request->atencionOficina;
        $atencionSeguimiento->atencionTerritorial = $request->atencionTerritorial;
        $atencionSeguimiento->fecha = $request->fecha;
        $atencionSeguimiento->estaActivo = $request->estaActivo;
        $atencionSeguimiento->fechaEliminacion = $request->fechaEliminacion;
        $atencionSeguimiento->idUsuarioAlta = $request->idUsuarioAlta;
        $atencionSeguimiento->idUsuarioModificacion = $request->idUsuarioModificacion;

        $atencionSeguimiento->save();

        return response($atencionSeguimiento);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AtencionSeguimiento  $atencionSeguimiento
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse 
    {
        $data = AtencionSeguimiento::where('id', $id)->get();
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
     * @param  \App\Models\AtencionSeguimiento  $atencionSeguimiento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'fkIdPersonaRUCE'=>'required',
            'llamadas' => 'required',
            'mensajes' => 'required',
            'emailEnviados' => 'required',
            'atencionOficina' => 'required',
            'atencionTerritorial' => 'required',
            'fecha' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required',
        ]);

        AtencionSeguimiento::where('id',$id)->update([
            'fkIdPersonaRUCE' => $request->fkIdPersonaRUCE,
            'llamadas' => $request->llamadas,
            'mensajes' => $request->mensajes,
            'emailEnviados' => $request->emailEnviados,
            'atencionOficina' => $request->atencionOficina,
            'atencionTerritorial' => $request->atencionTerritorial,
            'fecha' => $request->fecha,
            'estaActivo' => $request->estaActivo,
            'fechaEliminacion' => $request->fechaEliminacion,
            'idUsuarioAlta' => $request->idUsuarioAlta,
            'idUsuarioModificacion' => $request->idUsuarioModificacion,
        ]);

        return response(AtencionSeguimiento::where('id',$id)->get()[0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AtencionSeguimiento  $atencionSeguimiento
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        AtencionSeguimiento::where('id',$id)->delete();
        return response()->noContent();
    }
}
