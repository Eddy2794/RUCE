<?php

namespace App\Http\Controllers;

use App\Models\CooperadoraTipoAsociacion;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CooperadoraTipoAsociacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(CooperadoraTipoAsociacion::all());
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
        ]);

        $cooperadoraTipoAsociacion = new CooperadoraTipoAsociacion();

        $cooperadoraTipoAsociacion->fk_tipo_asociacion = $request->fk_tipo_asociacion;
        $cooperadoraTipoAsociacion->fk_cooperadora = $request->fk_cooperadora;

        $cooperadoraTipoAsociacion->save();

        return response($cooperadoraTipoAsociacion);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\CooperadoraTipoAsociacion  $cooperadoraTipoAsociacion
     * @return \Illuminate\Http\Response
     */
    public function show(CooperadoraTipoAsociacion $cooperadoraTipoAsociacion)
    {
        return response($cooperadoraTipoAsociacion);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CooperadoraTipoAsociacion  $cooperadoraTipoAsociacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CooperadoraTipoAsociacion $cooperadoraTipoAsociacion)
    {
        $request->validate([
            'fk_tipo_asociacion' => 'required',
            'fk_cooperadora' => 'required',
        ]);

        $cooperadoraTipoAsociacion->update([
            'fk_tipo_asociacion' => $request->fk_tipo_asociacion,
            'fk_cooperadora' => $request->fk_kiosco,
            'fecha' => Carbon::createFromFormat('Y-m-d H:i:s',Carbon::now())->format('d-m-Y'),
        ]);

        return response($cooperadoraTipoAsociacion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CooperadoraTipoAsociacion  $cooperadoraTipoAsociacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(CooperadoraTipoAsociacion $cooperadoraTipoAsociacion)
    {
        $cooperadoraTipoAsociacion->delete();
        return response()->noContent();
    }
}
