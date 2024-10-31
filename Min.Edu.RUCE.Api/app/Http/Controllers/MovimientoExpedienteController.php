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
use Illuminate\Support\Facades\Auth;

class MovimientoExpedienteController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber') && $request->has('PageSize')) {
                return new RequestCollection(MovimientoExpediente::all(), $request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(MovimientoExpediente::all(), 10, 1);
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
            return response()->json(new ModelResourse($movimientoExpediente, 'MovimientoExpediente'));
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
            MovimientoExpediente::where('id', $id)->update(['estaActivo' => false,'idUsuarioModificaion' => Auth::user()->id]);
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
}
