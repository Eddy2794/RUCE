<?php

namespace App\Http\Controllers;

use App\Models\Matricula;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMatriculaRequest;
use App\Http\Requests\UpdateMatriculaRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class MatriculaController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Matricula::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(Matricula::paginate(10, ['*'], 'page', 1));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(Request $request): JsonResponse
    {
        $request = new StoreMatriculaRequest($request->toArray());
        try {
            Matricula::create([
                'fkmatricula' => $request->fkmatricula,
                'periodoLectivo' => $request->periodoLectivo,
                'matricula' => $request->matricula,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Matricula registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function show(int $matricula): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($matricula,'Matricula'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(Request $request, int $matricula): JsonResponse
    {
        try {
            $matricula = Matricula::where('id', $matricula)->first();
            $request = new UpdateMatriculaRequest($request->toArray());
            $matricula->fkOrganizacionRUCE = $request->fkOrganizacionRUCE ?: $matricula->fkOrganizacionRUCE;
            $matricula->periodoLectivo = $request->periodoLectivo ?: $matricula->periodoLectivo;
            $matricula->matricula = $request->matricula ?: $matricula->matricula;
            // $matricula->idUsuarioModificacion = $request->idUsuarioModificacion ?: $matricula->idUsuarioModificacion;

            if ($matricula->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $matricula->updated_at= Carbon::now();
            $matricula->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Organizacion Modificada con exito',
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
            Matricula::where('id', $id)->update(['estaActivo'=>false,]);
            Matricula::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Matricula eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, Matricula $matricula)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $matricula->newQuery();

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
