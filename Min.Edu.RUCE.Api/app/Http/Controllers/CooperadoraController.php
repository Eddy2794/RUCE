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


        $data = Cooperadora::all();
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
        //visualiza los datos que se estan mandando en el requiest de la peticion
        // dd($request->all());
        $request->validate([
            'fk_kiosco' => 'required',
            'fk_establecimiento_educativo' => 'required',
            'denominacion' => 'required',
            'decreto' => 'required',
            'estado' => 'required',
            'legajo' => 'required',
        ]);

        $cooperadora = new Cooperadora();

        $cooperadora->fk_kiosco = $request->fk_kiosco;
        $cooperadora->fk_establecimiento_educativo = $request->fk_establecimiento_educativo;
        $cooperadora->denominacion = $request->denominacion;
        if($request->estado)
            $cooperadora->estado = $request->estado;
        if($request->convenio_sc_economicas)
            $cooperadora->convenio_sc_economicas = $request->convenio_sc_economicas;
        if($request->inscripcion_afip)
            $cooperadora->inscripcion_afip = $request->inscripcion_afip;
        if($request->inscripcion_rentas)
            $cooperadora->inscripcion_rentas = $request->inscripcion_rentas;
        if($request->inscripcion_renacopes)
            $cooperadora->inscripcion_renacopes = $request->inscripcion_renacopes;
        if($request->legajo)
            $cooperadora->legajo = $request->legajo;
        if($request->decreto)
            $cooperadora->decreto = $request->decreto;
        if($request->fecha_creacion)
            $cooperadora->fecha_creacion = $request->fecha_creacion;

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
     * @param  \App\Models\Cooperadora  $cooperadora
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Cooperadora $cooperadora)
    {
        $request->validate([
            'fk_kiosco' => 'required',
            'fk_establecimiento_educativo' => 'required',
            'denominacion' => 'required',
            'estado' => 'required',
            'convenio_sc_economicas' => 'required',
            'inscripcion_afip' => 'required',
            'inscripcion_rentas' => 'required',
            'inscripcion_renacopes' => 'required',
            'legajo' => 'required',
            'decreto' => 'required',
        ]);

        $cooperadora->update([
            'fk_kiosco' => $request->fk_kiosco,
            'fk_establecimiento_educativo' => $request->fk_establecimiento_educativo,
            'denominacion' => $request->denominacion,
            'estado' => $request->estado,
            'convenio_sc_economicas' => $request->convenio_sc_economicas,
            'inscripcion_afip' => $request->iscripcion_afip,
            'inscripcion_rentas' => $request->inscripcion_rentas,
            'inscripcion_renacopes' => $request->inscripcion_renacopes,
            'legajo' => $request->legajo,
            'decreto' => $request->decreto,
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
