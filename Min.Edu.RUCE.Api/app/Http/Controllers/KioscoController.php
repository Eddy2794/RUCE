<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKioscoRequest;
use App\Http\Requests\UpdateKioscoRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\Kiosco;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class KioscoController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Kiosco::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(Kiosco::paginate(10, ['*'], 'page', 1));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(StoreKioscoRequest $request): JsonResponse
    {
        $request = new StoreKioscoRequest($request->toArray());
        try {
            Kiosco::create([
                'fkCooperadora' => $request->fkCooperadora,
                'fkPersonaRUCE' => $request->fkPersonaRUCE,
                'accesoLicitacion' => $request->accesoLicitacion,
                'documentacionPresentada' => $request->documentacionPresentada,
                'periodoInicio' => $request->periodoInicio,
                'periodoFin' => $request->periodoFin,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Kiosco registrado con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $kiosco): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($kiosco,'Kiosco'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateKioscoRequest $request, int $kiosco): JsonResponse
    {
        try {
            $kiosco = Kiosco::where('id', $kiosco)->first();
            //$request = new UpdateKioscoRequest($request->toArray());
            $kiosco->fkCooperadora = $request->fkCooperadora ?: $kiosco->fkCooperadora;
            $kiosco->fkPersonaRUCE = $request->fkPersonaRUCE ?: $kiosco->fkPersonaRUCE;
            $kiosco->accesoLicitacion = $request->accesoLicitacion ?: $kiosco->accesoLicitacion;
            $kiosco->documentacionPresentada = $request->documentacionPresentada ?: $kiosco->documentacionPresentada;
            $kiosco->periodoInicio = $request->periodoInicio ?: $kiosco->periodoInicio;
            $kiosco->periodoFin = $request->periodoFin ?: $kiosco->periodoFin;
            // $kiosco->idUsuarioModificacion = $request->idUsuarioModificacion ?: $kiosco->idUsuarioModificacion;

            if ($kiosco->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $kiosco->updated_at= Carbon::now();
            $kiosco->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Kiosco Modificado con exito',
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
            Kiosco::where('id', $id)->update(['estaActivo'=>false,]);
            Kiosco::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Kiosco eliminado con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, Kiosco $kiosco)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $kiosco->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('cue', 'like', '%' . $request->q . '%')
                            ->orWhere('organizacionDesc', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('cue', 'like', '%' . $request->q . '%')
                    ->orWhere('organizacionDesc', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('organizacionDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
