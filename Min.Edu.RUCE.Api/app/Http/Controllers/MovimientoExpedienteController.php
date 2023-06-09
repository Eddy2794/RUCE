<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovimientoExpedienteRequest;
use App\Http\Requests\UpdateMovimientoExpedienteRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\MovimientoExpediente;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class MovimientoExpedienteController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(MovimientoExpediente::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(MovimientoExpediente::paginate(10, ['*'], 'page', 1));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(Request $request): JsonResponse
    {
        $request = new StoreMovimientoExpedienteRequest($request->toArray());
        try {
            MovimientoExpediente::create([
                'fkExpediente' => $request->fkExpediente,
                'fkRefInstanciaInstrumento' => $request->fkRefInstanciaInstrumento,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Movimiento de Expediente registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $movimientoExpediente): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($movimientoExpediente,'MovimientoExpediente'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(Request $request, int $movimientoExpediente): JsonResponse
    {
        try {
            $movimientoExpediente = MovimientoExpediente::where('id', $movimientoExpediente)->first();
            $request = new UpdateMovimientoExpedienteRequest($request->toArray());
            $movimientoExpediente->fkExpediente = $request->fkExpediente ?: $movimientoExpediente->fkExpediente;
            $movimientoExpediente->fkRefInstanciaInstrumento = $request->fkRefInstanciaInstrumento ?: $movimientoExpediente->fkRefInstanciaInstrumento;
            // $movimientoExpediente->idUsuarioModificacion = $request->idUsuarioModificacion ?: $movimientoExpediente->idUsuarioModificacion;

            if ($movimientoExpediente->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $movimientoExpediente->updated_at= Carbon::now();
            $movimientoExpediente->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Movimiento de Expediente Modificada con exito',
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
            MovimientoExpediente::where('id', $id)->update(['estaActivo'=>false,]);
            MovimientoExpediente::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Movimiento de Expediente eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, MovimientoExpediente $movimientoExpediente)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $movimientoExpediente->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('fkRefInstanciaInstrumento', 'like', '%' . $request->q . '%')
                            ->orWhere('fkExpediente', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('fkRefInstanciaInstrumento', 'like', '%' . $request->q . '%')
                    ->orWhere('fkExpediente', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('fkExpediente')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
