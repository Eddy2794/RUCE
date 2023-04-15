<?php

namespace App\Http\Controllers;

use App\Models\AutoridadesCooperadora;
use App\Models\AutoridadesEstablecimientoEducativo;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class AutoridadesEstablecimientoEducativoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = AutoridadesCooperadora::all();
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

        $data = AutoridadesCooperadora::where('estadoActivo',$estaActivo)->get()->toArray();

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
            'fk_persona' =>'required',
            'fk_establecimiento_educativo' =>'required',
            'cargo' =>'required',
        ]);

        //instancia de una autoridad del model
        $autoridadeEE = new AutoridadesEstablecimientoEducativo();

        //asigmacion de los datos profvenientes del requies hacia la instancia de autoridad
        $autoridadeEE->cargo = $request->cargo;
        $autoridadeEE->fk_persona = $request->fk_persona;
        $autoridadeEE->fk_establecimiento_educativo = $request->fk_establecimiento_educativo;

        //generacion de registro en la base de datos
        $autoridadeEE->save();

        return response($autoridadeEE);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AutoridadesEstablecimientoEducativo  $autoridadesEstablecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = AutoridadesCooperadora::where('id', $id)->get();
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
     * @param  \App\Models\AutoridadesEstablecimientoEducativo  $autoridadesEstablecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'fk_persona' =>'required',
            'fk_establecimiento_educativo' =>'required',
            'cargo' =>'required',
        ]);

        //obtengo una autoridad establecimiento educativo desde la base de datos y actualizo sus datos
        AutoridadesEstablecimientoEducativo::where('id',$id)->update([
            'cargo' => $request->cargo,
            'fk_persona' => $request->fk_persona,
            'fk_establecimiento_educativo' => $request->fk_establecimiento_educativo,
        ]);

        return response(AutoridadesEstablecimientoEducativo::where('id',$id)->get()[0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AutoridadesEstablecimientoEducativo  $autoridadesEstablecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        AutoridadesEstablecimientoEducativo::where('id',$id)->delete();
        return response()->noContent();
    }
}
