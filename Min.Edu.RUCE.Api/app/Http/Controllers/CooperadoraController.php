<?php

namespace App\Http\Controllers;

use App\Models\Cooperadora;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class CooperadoraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = Cooperadora::all();
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

        $data = Cooperadora::where('estaActivo',$estaActivo)->get()->toArray();

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
            'fkRefTipoAsociacion' => 'required',
            'fkOrganizacionRUCE' => 'required',
            'cuit' => 'required',
            'legajo' => 'required',
            'denominacion' => 'required',
            'estado' => 'required',
            'convenioCsEconomicas' => 'required',
            'estadoAfip' => 'required',
            'estadoRentas' => 'required',
            'inscripcionRenacopes' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required'
        ]);

        $cooperadora = new Cooperadora();

        $cooperadora->fkRefTipoAsociacion = $request->fkRefTipoAsociacion;
        $cooperadora->fkOrganizacionRUCE = $request->fkOrganizacionRUCE;
        $cooperadora->cuit = $request->cuit;
        $cooperadora-> legajo=  $request->legajo;
        $cooperadora-> denominacion=  $request->denominacion;
        $cooperadora-> estado=  $request->estado;
        $cooperadora-> convenioCsEconomicas=  $request->convenioCsEconomicas;
        $cooperadora-> estadoAfip=  $request->estadoAfip;
        $cooperadora-> estadoRentas=  $request->estadoRentas;
        $cooperadora-> inscripcionRenacopes=  $request->inscripcionRenacopes;
        $cooperadora-> estaActivo=  $request->estaActivo;
        $cooperadora-> fechaEliminacion=  $request->fechaEliminacion;
        $cooperadora-> idUsuarioAlta=  $request->idUsuarioAlta;
        $cooperadora-> idUsuarioModificacion=  $request->idUsuarioModificacion;

        $cooperadora->save();

        return response($cooperadora);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cooperadora  $cooperadora
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = Cooperadora::where('id', $id)->get();
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
     * @param  \App\Models\Cooperadora  $cooperadora
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cooperadora $cooperadora)
    {
        $request->validate([
            'fkRefTipoAsociacion' => 'required',
            'fkOrganizacionRUCE' => 'required',
            'cuit' => 'required',
            'legajo' => 'required',
            'denominacion' => 'required',
            'estado' => 'required',
            'convenioCsEconomicas' => 'required',
            'estadoAfip' => 'required',
            'estadoRentas' => 'required',
            'inscripcionRenacopes' => 'required',
            'estaActivo' => 'required',
            'fechaEliminacion' => 'required',
            'idUsuarioAlta' => 'required',
            'idUsuarioModificacion' => 'required',
        ]);

        $cooperadora->update([
            'fkRefTipoAsociacion' => $request->fkRefTipoAsociacion,
            'fkOrganizacionRUCE' => $request->fkOrganizacionRUCE,
            'cuit' => $request->cuit,
            'legajo' => $request->legajo,
            'denominacion' => $request->denominacion,
            'estado' => $request->estado,
            'convenioCsEconomicas' => $request->convenioCsEconomicas,
            'estadoAfip' => $request->estadoAfip,
            'estadoRentas' => $request->estadoRentas,
            'inscripcionRenacopes' => $request->inscripcionRenacopes,
            'estaActivo' => $request->estaActivo,
            'fechaEliminacion' => $request->fechaEliminacion,
            'idUsuarioAlta' => $request->idUsuarioAlta,
            'idUsuarioModificacion' => $request->idUsuarioModificacion,
        ]);

        return response($cooperadora);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cooperadora  $cooperadora
     * @return \Illuminate\Http\Response
     */
    public function destroy(Cooperadora $cooperadora)
    {
        $cooperadora->delete();
        return response()->noContent();
    }
}
