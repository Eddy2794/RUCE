<?php

namespace App\Http\Controllers;

use App\Models\RefCargo;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRefCargoRequest;
use App\Http\Requests\UpdateRefCargoRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RefCargoController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(RefCargo::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(RefCargo::all(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreRefCargoRequest $request): JsonResponse
    {
        //$request = new StoreRefCargoRequest($request->toArray());
        try {
            RefCargo::create([
                'cargoDesc' => $request->cargoDesc,
                'idUsuarioAlta'=>Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id
            ]);
            return response()->json([
                'message' => 'Cargo registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $refCargo): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($refCargo,'RefCargo'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateRefCargoRequest $request, int $refCargo): JsonResponse
    {
        try {
            $refCargo = RefCargo::where('id', $refCargo)->first();
            $refCargo->cargoDesc = $request->cargoDesc ?: $refCargo->cargoDesc;
            if ($refCargo->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $refCargo->idUsuarioModificacion = Auth::user()->id;
            $refCargo->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Cargo Modificada con exito',
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
            RefCargo::where('id',$id)->update(['estaActivo'=>false,'idUsuarioModificacion'=>Auth::user()->id]);
            RefCargo::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Cargo eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
