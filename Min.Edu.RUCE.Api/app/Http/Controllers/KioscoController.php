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


        $data = Kiosco::all();
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
        $request->validate([
            'responsable' => 'required',
        ]);

        $kiosco = new Kiosco();

        $kiosco->responsable = $request->responsable;
        if($request->acceso_licitacion)
            $kiosco->acceso_licitacion = $request->acceso_licitacion;
        if($request->documentacion_presentada)
            $kiosco->documentacion_presentada = $request->documentacion_presentada;
        if($request->periodo_inicio)
            $kiosco->periodo_inicio = $request->periodo_inicio;
        if($request->periodo_fin)
            $kiosco->periodo_fin = $request->periodo_fin;

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
     * @param  \App\Models\Kiosco  $kiosco
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kiosco $kiosco)
    {
        $request->validate([
            'responsable' => 'required',
            'acceso_licitacion' => 'required',
            'documentacion_presentada' => 'required',
            'periodo_inicio' => 'required',
            'periodo_fin' => 'required',
        ]);

        $kiosco->update([
            'responsable' => $request->responsable,
            'acceso_licitacion' => $request->acceso_licitacion,
            'documentacion_presentada' => $request->documentacion_presentada,
            'periodo_inicio' => $request->periodo_inicio,
            'periodo_fin' => $request->periodo_fin,
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
