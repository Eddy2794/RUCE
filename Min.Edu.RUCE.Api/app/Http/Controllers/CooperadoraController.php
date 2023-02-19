<?php

namespace App\Http\Controllers;

use App\Models\Cooperadora;
use Illuminate\Http\Request;

class CooperadoraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Cooperadora::all());
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
            'fk_tipo_asociacion' => 'required',
            'fk_kiosco' => 'required',
            'fk_establecimiento_educativo' => 'required',
            'denominacion' => 'required',
            'estado' => 'required',
            'convenio_sc_economicas' => 'required',
            'iscripcion_afip' => 'required',
            'inscipcion_rentas' => 'required',
            'inscripcion_renacopes' => 'required',
            'legajo' => 'required',
            'decreto' => 'required',
            'fecha_creacion' => 'required',
        ]);

        $cooperadora = new Cooperadora();

        $cooperadora->fk_tipo_asociacion = $request->fk_tipo_asociacion;
        $cooperadora->fk_kiosco = $request->fk_kiosco;
        $cooperadora->fk_establecimiento_educativo = $request->fk_establecimiento_educativo;
        $cooperadora->denominacion = $request->denominacion;
        $cooperadora->estado = $request->estado;
        $cooperadora->convenio_sc_economicas = $request->convenio_sc_economicas;
        $cooperadora->iscripcion_afip = $request->iscripcion_afip;
        $cooperadora->inscipcion_rentas = $request->inscripcion_rentas;
        $cooperadora->inscipcion_renacopes = $request->inscripcion_renacopes;
        $cooperadora->legajo = $request->legajo;
        $cooperadora->decreto = $request->decreto;
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
    public function show(Cooperadora $cooperadora)
    {
        return response($cooperadora);
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
            'fk_tipo_asociacion' => 'required',
            'fk_kiosco' => 'required',
            'fk_establecimiento_educativo' => 'required',
            'denominacion' => 'required',
            'estado' => 'required',
            'convenio_sc_economicas' => 'required',
            'iscripcion_afip' => 'required',
            'inscipcion_rentas' => 'required',
            'inscripcion_renacopes' => 'required',
            'legajo' => 'required',
            'decreto' => 'required',
            'fecha_creacion' => 'required',
        ]);

        $cooperadora->update([
            'fk_tipo_asociacion' => $request->fk_tipo_asociacion,
            'fk_kiosco' => $request->fk_kiosco,
            'fk_establecimiento_educativo' => $request->fk_establecimiento_educativo,
            'denominacion' => $request->denominacion,
            'estado' => $request->estado,
            'convenio_sc_economicas' => $request->convenio_sc_economicas,
            'iscripcion_afip' => $request->iscripcion_afip,
            'inscipcion_rentas' => $request->inscripcion_rentas,
            'inscripcion_renacopes' => $request->inscripcion_renacopes,
            'legajo' => $request->legajo,
            'decreto' => $request->decreto,
            'fecha_creacion' => $request->fecha_creacion,
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
