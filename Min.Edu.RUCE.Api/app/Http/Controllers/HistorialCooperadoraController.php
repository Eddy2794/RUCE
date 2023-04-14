<?php

namespace App\Http\Controllers;

use App\Models\HistorialCooperadora;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class HistorialCooperadoraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = HistorialCooperadora::all();
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


        $data = HistorialCooperadora::all();
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
            'fk_tipo_asociacion' => 'required',
            'fk_cooperadora' => 'required',
            'fk_expediente' => 'required',
        ]);

        $HistorialCooperadora = new HistorialCooperadora();

        $HistorialCooperadora->fk_tipo_asociacion = $request->fk_tipo_asociacion;
        $HistorialCooperadora->fk_cooperadora = $request->fk_cooperadora;
        $HistorialCooperadora->fk_expediente = $request->fk_expediente;
        if($request->fecha)
            $HistorialCooperadora->fecha = $request->fecha;

        $HistorialCooperadora->save();

        return response($HistorialCooperadora);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HistorialCooperadora  $HistorialCooperadora
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = HistorialCooperadora::where('id', $id)->get();
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
     * @param  \App\Models\HistorialCooperadora  $HistorialCooperadora
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $request->validate([
            'fk_tipo_asociacion' => 'required',
            'fk_cooperadora' => 'required',
            'fk_expediente' => 'required',
        ]);

        HistorialCooperadora::where('id',$id)->update([
            'fk_tipo_asociacion' => $request->fk_tipo_asociacion,
            'fk_cooperadora' => $request->fk_kiosco,
            'fk_expediente' => $request->fk_expediente,
        ]);

        return response(HistorialCooperadora::where('id',$id)->get()[0]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HistorialCooperadora  $HistorialCooperadora
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        HistorialCooperadora::where('id',$id)->delete();
        return response()->noContent();
    }
}
