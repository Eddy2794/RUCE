<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRefTipoAsociacionRequest;
use App\Http\Requests\UpdateRefTipoAsociacionRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\RefTipoAsociacion;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RefTipoAsociacionController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(RefTipoAsociacion::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(RefTipoAsociacion::all(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreRefTipoAsociacionRequest $request): JsonResponse
    {
        $request = new StoreRefTipoAsociacionRequest($request->toArray());
        try {
            RefTipoAsociacion::create([
                'tipoAsociacionDesc' => $request->tipoAsociacionDesc,
                'idUsuarioAlta'=>Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id
            ]);
            return response()->json([
                'message' => 'Tipo de Asociacion registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $refTipoFondo): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($refTipoFondo,'RefTipoAsociacion'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateRefTipoAsociacionRequest $request, int $refTipoFondo): JsonResponse
    {
        try {
            $refTipoFondo = RefTipoAsociacion::where('id', $refTipoFondo)->first();
            $refTipoFondo->tipoAsociacionDesc = $request->tipoAsociacionDesc ?: $refTipoFondo->tipoAsociacionDesc;

            if ($refTipoFondo->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $refTipoFondo->idUsuarioModificacion = Auth::user()->id;
            $refTipoFondo->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Tipo de Asociacion Modificada con exito',
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
            RefTipoAsociacion::where('id',$id)->update(['estaActivo'=>false,'idUsuarioModificacion'=>Auth::user()->id]);
            RefTipoAsociacion::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Tipo de Asociacion eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
