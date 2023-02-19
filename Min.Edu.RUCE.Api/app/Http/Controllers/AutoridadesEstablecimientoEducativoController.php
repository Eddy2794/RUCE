<?php

namespace App\Http\Controllers;

use App\Models\AutoridadesEstablecimientoEducativo;
use ArrayObject;
use Illuminate\Http\Request;

class AutoridadesEstablecimientoEducativoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(AutoridadesEstablecimientoEducativo::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //validacion de la preticion de los datos
        $request->validate([
            'fk_persona' =>'required',
            'fk_establecimiento_educativo' =>'required',
            'cargo' =>'required',
        ]);

        //instancia de una autoridad del model
        $autoridadeEE = new AutoridadesEstablecimientoEducativo();

        //asigmacion de los datos profvenientes del requies hacia la instancia de autoridad
        $autoridadeEE->cargo = $request->cargo;
        $autoridadeEE->fk_persona = $request->fk_persona;
        $autoridadeEE->fk_establecimiento_educativo = $request->fk_establecimiento_educativo;

        //generacion de registro en la base de datos
        $autoridadeEE->save();

        return response($autoridadeEE);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AutoridadesEstablecimientoEducativo  $autoridadesEstablecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function show(AutoridadesEstablecimientoEducativo $autoridadesEstablecimientoEducativo)
    {
        return response($autoridadesEstablecimientoEducativo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AutoridadesEstablecimientoEducativo  $autoridadesEstablecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AutoridadesEstablecimientoEducativo $autoridadeEE)
    {
        //validacion de la preticion de los datos
        $request->validate([
            'fk_persona' =>'required',
            'fk_establecimiento_educativo' =>'required',
            'cargo' =>'required',
        ]);

        //obtengo una autoridad establecimiento educativo desde la base de datos y actualizo sus datos
        $autoridadeEE->update([
            'cargo' => $request->cargo,
            'fk_persona' => $request->fk_persona,
            'fk_establecimiento_educativo' => $request->fk_establecimiento_educativo,
        ]);

        return response($autoridadeEE);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AutoridadesEstablecimientoEducativo  $autoridadesEstablecimientoEducativo
     * @return \Illuminate\Http\Response
     */
    public function destroy(AutoridadesEstablecimientoEducativo $autoridadesEstablecimientoEducativo)
    {
        $autoridadesEstablecimientoEducativo->delete();
        return response()->noContent();
    }
}
