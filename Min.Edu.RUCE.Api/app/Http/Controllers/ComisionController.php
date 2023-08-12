<?php

namespace App\Http\Controllers;

use App\Models\Comision;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComisionRequest;
use App\Http\Requests\UpdateComisionRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ComisionController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Comision::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Comision::paginate(10, ['*'], 'page', 1));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreComisionRequest $request)
    {
        //$request = new StoreComisionRequest($request->toArray());
        try {
            Comision::create([
                'fkCooperadora' => $request->fkCooperadora,
                'fkRefTipoComision' => $request->fkRefTipoComision,
                'periodoInicio' => $request->periodoInicio,
                'periodoFin' => $request->periodoFin,
                'nroSocios' => $request->nroSocios,
                'estadoResolucion' => $request->estadoResolucion,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Comision registrada con Exito',
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
            $comision = Comision::where('fkCooperadora', $fk_cooperadora)->first();

        if ($comision) {
            return response()->json(new ModelResourse($comision['id'], 'Comision'));
        } else {
            return response()->json([
                'succeeded' => false,
                'message' => 'Comision not found'
            ], Response::HTTP_NOT_FOUND);
        }
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
     * @param  \App\Models\Comision  $comision
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateComisionRequest $request, int $comision)
    {
        try {
            $comision = Comision::where('id', $comision)->first();
            //$request = new UpdateComisionRequest($request->toArray());
            $comision->fkCooperadora = $request->fkCooperadora ?: $comision->fkCooperadora;
            $comision->fkRefTipoComision = $request->fkRefTipoComision ?: $comision->fkRefTipoComision;
            $comision->periodoInicio = $request->periodoInicio ?: $comision->periodoInicio;
            $comision->periodoFin = $request->periodoFin ?: $comision->periodoFin;
            $comision->nroSocios = $request->nroSocios ?: $comision->nroSocios;
            $comision->estadoResolucion = $request->estadoResolucion ?: $comision->estadoResolucion;
            $comision->idUsuarioModificacion = $request->idUsuarioModificacion ?: $comision->idUsuarioModificacion;

            if ($comision->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $comision->updated_at= Carbon::now();
            $comision->save();

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

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comision  $comision
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        try {
            Comision::where('id', $id)->update(['estaActivo'=>false,]);
            Comision::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Comision eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, Comision $comision)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $comision->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('fkCooperadora', 'like', '%' . $request->q . '%')
                            ->orWhere('denominacion', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('fkCooperadora', 'like', '%' . $request->q . '%')
                    ->orWhere('denominacion', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('organizacionDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
