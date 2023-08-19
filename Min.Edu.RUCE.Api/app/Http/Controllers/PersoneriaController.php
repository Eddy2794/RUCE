<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersoneriaRequest;
use App\Http\Requests\UpdatePersoneriaRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\Personeria;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class PersoneriaController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Personeria::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Personeria::all(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StorePersoneriaRequest $request): JsonResponse
    {
        //$request = new StorePersoneriaRequest($request->toArray());
        try {
            Personeria::create([
                'fkExpediente' => $request->fkExpediente,
                'fkCooperadora' => $request->fkCooperadora,
                'decreto' => $request->decreto,
                'nroResolucion' => $request->nroResolucion,
                'fecha' => $request->fecha,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Personeria registrada con Exito',
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
            $personeria = Personeria::where('fkCooperadora', $fk_cooperadora)->first();

        if ($personeria) {
            return response()->json(new ModelResourse($personeria['id'], 'Personeria'));
        } else {
            return response()->json([
                'succeeded' => false,
                'message' => 'Personeria not found'
            ], Response::HTTP_NOT_FOUND);
        }
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdatePersoneriaRequest $request, int $personeria): JsonResponse
    {
        try {
            $personeria = Personeria::where('id', $personeria)->first();
            //$request = new UpdatePersoneriaRequest($request->toArray());
            $personeria->fkExpediente = $request->fkExpediente ?: $personeria->fkExpediente;
            $personeria->fkCooperadora = $request->fkCooperadora ?: $personeria->fkCooperadora;
            $personeria->decreto = $request->decreto ?: $personeria->decreto;
            $personeria->nroResolucion = $request->nroResolucion ?: $personeria->nroResolucion;
            $personeria->fecha = $request->fecha ?: $personeria->fecha;
            // $personeria->idUsuarioModificacion = $request->idUsuarioModificacion ?: $personeria->idUsuarioModificacion;

            if ($personeria->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $personeria->updated_at= Carbon::now();
            $personeria->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Personeria Modificada con exito',
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
            Personeria::where('id', $id)->update(['estaActivo'=>false,]);
            Personeria::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Personeria eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, Personeria $personeria)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $personeria->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('fkCooperadora', 'like', '%' . $request->q . '%')
                            ->orWhere('fkExpediente', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('fkCooperadora', 'like', '%' . $request->q . '%')
                    ->orWhere('fkExpediente', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('fkExpediente')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
