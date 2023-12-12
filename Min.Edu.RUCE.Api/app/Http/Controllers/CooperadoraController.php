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
use Illuminate\Support\Facades\Auth;

class CooperadoraController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber') && $request->has('PageSize')) {
                return new RequestCollection(Cooperadora::with('OrganizacionRUCE')->orderBy('denominacion', 'desc')->get(), $request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Cooperadora::orderBy('created_at','desc')->get(), 10, 1);
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
                'fechaCreacion' => $request->fechaCreacion,
                'idUsuarioAlta'=>Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id
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
            $cooperadora->fechaCreacion = $request->fechaCreacion !== null || $request->fechaCreacion == null ? $request->fechaCreacion : $cooperadora->fechaCreacion;
            
            if ($cooperadora->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            
            $cooperadora->idUsuarioModificacion = Auth::user()->id;
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
            Cooperadora::where('id', $id)->update(['estaActivo' => false,'idUsuarioModificacion' => Auth::user()->id]);
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
