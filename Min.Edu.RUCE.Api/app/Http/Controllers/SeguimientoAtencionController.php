<?php

namespace App\Http\Controllers;

use App\Models\SeguimientoAtencion;
use Illuminate\Http\Request;

class SeguimientoAtencionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(SeguimientoAtencion::all());
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
            'llamadas' => 'required',
            'mensajes' => 'required',
            'email_enviados' => 'required',
            'atencion_oficina' => 'required',
            'atencion_territorial' => 'required',
            'fecha' => 'required',
        ]);

        $seguimientoAtencion = new SeguimientoAtencion();

        $seguimientoAtencion->fk_cooperadora = $request->fk_cooperadora;
        $seguimientoAtencion->llamadas = $request->llamadas;
        $seguimientoAtencion->mensajes = $request->mensajes;
        $seguimientoAtencion->email_enviados = $request->email_enviados;
        $seguimientoAtencion->atencion_oficina = $request->atencion_oficina;
        $seguimientoAtencion->atencion_territorial = $request->atencion_territorial;
        $seguimientoAtencion->fecha = $request->fecha;

        return response($seguimientoAtencion);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SeguimientoAtencion  $seguimientoAtencion
     * @return \Illuminate\Http\Response
     */
    public function show(SeguimientoAtencion $seguimientoAtencion)
    {
        return response($seguimientoAtencion);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SeguimientoAtencion  $seguimientoAtencion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SeguimientoAtencion $seguimientoAtencion)
    {
        $request->validate([
            'llamadas' => 'required',
            'mensajes' => 'required',
            'email_enviados' => 'required',
            'atencion_oficina' => 'required',
            'atencion_territorial' => 'required',
        ]);

        $seguimientoAtencion->update([
            'llamadas' => $request->llamadas,
            'mensajes' => $request->mensajes,
            'email_enviados' => $request->email_enviados,
            'atencion_oficina' => $request->atencion_oficina,
            'atencion_territorial' => $request->atencion_territorial,
        ]);

        return response($seguimientoAtencion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SeguimientoAtencion  $seguimientoAtencion
     * @return \Illuminate\Http\Response
     */
    public function destroy(SeguimientoAtencion $seguimientoAtencion)
    {
        $seguimientoAtencion->delete();
        return response($seguimientoAtencion);
    }
}