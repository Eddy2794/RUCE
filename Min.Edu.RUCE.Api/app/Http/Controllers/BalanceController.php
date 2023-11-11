<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBalanceRequest;
use App\Http\Requests\UpdateBalanceRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class BalanceController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Balance::orderBy('anio','desc')->get(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Balance::orderBy('anio')->get(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreBalanceRequest $request): JsonResponse
    {
        //$request = new StoreBalanceRequest($request->toArray());
        try {
            Balance::create([
                'organizacionDesc' => $request->organizacionDesc,
                'fkCooperadora' => $request->fkCooperadora,
                'estadoBalance' => $request->estadoBalance,
                'anio' => $request->anio,
                'fecha' => $request->fecha,
                'observaciones' => $request->observaciones,
                'idUsuarioAlta'=>Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id
            ]);
            return response()->json([
                'message' => 'Balance registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function show(int $balance): JsonResponse 
    {
        try {
            return response()->json(new ModelResourse($balance,'Balance'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBalanceRequest $request, int $balance): JsonResponse
    {
        try {
            $balance = Balance::where('id', $balance)->first();
            $balance->fkCooperadora = $request->fkCooperadora ?: $balance->fkCooperadora;
            $balance->estadoBalance = $request->estadoBalance !== null ? $request->estadoBalance : $balance->estadoBalance;
            $balance->anio = $request->anio ?: $balance->anio;
            $balance->fecha = $request->fecha !== null || $request->fecha == null ? $request->fecha : $balance->fecha;
            $balance->observaciones = $request->observaciones !== null || $request->observaciones == null ? $request->observaciones : $balance->observaciones;
            if ($balance->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $balance->idUsuarioModificacion = Auth::user()->id;
            $balance->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Balance Modificada con exito',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            Balance::where('id', $id)->update(['estaActivo'=>false,'idUsuarioModificacion'=>Auth::user()->id]);
            Balance::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Balance eliminado con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
