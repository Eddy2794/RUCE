<?php

namespace App\Http\Controllers;

use App\Models\AutoridadesCooperadora;
use Illuminate\Http\Request;

class AutoridadesCooperadoraController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(AutoridadesCooperadora::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validacion de la peticion de los datos del modelo
        $request->validate([
            'fk_persona' =>'required',
            'fk_cooperadora' =>'required',
            'cargo' =>'required',
            'inicio_cargo' =>'required',
            'fin_cargo' =>'required',
            'tipo_comision' =>'required',
        ]);

        //instancia de una autoridad de cooperadora del modelo
        $autoridadCoop = new AutoridadesCooperadora();

        //asignacion de los datos provenientes del requiest hacia la instancia de autoridad de cooperadora
        $autoridadCoop->fk_persona = $request->fk_persona;
        $autoridadCoop->fk_cooperadora = $request->fk_cooperadora;
        $autoridadCoop->cargo = $request->cargo;
        $autoridadCoop->inicio_cargo = $request->inicio_cargo;
        $autoridadCoop->fin_cargo = $request->fin_cargo;
        $autoridadCoop->tipo_comision = $request->tipo_comision;

        //generacion del registro en la base de datos
        $autoridadCoop->save();

        return response($autoridadCoop);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AutoridadesCooperadora  $autoridadesCooperadora
     * @return \Illuminate\Http\Response
     */
    public function show(AutoridadesCooperadora $autoridadesCooperadora)
    {
        return response($autoridadesCooperadora);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AutoridadesCooperadora  $autoridadCoop
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AutoridadesCooperadora $autoridadCoop)
    {
        //validacion de la peticion de los datos del modelo
        $request->validate([
            'fk_cooperadora' =>'required',
            'cargo' =>'required',
            'fin_cargo' =>'required',
            'tipo_comision' =>'required',
        ]);

        $autoridadCoop->update([
            'fk_cooperadora' => $request->fk_cooperadora,
            'cargo' => $request->cargo,
            'fin_cargo' => $request->fin_cargo,
            'tipo_comision' => $request->tipo_comision,
        ]);

        return response($autoridadCoop);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AutoridadesCooperadora  $autoridadesCooperadora
     * @return \Illuminate\Http\Response
     */
    public function destroy(AutoridadesCooperadora $autoridadesCooperadora)
    {
        $autoridadesCooperadora->delete();
        return response()->noContent();
    }
}
