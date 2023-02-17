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
        //
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
    public function update(Request $request, AutoridadesEstablecimientoEducativo $autoridadesEstablecimientoEducativo)
    {
        //
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
