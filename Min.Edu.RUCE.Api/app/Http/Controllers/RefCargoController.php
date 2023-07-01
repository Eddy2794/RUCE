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

class RefCargoController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(RefCargo::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(RefCargo::paginate(10, ['*'], 'page', 1));
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
            //$request = new UpdateRefCargoRequest($request->toArray());
            $refCargo->cargoDesc = $request->cargoDesc ?: $refCargo->cargoDesc;
            if ($refCargo->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $refCargo->updated_at= Carbon::now();
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

    public function search(Request $request, RefCargo $refCargo)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $refCargo->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('cue', 'like', '%' . $request->q . '%')
                            ->orWhere('cargoDesc', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('cue', 'like', '%' . $request->q . '%')
                    ->orWhere('cargoDesc', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('cargoDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
