<?php

namespace App\Http\Controllers;

use App\Models\HistorialCooperadora;
use Illuminate\Http\Request;

class HistorialCooperadoraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(HistorialCooperadora::all());
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
    public function show(HistorialCooperadora $HistorialCooperadora)
    {
        return response($HistorialCooperadora);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\HistorialCooperadora  $HistorialCooperadora
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, HistorialCooperadora $HistorialCooperadora)
    {
        $request->validate([
            'fk_tipo_asociacion' => 'required',
            'fk_cooperadora' => 'required',
            'fk_expediente' => 'required',
        ]);

        $HistorialCooperadora->update([
            'fk_tipo_asociacion' => $request->fk_tipo_asociacion,
            'fk_cooperadora' => $request->fk_kiosco,
            'fk_expediente' => $request->fk_expediente,
        ]);

        return response($HistorialCooperadora);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HistorialCooperadora  $HistorialCooperadora
     * @return \Illuminate\Http\Response
     */
    public function destroy(HistorialCooperadora $HistorialCooperadora)
    {
        $HistorialCooperadora->delete();
        return response()->noContent();
    }
}
