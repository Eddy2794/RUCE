<?php

namespace App\Http\Controllers;

use App\Models\Personeria;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;

class PersoneriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $data = Personeria::all();
        $respuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => count($data)
            ]
        ];
        return response()->json($respuesta,200);
    }

    public function filtro(Request $request): JsonResponse  
    {
        $estaActivo = $request->query->get('EstaActivo');
        $pageNumber = $request->query->get('PageNumber');
        $pageSize = $request->query->get('PageSize');


        $data = Personeria::all();
        $cantidad = count($data);

        $respuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => $cantidad
            ]
        ];
        return response()->json($respuesta,200);
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
            'fk_expediente'
        ]);

        $personeria = new Personeria();

        $personeria->fk_expediente = $request->fk_expediente;
        if($request->estado_comision_directiva)
            $personeria->estado_comision_directiva = $request->estado_comision_directiva;
        if($request->estado_resolucion)
            $personeria->estado_resolucion = $request->estado_resolucion;
        if($request->estado_balance)
            $personeria->estado_balance = $request->estado_balance;
        if($request->fecha)
            $personeria->fecha = $request->fecha;

        $personeria->save();

        return response($personeria);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Personeria  $personeria
     * @return \Illuminate\Http\Response
     */
    public function show(Personeria $personeria): JsonResponse 
    {
        $data = [$personeria];
        $cantidad = count($data);

        $respuesta = [
            'entities' => $data,
            'paged' => [
                'entitiyCount' => $cantidad
            ]
        ];
        return response()->json($respuesta,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Personeria  $personeria
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Personeria $personeria)
    {
        $request->validate([
            'estado_comision_directiva',
            'estado_resolucion',
        ]);

        $personeria->update([
            'estado_comision_directiva' => $request->estado_comision_directiva,
            'estado_resolucion' => $request->estado_resolucion,
            'estado_balance' => $request->estado_balance,
            'fecha' => Carbon::createFromFormat('Y-m-d H:i:s',Carbon::now())->format('d-m-Y')
        ]);

        return response($personeria);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Personeria  $personeria
     * @return \Illuminate\Http\Response
     */
    public function destroy(Personeria $personeria)
    {
        $personeria->delete();
        return response()->noContent();
    }
}
