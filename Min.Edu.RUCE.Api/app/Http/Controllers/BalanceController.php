<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class BalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = Balance::all();
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

        $data = Balance::where('estaActivo',$estaActivo)->get()->toArray();

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
            'fkIdCooperadora' =>'required',
            'estadoBalance' =>'required',
            'estaActivo' =>'required',
            'fechaEliminacion' =>'required',
            'idUsuarioAlta' =>'required',
            'idUsuarioModificacion' =>'required',
        ]);

        //instancia de una autoridad del model
        $balance = new Balance();

        //asigmacion de los datos profvenientes del requies hacia la instancia de autoridad
        $balance-> fkIdCooperadora = $request-> fkIdCooperadora;
        $balance-> estadoBalance = $request-> estadoBalance;
        $balance-> estaActivo = $request-> estaActivo;
        $balance-> fechaEliminacion = $request-> fechaEliminacion;
        $balance-> idUsuarioAlta = $request-> idUsuarioAlta;
        $balance-> idUsuarioModificacion = $request-> idUsuarioModificacion;
        $balance->save();
        return response($balance);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse 
    {
        $data = Balance::where('id', $id)->get();
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
        return response()->json($respuesta, 200);

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'fkIdCooperadora' =>'required',
            'estadoBalance' =>'required',
            'estaActivo' =>'required',
            'fechaEliminacion' =>'required',
            'idUsuarioAlta' =>'required',
            'idUsuarioModificacion' =>'required',
        ]);

                //se obtiene una autoridad establecimiento educativo desde la base de datos y actualizo sus datos
                Balance::where('id', $id )->update([
                    'fkIdCooperadora' => $request->fkIdCooperadora,
                    'estadoBalance' => $request->estadoBalance,
                    'estaActivo' => $request->estaActivo,
                    'fechaEliminacion' => $request->fechaEliminacion,
                    'idUsuarioAlta' => $request->idUsuarioAlta,
                    'idUsuarioModificacion' => $request->idUsuarioModificacion,
                ]);
                return response(Balance::where('id',$id)->get()[0]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        Balance::where('id',$id)->delete();
        return response()->noContent();
    }
}
