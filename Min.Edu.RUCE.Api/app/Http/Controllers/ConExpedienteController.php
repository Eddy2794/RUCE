<?php

namespace App\Http\Controllers;

use App\Models\ConExpediente;
use Illuminate\Http\Request;

class ConExpedienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(ConExpediente::all());
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
            'fk_asociacion_civil' => 'required',
            'nro_expediente' => 'required'
        ]);

        $conExpediente = new ConExpediente();

        $conExpediente->fk_asociacion_civil = $request->fk_asociacion_civil;
        $conExpediente->nro_expediente = $request->nro_expediente;
        if($request->observaciones)
            $conExpediente->observaciones = $request->observaciones;
        if($request->observaciones_respondidas)
            $conExpediente->observaciones_respondidas = $request->observaciones_respondidas;
        if($request->instrumento_publico)
            $conExpediente->instrumento_publico = $request->instrumento_publico;
        if($request->fiscalia_estado)
            $conExpediente->fiscalia_estado = $request->fiscalia_estado;
        if($request->fecha)
            $conExpediente->fecha = $request->fecha;

        $conExpediente->save();

        return response($conExpediente);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ConExpediente  $conExpediente
     * @return \Illuminate\Http\Response
     */
    public function show(ConExpediente $conExpediente)
    {
        return response($conExpediente);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ConExpediente  $conExpediente
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ConExpediente $conExpediente)
    {
        $request->validate([
            'fk_asociacion_civil' => 'required',
            'nro_expediente' => 'required',
            'observaciones' => 'required',
            'observaciones_respondidas' => 'required',
            'instrumento_publico' => 'required',
            'fiscalida_estado' => 'required',
            'fecha' => 'required',
        ]);

        $conExpediente->update([
            'fk_asociacion_civil' => $request->fk_asociacion_civil,
            'nro_expediente' => $request->nro_expediente,
            'observaciones' => $request->observaciones,
            'observaciones_respondidas' => $request->observaciones_respondidas,
            'instrumento_publico' => $request->instrumento_publico,
            'fiscalida_estado' => $request->fiscalida_estado,
            'fecha' => $request->fecha,
        ]);

        return response($conExpediente);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ConExpediente  $conExpediente
     * @return \Illuminate\Http\Response
     */
    public function destroy(ConExpediente $conExpediente)
    {
        $conExpediente->delete();
        return response()->noContent();
    }
}
