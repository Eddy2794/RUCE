<?php

namespace App\Http\Controllers;

use App\Models\SeguimientoAtencion;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class SeguimientoAtencionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = SeguimientoAtencion::all();
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

        $data = SeguimientoAtencion::where('estaActivo',$estaActivo)->get()->toArray();

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
            'fk_cooperadora' => 'required',
            'llamadas' => 'required',
            'mensajes' => 'required',
            'email_enviados' => 'required',
            'atencion_oficina' => 'required',
            'atencion_territorial' => 'required',
            'fecha' => 'required',
        ]);

        $seguimientoAtencion = new SeguimientoAtencion();

        $seguimientoAtencion->fk_cooperadora = $request->fk_cooperadora;
        $seguimientoAtencion->llamadas = $request->llamadas;
        $seguimientoAtencion->mensajes = $request->mensajes;
        $seguimientoAtencion->email_enviados = $request->email_enviados;
        $seguimientoAtencion->atencion_oficina = $request->atencion_oficina;
        $seguimientoAtencion->atencion_territorial = $request->atencion_territorial;
        $seguimientoAtencion->fecha = $request->fecha;

        return response($seguimientoAtencion);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SeguimientoAtencion  $seguimientoAtencion
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse 
    {
        $data = SeguimientoAtencion::where('id', $id)->get();
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
     * @param  \App\Models\SeguimientoAtencion  $seguimientoAtencion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'llamadas' => 'required',
            'mensajes' => 'required',
            'email_enviados' => 'required',
            'atencion_oficina' => 'required',
            'atencion_territorial' => 'required',
        ]);

        SeguimientoAtencion::where('id',$id)->update([
            'llamadas' => $request->llamadas,
            'mensajes' => $request->mensajes,
            'email_enviados' => $request->email_enviados,
            'atencion_oficina' => $request->atencion_oficina,
            'atencion_territorial' => $request->atencion_territorial,
        ]);

        return response(SeguimientoAtencion::where('id',$id)->get()[0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SeguimientoAtencion  $seguimientoAtencion
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        SeguimientoAtencion::where('id',$id)->delete();
        return response()->noContent();
    }
}
