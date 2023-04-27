<?php

namespace App\Http\Controllers;

use App\Models\AutoridadOrganizacionRUCE;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class AutoridadOrganizacionRUCEController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = AutoridadOrganizacionRUCE::all();
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

        $data = AutoridadOrganizacionRUCE::where('estaActivo',$estaActivo)->get()->toArray();

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
        //validacion de la preticion de los datos
        $request->validate([
            'fkIdRefCargo' =>'required',
            'fkIdPersonaRUCE' =>'required',
            'fkIdOrganizacionRUCE' =>'required',
            'inicioCargo' =>'required',
            'finCargo' =>'required',
            'estaActivo' =>'required',
            'fechaEliminacion' =>'required',
            'idUsuarioAlta' =>'required',
            'idUsuarioModificacion' =>'required',
        ]);

        //instancia de una autoridad del model
        $autoridadOrganizacion = new AutoridadOrganizacionRUCE();

        //asigmacion de los datos profvenientes del requies hacia la instancia de autoridad
        $autoridadOrganizacion->fkIdRefCargo = $request->fkIdRefCargo;
        $autoridadOrganizacion->fkIdPersonaRUCE = $request->fkIdPersonaRUCE;
        $autoridadOrganizacion->fkIdOrganizacionRUCE = $request->fkIdOrganizacionRUCE;
        $autoridadOrganizacion->inicioCargo = $request->inicioCargo;
        $autoridadOrganizacion->finCargo = $request->finCargo;
        $autoridadOrganizacion->estaActivo = $request->estaActivo;
        $autoridadOrganizacion->fechaEliminacion = $request->fechaEliminacion;
        $autoridadOrganizacion->idUsuarioAlta = $request->idUsuarioAlta;
        $autoridadOrganizacion->idUsuarioModificacion = $request->idUsuarioModificacion;

        //generacion de registro en la base de datos
        $autoridadOrganizacion->save();

        return response($autoridadOrganizacion);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AutoridadOrganizacionRUCE  $autoridadOrganizacionRUCE
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = AutoridadOrganizacionRUCE::where('id', $id)->get();
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
     * @param  \App\Models\AutoridadOrganizacionRUCE  $autoridadOrganizacionRUCE
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'fkIdRefCargo' =>'required',
            'fkIdPersonaRUCE' =>'required',
            'fkIdOrganizacionRUCE' =>'required',
            'inicioCargo' =>'required',
            'finCargo' =>'required',
            'estaActivo' =>'required',
            'fechaEliminacion' =>'required',
            'idUsuarioAlta' =>'required',
            'idUsuarioModificacion' =>'required',
        ]);

        //obtengo una autoridad establecimiento educativo desde la base de datos y actualizo sus datos
        AutoridadOrganizacionRUCE::where('id',$id)->update([
            'fkIdRefCargo' => $request->fkIdRefCargo,
            'fkIdPersonaRUCE' => $request->fkIdPersonaRUCE,
            'fkIdOrganizacionRUCE' => $request->fkIdOrganizacionRUCE,
            'inicioCargo' => $request->inicioCargo,
            'finCargo' => $request->finCargo,
            'estaActivo' => $request->estaActivo,
            'fechaEliminacion' => $request->fechaEliminacion,
            'idUsuarioAlta' => $request->idUsuarioAlta,
            'idUsuarioModificacion' => $request->idUsuarioModificacion,
        ]);

        return response(AutoridadOrganizacionRUCE::where('id',$id)->get()[0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AutoridadOrganizacionRUCE  $autoridadOrganizacionRUCE
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        AutoridadOrganizacionRUCE::where('id',$id)->delete();
        return response()->noContent();
    }
}
