<?php

namespace App\Http\Controllers;

use App\Models\AsociacionCivil;
use Illuminate\Http\Request;

class AsociacionCivilController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(AsociacionCivil::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $request->validate([
        //     'fk_tipo_asociacion' => 'required',
        //     'descipcion' => 'required',
        // ]);

        $asociacionCivil = new AsociacionCivil();

        $asociacionCivil->fk_tipo_asociacion = $request->fk_tipo_asociacion;
        $asociacionCivil->descripcion = $request->descripcion;

        $asociacionCivil->save();

        return response($asociacionCivil);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AsociacionCivil  $asociacionCivil
     * @return \Illuminate\Http\Response
     */
    public function show(AsociacionCivil $asociacionCivil)
    {
        return response($asociacionCivil);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AsociacionCivil  $asociacionCivil
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AsociacionCivil $asociacionCivil)
    {
        $request->validate([
            'fk_tipo_asociacion' => 'required',
            'descipcion' => 'required',
        ]);

        $asociacionCivil->update([
            'fk_tipo_asociacion' => $request->fk_tipo_asociacion,
            'descipcion' => $request->descipcion,
        ]);

        return response($asociacionCivil);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AsociacionCivil  $asociacionCivil
     * @return \Illuminate\Http\Response
     */
    public function destroy(AsociacionCivil $asociacionCivil)
    {
        $asociacionCivil->delete();
        return response()->noContent();
    }
}
