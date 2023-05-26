<?php

namespace App\Http\Controllers;

use App\Models\Comision;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class ComisionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = Comision::all();
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

        $data = Comision::where('estaActivo',$estaActivo)->get()->toArray();

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
            'fkRefTipoComision' => 'required',
            'periodoInicio' => 'required',
            'periodoFin' => 'required',
            'nroSocios' => 'required',
            'estadoResolucion' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required',
        ]);

        $comision = new Comision();

        $comision-> fkCooperadora = $request->fkCooperadora;
        $comision-> fkRefTipoComision = $request->fkRefTipoComision;
        $comision-> periodoInicio = $request->periodoInicio;
        $comision-> periodoFin = $request->periodoFin;
        $comision-> nroSocios = $request->nroSocios;
        $comision-> estadoResolucion = $request->estadoResolucion;
        $comision-> estaActivo = $request->estaActivo;
        $comision-> fechaEliminacion = $request->fechaEliminacion;
        $comision-> idUsuarioAlta = $request->idUsuarioAlta;
        $comision-> idUsuarioModificacion = $request->idUsuarioModificacion;

        return response($comision);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comision  $comision
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = Comision::where('id', $id)->get();
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
     * @param  \App\Models\Comision  $comision
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'fkCooperadora'=>'required',
            'fkRefTipoComision'=>'required',
            'periodoInicio'=>'required',
            'periodoFin'=>'required',
            'nroSocios'=>'required',
            'estadoResolucion'=>'required',
            'estaActivo'=>'required',
            'fechaEliminacion'=>'required',
            'idUsuarioAlta'=>'required',
            'idUsuarioModificacion'=>'required'
        ]);

        Comision::where('id', $id)->update([
            'fkCooperadora' => $request->fkCooperadora,
            'fkRefTipoComision' => $request->fkRefTipoComision,
            'periodoInicio' => $request->periodoInicio,
            'periodoFin' => $request->periodoFin,
            'nroSocios' => $request->nroSocios,
            'estadoResolucion' => $request->estadoResolucion,
            'estaActivo' => $request->estaActivo,
            'fechaEliminacion' => $request->fechaEliminacion,
            'idUsuarioAlta' => $request->idUsuarioAlta,
            'idUsuarioModificacion' => $request->idUsuarioModificacion
        ]);

        return response(Comision::where('id',$id)->get()[0]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comision  $comision
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        Comision::where('id',$id)->delete();
        return response()->noContent();
    }
}
