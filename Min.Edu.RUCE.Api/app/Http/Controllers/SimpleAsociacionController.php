<?php

namespace App\Http\Controllers;

use App\Models\SimpleAsociacion;
use Illuminate\Http\Request;

class SimpleAsociacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(SimpleAsociacion::all());
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
            'fk_tipo_asociacion' => 'required',
            'descripcion' => 'required',
        ]);

        $simpleAsociacion = new SimpleAsociacion();

        $simpleAsociacion->fk_tipo_asociacion = $request->fk_tipo_asociacion;
        $simpleAsociacion->descripcion = $request->descripcion;

        return response($simpleAsociacion);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SimpleAsociacion  $simpleAsociacion
     * @return \Illuminate\Http\Response
     */
    public function show(SimpleAsociacion $simpleAsociacion)
    {
        return response($simpleAsociacion);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SimpleAsociacion  $simpleAsociacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SimpleAsociacion $simpleAsociacion)
    {
        $request->validate([
            'descripcion' => 'required',
        ]);

        $simpleAsociacion->update($request->only(['descripcion']));

        return response($simpleAsociacion);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SimpleAsociacion  $simpleAsociacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(SimpleAsociacion $simpleAsociacion)
    {
        $simpleAsociacion->delete();
        return response()->noContent();
    }
}
