<?php

namespace App\Http\Controllers;

use App\Models\FondosCooperar;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class FondosCooperarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = FondosCooperar::all();
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


        $data = FondosCooperar::all();
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
            'fk_cooperadora' => 'required',
            'fondos_recibidos' => 'required',
            'fondos_rendidos' => 'required',
            'fecha_rendicion' => 'required',
            'anio_otorgado' => 'required',
        ]);

        $fondosCooperar = new FondosCooperar();

        $fondosCooperar->fk_cooperadora = $request->fk_cooperadora;
        $fondosCooperar->fondos_recibidos = $request->fondos_recibidos;
        $fondosCooperar->fondos_rendidos = $request->fondos_rendidos;
        $fondosCooperar->fecha_rendicion = $request->fecha_rendicion;
        $fondosCooperar->anio_otorgado = $request->anio_otorgado;

        $fondosCooperar->save();

        return response($fondosCooperar);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\FondosCooperar  $fondosCooperar
     * @return \Illuminate\Http\Response
     */
    public function show(int $id): JsonResponse
    {
        $data = FondosCooperar::where('id', $id)->get();
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
     * @param  \App\Models\FondosCooperar  $fondosCooperar
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, FondosCooperar $fondosCooperar)
    {
        $request->validate([
            'fondos_recibidos' => 'required',
            'fondos_rendidos' => 'required',
            'fecha_rendicion' => 'required',
            'anio_otorgado' => 'required',
        ]);

        $fondosCooperar->update([
            'fondos_recibidos' => $request->fondos_recibidos,
            'fondos_rendidos' => $request->fondos_rendidos,
            'fecha_rendicion' => $request->fecha_rendicion,
            'anio_otorgado' => $request->anio_otorgado,
        ]);

        return response($fondosCooperar);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\FondosCooperar  $fondosCooperar
     * @return \Illuminate\Http\Response
     */
    public function destroy(FondosCooperar $fondosCooperar)
    {
        $fondosCooperar->delete();
        return response()->noContent();
    }
}
