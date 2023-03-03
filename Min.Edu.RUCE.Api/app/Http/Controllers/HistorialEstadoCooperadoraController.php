<?php

namespace App\Http\Controllers;

use App\Models\HistorialEstadoCooperadora;
use Illuminate\Http\Request;

class HistorialEstadoCooperadoraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(HistorialEstadoCooperadora::all());
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
            'fk_cooperadora_tipo_asociacion' => 'required',
            'fk_expediente' => 'required',
        ]);

        $historial = new HistorialEstadoCooperadora();

        $historial->fk_cooperadora_tipo_asociacion = $request->fk_cooperadora_tipo_asociacion;
        $historial->fk_expediente = $request->fk_expediente;

        $historial->save();

        return response($historial);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HistorialEstadoCooperadora  $historialEstadoCooperadora
     * @return \Illuminate\Http\Response
     */
    public function show(HistorialEstadoCooperadora $historialEstadoCooperadora)
    {
        return response($historialEstadoCooperadora);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HistorialEstadoCooperadora  $historial
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HistorialEstadoCooperadora $historial)
    {
        $request->validate([
            'fk_cooperadora_tipo_asociacion' => 'required',
            'fk_expediente' => 'required',
        ]);

        $historial->update([
            'fk_cooperadora_tipo_asociacion' => $request->fk_cooperadora_tipo_asociacion,
            'fk_expediente' => $request->fk_expediente,
        ]);

        return response($historial);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HistorialEstadoCooperadora  $historialEstadoCooperadora
     * @return \Illuminate\Http\Response
     */
    public function destroy(HistorialEstadoCooperadora $historialEstadoCooperadora)
    {
        $historialEstadoCooperadora->delete();
        return response()->noContent();
    }
}
