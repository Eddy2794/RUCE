<?php

namespace App\Http\Controllers;

use App\Models\RefTipoComision;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRefTipoComisionRequest;
use App\Http\Requests\UpdateRefTipoComisionRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RefTipoComisionController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(RefTipoComision::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(RefTipoComision::all(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreRefTipoComisionRequest $request): JsonResponse
    {
        //$request = new StoreRefTipoComisionRequest($request->toArray());
        try {
            RefTipoComision::create([
                'tipoComisionDesc' => $request->tipoComisionDesc,
                'idUsuarioAlta'=>Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id
            ]);
            return response()->json([
                'message' => 'Tipo de Comision registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $refInstanciaInstrumento): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($refInstanciaInstrumento,'RefTipoComision'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateRefTipoComisionRequest $request, int $refInstanciaInstrumento): JsonResponse
    {
        try {
            $refInstanciaInstrumento = RefTipoComision::where('id', $refInstanciaInstrumento)->first();
            $refInstanciaInstrumento->tipoComisionDesc = $request->tipoComisionDesc ?: $refInstanciaInstrumento->tipoComisionDesc;

            if ($refInstanciaInstrumento->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $refInstanciaInstrumento->idUsuarioModificacion = Auth::user()->id;
            $refInstanciaInstrumento->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Tipo de Comision Modificada con exito',
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
            RefTipoComision::where('id',$id)->update(['estaActivo'=>false,'idUsuarioModifiacion'=>Auth::user()->id]);
            RefTipoComision::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Tipo de Comision eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
