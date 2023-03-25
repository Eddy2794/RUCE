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
        $resuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => count($data)
            ]
        ];
        return response()->json($resuesta,200);
    }

    public function filtro(Request $request): JsonResponse  
    {
        $estaActivo = $request->query->get('EstaActivo');
        $pageNumber = $request->query->get('PageNumber');
        $pageSize = $request->query->get('PageSize');


        $data = EstablecimientoEducativo::all();
        $cantidad = count($data);

        $resuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => $cantidad
            ]
        ];
        return response()->json($resuesta,200);
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

        $resuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => $cantidad
            ]
        ];
        return response()->json($resuesta,200);
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
