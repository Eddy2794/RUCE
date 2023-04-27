<?php

namespace App\Http\Controllers;

use App\Models\Kiosco;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class KioscoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = Kiosco::all();
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

        $data = Kiosco::where('estaActivo',$estaActivo)->get()->toArray();

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
            'idPersonaRUCE' => 'required',
            'accesoLicitacion' => 'required',
            'documentacionPresentada' => 'required',
            'periodoInicio' => 'required',
            'periodoFin' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required'
        ]);

        $kiosco = new Kiosco();

        $kiosco-> fkIdCooperadora= $request->fkIdCooperadora;
        $kiosco-> idPersonaRUCE= $request->idPersonaRUCE;
        $kiosco-> accesoLicitacion= $request->accesoLicitacion;
        $kiosco-> documentacionPresentada= $request->documentacionPresentada;
        $kiosco-> periodoInicio= $request->periodoInicio;
        $kiosco-> periodoFin= $request->periodoFin;
        $kiosco-> estaActivo= $request->estaActivo;
        $kiosco-> fechaEliminacion= $request->fechaEliminacion;
        $kiosco-> idUsuarioAlta= $request->idUsuarioAlta;
        $kiosco-> idUsuarioModificacion= $request->idUsuarioModificacion;

        $kiosco->save();

        return response($kiosco);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Kiosco  $kiosco
     * @return \Illuminate\Http\Response
     */
    public function show(Kiosco $kiosco): JsonResponse
    {
        $data = [$kiosco];
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
     * @param  \App\Models\Kiosco  $kiosco
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kiosco $kiosco)
    {
        $request->validate([
            'fkIdCooperadora' => 'required',
            'idPersonaRUCE' => 'required',
            'accesoLicitacion' => 'required',
            'documentacionPresentada' => 'required',
            'periodoInicio' => 'required',
            'periodoFin' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required'
        ]);

        $kiosco->update([
            'fkIdCooperadora' => $request->fkIdCooperadora,
            'idPersonaRUCE' => $request->idPersonaRUCE,
            'accesoLicitacion' => $request->accesoLicitacion,
            'documentacionPresentada' => $request->documentacionPresentada,
            'periodoInicio' => $request->periodoInicio,
            'periodoFin' => $request->periodoFin,
            'estaActivo' => $request->estaActivo,
            'fechaEliminacion' => $request->fechaEliminacion,
            'idUsuarioAlta' => $request->idUsuarioAlta,
            'idUsuarioModificacion' => $request->idUsuarioModificacion
        ]);

        return response($kiosco);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Kiosco  $kiosco
     * @return \Illuminate\Http\Response
     */
    public function destroy(Kiosco $kiosco)
    {
        $kiosco->delete();
        return response()->noContent();
    }
}
