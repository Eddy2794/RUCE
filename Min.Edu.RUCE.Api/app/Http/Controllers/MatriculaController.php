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
                return new RequestCollection(Matricula::orderBy('periodoLectivo','desc')->get(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Matricula::orderBy('periodoLectivo','desc')->get(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreMatriculaRequest $request): JsonResponse
    {
        //$request = new StoreMatriculaRequest($request->toArray());
        try {
            Matricula::create([
                'fkOrganizacionRUCE' => $request->fkOrganizacionRUCE,
                'periodoLectivo' => $request->periodoLectivo,
                'matricula' => $request->matricula,
                'fecha' => $request->fecha,
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
            ], Response::HTTP_BAD_REQUEST);
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

    public function update(UpdateMatriculaRequest $request, int $matricula): JsonResponse
    {
        try {
            $matricula = Matricula::where('id', $matricula)->first();
            //$request = new UpdateMatriculaRequest($request->toArray());
            $matricula->fkOrganizacionRUCE = $request->fkOrganizacionRUCE ?: $matricula->fkOrganizacionRUCE;
            $matricula->periodoLectivo = $request->periodoLectivo ?: $matricula->periodoLectivo;
            $matricula->matricula = $request->matricula ?: $matricula->matricula;
            $matricula->fecha = $request->fecha !==null || $request->fecha ==null ? $request->fecha: $matricula->fecha;
            $matricula->idUsuarioModificacion = $request->idUsuarioModificacion ?: $matricula->idUsuarioModificacion;

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
}
