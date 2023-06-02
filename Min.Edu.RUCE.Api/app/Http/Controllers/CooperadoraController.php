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
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Cooperadora::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(Cooperadora::paginate(10, ['*'], 'page', 1));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request = new StoreCooperadoraRequest($request->toArray());
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
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Cooperadora  $cooperadora
     * @return \Illuminate\Http\Response
     */
    public function show(int $cooperadora): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($cooperadora,'Cooperadora'));
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
     * @param  \App\Models\Cooperadora  $cooperadora
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $cooperadora)
    {
        try {
            $cooperadora = Cooperadora::where('id', $cooperadora)->first();
            $request = new UpdateCooperadoraRequest($request->toArray());
            $cooperadora->fkRefTipoAsociacion = $request->fkRefTipoAsociacion ?: $cooperadora->fkRefTipoAsociacion;
            $cooperadora->fkOrganizacionRUCE = $request->fkOrganizacionRUCE ?: $cooperadora->fkOrganizacionRUCE;
            $cooperadora->cuit = $request->cuit ?: $cooperadora->cuit;
            $cooperadora->legajo = $request->legajo ?: $cooperadora->legajo;
            $cooperadora->denominacion = $request->denominacion ?: $cooperadora->denominacion;
            $cooperadora->estado = $request->estado ?: $cooperadora->estado;
            $cooperadora->convenioCsEconomicas = $request->convenioCsEconomicas ?: $cooperadora->convenioCsEconomicas;
            $cooperadora->estadoAfip = $request->estadoAfip ?: $cooperadora->estadoAfip;
            $cooperadora->estadoRentas = $request->estadoRentas ?: $cooperadora->estadoRentas;
            $cooperadora->inscripcionRenacopes = $request->inscripcionRenacopes ?: $cooperadora->inscripcionRenacopes;
            // $cooperdora->idUsuarioModificacion = $request->idUsuarioModificacion ?: $cooperadora->idUsuarioModificacion;

            if ($cooperadora->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $cooperadora->updated_at= Carbon::now();
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Cooperadora  $cooperadora
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        try {
            Cooperadora::where('id', $id)->update(['estaActivo'=>false,]);
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

    public function search(Request $request, Cooperadora $cooperadora)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $cooperadora->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('cuit', 'like', '%' . $request->q . '%')
                            ->orWhere('denominacion', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('cuit', 'like', '%' . $request->q . '%')
                    ->orWhere('denominacion', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('organizacionDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
