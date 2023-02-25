<?php

namespace App\Http\Controllers;

use App\Models\Balances;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BalancesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Balances::all());
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
            'fk_personeria_juridica' => 'required',
        ]);
        
        //visualiza los datos que se estan mandando en el requiest de la peticion
        // dd($request->all());

        $balances = new Balances();

        $balances->fk_personeria_juridica = $request->fk_personeria_juridica;
        if($request->estado_balances)
            $balances->estado_balances = $request->estado_balances;
        if($request->fecha)
            $balances->fecha = $request->fecha;

        $balances->save();

        return response($balances);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function show(Balances $balances)
    {
        return response($balances);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Balances $balances)
    {
        $request->validate([
            'estado_balances' => 'required',
            'fecha' => 'required',
        ]);

        $balances->update([
            'estado_balances' => $request->estado_balances,
            'fecha' => $request->fecha,
        ]);

        return response($balances);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Balances  $balances
     * @return \Illuminate\Http\Response
     */
    public function destroy(Balances $balances)
    {
        $balances->delete();
        return response()->noContent();
    }
}
