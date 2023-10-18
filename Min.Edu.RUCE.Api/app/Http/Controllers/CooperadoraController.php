<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCooperadoraRequest;
use App\Http\Requests\UpdateCooperadoraRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\Cooperadora;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class CooperadoraController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber') && $request->has('PageSize')) {
                return new RequestCollection(Cooperadora::with('OrganizacionRUCE')->orderBy('denominacion', 'desc')->get(), $request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(with('OrganizacionRUCE')->orderBy('denominacion', 'desc')->get(), 10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(StoreCooperadoraRequest $request): JsonResponse
    {
        //$request = new StoreCooperadoraRequest($request->toArray());
        try {
            Cooperadora::create([
                'fkRefTipoAsociacion' => $request->fkRefTipoAsociacion,
                'fkOrganizacionRUCE' => $request->fkOrganizacionRUCE,
                'cuit' => $request->cuit,
                'legajo' => $request->legajo,
                'denominacion' => $request->denominacion,
                'estado' => $request->estado,
                'convenioCsEconomicas' => $request->convenioCsEconomicas,
                'estadoAfip' => $request->estadoAfip,
                'estadoRentas' => $request->estadoRentas,
                'inscripcionRenacopes' => $request->inscripcionRenacopes,
                'modalidad' => $request->modalidad,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Cooperadora registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function show(int $cooperadora): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($cooperadora, 'Cooperadora'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function update(UpdateCooperadoraRequest $request, int $cooperadora): JsonResponse
    {
        try {
            $cooperadora = Cooperadora::where('id', $cooperadora)->first();
            //$request = new UpdateCooperadoraRequest($request->toArray());
            $cooperadora->fkRefTipoAsociacion = $request->fkRefTipoAsociacion ?: $cooperadora->fkRefTipoAsociacion;
            $cooperadora->fkOrganizacionRUCE = $request->fkOrganizacionRUCE ?: $cooperadora->fkOrganizacionRUCE;
            $cooperadora->cuit = $request->cuit ?: $cooperadora->cuit;
            $cooperadora->legajo = $request->legajo ?: $cooperadora->legajo;
            $cooperadora->denominacion = $request->denominacion ?: $cooperadora->denominacion;
            $cooperadora->estado = $request->estado ?: $cooperadora->estado;
            $cooperadora->convenioCsEconomicas = $request->convenioCsEconomicas !== null ? $request->convenioCsEconomicas : $cooperadora->convenioCsEconomicas;
            $cooperadora->estadoAfip = $request->estadoAfip !== null ? $request->estadoAfip : $cooperadora->estadoAfip;
            $cooperadora->estadoRentas = $request->estadoRentas !== null ? $request->estadoRentas : $cooperadora->estadoRentas;
            $cooperadora->inscripcionRenacopes = $request->inscripcionRenacopes !== null ? $request->inscripcionRenacopes : $cooperadora->inscripcionRenacopes;
            $cooperadora->modalidad = $request->modalidad ?: $cooperadora->modalidad;
            $cooperadora->idUsuarioModificacion = $request->idUsuarioModificacion ?: $cooperadora->idUsuarioModificacion;

            if ($cooperadora->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $cooperadora->updated_at = Carbon::now();
            $cooperadora->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Cooperadora Modificada con exito',
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
            Cooperadora::where('id', $id)->update(['estaActivo' => false,]);
            Cooperadora::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Cooperadora eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
