<?php

namespace App\Http\Controllers;

use App\Models\AutoridadComision;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class AutoridadComisionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = AutoridadComision::all();
        $respuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' =>($data)
            ]
        ];
        return response()->json($respuesta,200);
    }

    public function filtro(Request $request): JsonResponse  
    {
        $estaActivo = $request->query->get('EstaActivo');
        $pageNumber = $request->query->get('PageNumber');
        $pageSize = $request->query->get('PageSize');

        $data = AutoridadComision::where('estaActivo',$estaActivo)->get()->toArray();

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
        //validacion de la peticion de los datos del modelo
        $request->validate([
            'fkIdPersonaRUCE' =>'required',
            'fkIdRefCargo' =>'required',
            'fkIdComision' =>'required',
            'inicioCargo' =>'required',
            'finCargo' =>'required',
            'estaActivo' =>'required',
            'fechaEliminacion' =>'required',
            'idUsuarioAlta' =>'required',
            'idUsuarioModificacion' =>'required',
        ]);

        //instancia de una autoridad de cooperadora del modelo
        $autoridadComision = new AutoridadComision();

        //asignacion de los datos provenientes del requiest hacia la instancia de autoridad de cooperadora
        $autoridadComision->fkIdPersonaRUCE = $request->fkIdPersonaRUCE;
        $autoridadComision->fkIdRefCargo = $request->fkIdRefCargo;
        $autoridadComision->fkIdComision = $request->fkIdComision;
        $autoridadComision->inicioCargo = $request->inicioCargo;
        $autoridadComision->finCargo = $request->finCargo;
        $autoridadComision->estaActivo = $request->estaActivo;
        $autoridadComision->fechaEliminacion = $request->fechaEliminacion;
        $autoridadComision->idUsuarioAlta = $request->idUsuarioAlta;
        $autoridadComision->idUsuarioModificacion = $request->idUsuarioModificacion;

        //generacion del registro en la base de datos
        $autoridadComision->save();

        return response($autoridadComision);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AutoridadComision  $autoridadComision
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = AutoridadComision::where('id',$id)->get();
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
     * @param  \App\Models\AutoridadComision  $autoridadComision
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AutoridadComision $autoridadComision)
    {
        //validacion de la peticion de los datos del modelo
        $request->validate([
            'fkIdPersonaRUCE' =>'required',
            'fkIdRefCargo' =>'required',
            'fkIdComision' =>'required',
            'inicioCargo' =>'required',
            'finCargo' =>'required',
            'estaActivo' =>'required',
            'fechaEliminacion' =>'required',
            'idUsuarioAlta' =>'required',
            'idUsuarioModificacion' =>'required',
        ]);

        $autoridadComision->update([
            'fkIdPersonaRUCE' => $request->fkIdPersonaRUCE,
            'fkIdRefCargo' => $request->fkIdRefCargo,
            'fkIdComision' => $request->fkIdComision,
            'inicioCargo' => $request->inicioCargo,
            'finCargo' => $request->finCargo,
            'estaActivo' => $request->estaActivo,
            'fechaEliminacion' => $request->fechaEliminacion,
            'idUsuarioAlta' => $request->idUsuarioAlta,
            'idUsuarioModificacion' => $request->idUsuarioModificacion,
        ]);

        return response($autoridadComision);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AutoridadComision  $autoridadComision
     * @return \Illuminate\Http\Response
     */
    public function destroy(AutoridadComision $autoridadComision)
    {
        $autoridadComision->delete();
        return response()->noContent();
    }
}
