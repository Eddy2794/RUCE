<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExpedienteRequest;
use App\Http\Requests\UpdateExpedienteRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\Expediente;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ExpedienteController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Expediente::orderBy('update_at','desc')->get(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Expediente::orderBy('update_at','desc')->get(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(StoreExpedienteRequest $request): JsonResponse
    {
        //$request = new StoreExpedienteRequest($request->toArray());
        try {
            Expediente::create([
                'fkCooperadora' => $request->fkCooperadora,
                'fkRefInstanciaInstrumento' => $request->fkRefInstanciaInstrumento,
                'nroExpediente' => $request->nroExpediente,
                'cantObservaciones' => $request->cantObservaciones,
                'observacionesDesc' => $request->observacionesDesc,
                'observacionesRespondidas' => $request->observacionesRespondidas,
                'fecha' => $request->fecha,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Expediente registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
    
    public function show(int $fk_cooperadora): JsonResponse
    {
        try {
            $expediente = Expediente::where('fkCooperadora', $fk_cooperadora)->first();
            // dd($expediente);

            if ($expediente) {
                return response()->json(new ModelResourse($expediente['id'], 'Expediente'));
            } else {
                return response()->json([
                    'succeeded' => false,
                    'message' => 'Expediente no Encontrado'
                ], Response::HTTP_NOT_FOUND);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateExpedienteRequest $request, int $expediente): JsonResponse
    {
        try {
            $expediente = Expediente::where('id', $expediente)->first();
            //$request = new UpdateExpedienteRequest($request->toArray());
            $expediente->fkCooperadora = $request->fkCooperadora ?: $expediente->fkCooperadora;
            $expediente->fkRefInstanciaInstrumento = $request->fkRefInstanciaInstrumento ?: $expediente->fkRefInstanciaInstrumento;
            $expediente->nroExpediente = $request->nroExpediente ?: $expediente->nroExpediente;
            $expediente->cantObservaciones = $request->cantObservaciones ?: $expediente->cantObservaciones;
            $expediente->observacionesDesc = $request->observacionesDesc ?: $expediente->observacionesDesc;
            $expediente->observacionesRespondidas = $request->observacionesRespondidas !== null ? $request->observacionesRespondidas : $expediente->observacionesRespondidas;
            $expediente->fecha = $request->fecha ?: $expediente->fecha;
            $expediente->idUsuarioModificacion = $request->idUsuarioModificacion ?: $expediente->idUsuarioModificacion;

            if ($expediente->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $expediente->updated_at= Carbon::now();
            $expediente->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Expediente Modificada con exito',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
    
    public function destroy(int $id): JsonResponse
    {
        try {
            Expediente::where('id', $id)->update(['estaActivo'=>false,]);
            Expediente::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Expediente eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
