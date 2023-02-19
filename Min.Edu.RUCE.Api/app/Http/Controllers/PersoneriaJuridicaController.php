<?php

namespace App\Http\Controllers;

use App\Models\PersoneriaJuridica;
use Illuminate\Http\Request;

class PersoneriaJuridicaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(PersoneriaJuridica::all());
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
            'fk_asociacion_civil',
            'estado_comision_directiva',
            'estado_resolucion',
        ]);

        $personeriaJuridica = new PersoneriaJuridica();

        $personeriaJuridica->fk_asociacion_civil = $request->fk_asociacion_civil;
        $personeriaJuridica->estado_comision_directiva = $request->estado_comision_directiva;
        $personeriaJuridica->estado_resolucion = $request->estado->resolucion;

        $personeriaJuridica->save();

        return response($personeriaJuridica);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\PersoneriaJuridica  $personeriaJuridica
     * @return \Illuminate\Http\Response
     */
    public function show(PersoneriaJuridica $personeriaJuridica)
    {
        return response($personeriaJuridica);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\PersoneriaJuridica  $personeriaJuridica
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PersoneriaJuridica $personeriaJuridica)
    {
        $request->validate([
            'estado_comision_directiva',
            'estado_resolucion',
        ]);

        $personeriaJuridica->update([
            'estado_comision_directiva' => $request->estado_comision_directiva,
            'estado_resolucion' => $request->estado->resolucion,
        ]);

        return response($personeriaJuridica);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PersoneriaJuridica  $personeriaJuridica
     * @return \Illuminate\Http\Response
     */
    public function destroy(PersoneriaJuridica $personeriaJuridica)
    {
        $personeriaJuridica->delete();
        return response()->noContent();
    }
}
