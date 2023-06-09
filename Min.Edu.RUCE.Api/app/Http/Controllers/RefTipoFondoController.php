<?php

namespace App\Http\Controllers;

use App\Models\RefTipoFondo;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRefTipoFondoRequest;
use App\Http\Requests\UpdateRefTipoFondoRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class RefTipoFondoController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(RefTipoFondo::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(RefTipoFondo::paginate(10, ['*'], 'page', 1));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(Request $request): JsonResponse
    {
        $request = new StoreRefTipoFondoRequest($request->toArray());
        try {
            RefTipoFondo::create([
                'tipoFondoDesc' => $request->tipoFondoDesc,
            ]);
            return response()->json([
                'message' => 'Tipo de Fondo registrada con Exito',
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
            return response()->json(new ModelResourse($refTipoFondo,'RefTipoFondo'));
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
     * @param  \App\Models\RefTipoFondo  $refTipoFondo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $refTipoFondo): JsonResponse
    {
        try {
            $refTipoFondo = RefTipoFondo::where('id', $refTipoFondo)->first();
            $request = new UpdateRefTipoFondoRequest($request->toArray());
            $refTipoFondo->tipoFondoDesc = $request->tipoFondoDesc ?: $refTipoFondo->tipoFondoDesc;

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
                'message' => 'Tipo de Fondo Modificada con exito',
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
            RefTipoFondo::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Tipo de Fondo eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, RefTipoFondo $refTipoFondo)
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
                            ->orWhere('tipoFondoDesc', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('cue', 'like', '%' . $request->q . '%')
                    ->orWhere('tipoFondoDesc', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('tipoFondoDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
