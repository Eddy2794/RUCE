<?php

namespace App\Http\Controllers;

use App\Models\EstablecimientoEducativo;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class EstablecimientoEducativoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = EstablecimientoEducativo::all();
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

        $data = EstablecimientoEducativo::all()->toArray();


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
            'paged' => [
                'entitiyCount' => $cantidad,
                'pageSize'=>count($data),
                'pageIndex' => $total_paginas
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
            'cue' => 'required',
            'region' => 'required',
            'nivel' => 'required',
            'localidad' => 'required',
            'departamento' => 'required',
            'telefono' => 'required',
            'email' => 'required',
            'matricula' => 'required',
            'domicilio' => 'required',
        ]);

        $establecimientoEducativo = new EstablecimientoEducativo();

        $establecimientoEducativo->cue = $request->cue;
        $establecimientoEducativo->region = $request->region;
        $establecimientoEducativo->nivel = $request->nivel;
        $establecimientoEducativo->localidad = $request->localidad;
        $establecimientoEducativo->departamento = $request->departamento;
        $establecimientoEducativo->telefono = $request->telefono;
        $establecimientoEducativo->email = $request->email;
        $establecimientoEducativo->matricula = $request->matricula;
        $establecimientoEducativo->domicilio = $request->domicilio;

        $establecimientoEducativo->save();

        return response($establecimientoEducativo);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse 
    {
        $data = EstablecimientoEducativo::where('id', $id)->get();
        $cantidad = count($data);

        $respuesta = [
            'entities' => $data,
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
     * @param  \App\Models\EstablecimientoEducativo  $establecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'region' => 'required',
            'nivel' => 'required',
            'localidad' => 'required',
            'departamento' => 'required',
            'telefono' => 'required',
            'email' => 'required',
            'matricula' => 'required',
            'domicilio' => 'required',
        ]);

        EstablecimientoEducativo::where('id',$id)->update([
            'region' => $request->region,
            'nivel' => $request->nivel,
            'localidad' => $request->localidad,
            'departamento' => $request->departamento,
            'telefono' => $request->telefono,
            'email' => $request->email,
            'matricula' => $request->matricula,
            'domicilio' => $request->domicilio,
        ]);

        return response(EstablecimientoEducativo::where('id',$id)->get()[0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EstablecimientoEducativo  $establecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        EstablecimientoEducativo::where('id',$id)->delete();
        return response()->noContent();
    }
}
