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

class RefTipoAsociacionController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(RefTipoAsociacion::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(RefTipoAsociacion::paginate(10, ['*'], 'page', 1));
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
            //$request = new UpdateRefTipoAsociacionRequest($request->toArray());
            $refTipoFondo->tipoAsociacionDesc = $request->tipoAsociacionDesc ?: $refTipoFondo->tipoAsociacionDesc;

            if ($refTipoFondo->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $refTipoFondo->updated_at= Carbon::now();
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

    public function search(Request $request, RefTipoAsociacion $refTipoFondo)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $refTipoFondo->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('cue', 'like', '%' . $request->q . '%')
                            ->orWhere('tipoAsociacionDesc', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('cue', 'like', '%' . $request->q . '%')
                    ->orWhere('tipoAsociacionDesc', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('tipoAsociacionDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
