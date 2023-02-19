<?php

namespace App\Http\Controllers;

use App\Models\EstablecimientoEducativo;
use Illuminate\Http\Request;

class EstablecimientoEducativoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(EstablecimientoEducativo::all());
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
     * @param  \App\Models\EstablecimientoEducativo  $establecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function show(EstablecimientoEducativo $establecimientoEducativo)
    {
        return response($establecimientoEducativo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\EstablecimientoEducativo  $establecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EstablecimientoEducativo $establecimientoEducativo)
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

        $establecimientoEducativo->update([
            'region' => $request->region,
            'nivel' => $request->nivel,
            'localidad' => $request->localidad,
            'departamento' => $request->departamento,
            'telefono' => $request->telefono,
            'email' => $request->email,
            'matricula' => $request->matricula,
            'domicilio' => $request->domicilio,
        ]);

        return response($establecimientoEducativo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EstablecimientoEducativo  $establecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function destroy(EstablecimientoEducativo $establecimientoEducativo)
    {
        $establecimientoEducativo->delete();
        return response()->noContent();
    }
}
