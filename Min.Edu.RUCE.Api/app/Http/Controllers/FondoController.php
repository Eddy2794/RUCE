<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFondoRequest;
use App\Http\Requests\UpdateFondoRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\Fondo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class FondoController extends Controller
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
                return new RequestCollection(Fondo::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(Fondo::paginate(10, ['*'], 'page', 1));
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
        $request = new StoreFondoRequest($request->toArray());
        try {
            Fondo::create([
                'fkTipoFondo' => $request->fkTipoFondo,
                'fkCooperadora' => $request->fkCooperadora,
                'fondoRecibido' => $request->fondoRecibido,
                'fondoRendido' => $request->fondoRendido,
                'monto' => $request->monto,
                'fechaRecibido' => $request->fechaRecibido,
                'fechaRendicion' => $request->fechaRendicion,
                'anioOtorgado' => $request->anioOtorgado,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Fondo registrada con Exito',
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
     * @param  \App\Models\Fondo  $fondo
     * @return \Illuminate\Http\Response
     */
    public function show(int $fondo)
    {
        try {
            return response()->json(new ModelResourse($fondo,'Fondo'));
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
     * @param  \App\Models\Fondo  $fondo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $fondo)
    {
        try {
            $fondo = Fondo::where('id', $fondo)->first();
            $request = new UpdateFondoRequest($request->toArray());
            $fondo->fkTipoFondo = $request->fkTipoFondo ?: $fondo->fkTipoFondo;
            $fondo->fkCooperadora = $request->fkCooperadora ?: $fondo->fkCooperadora;
            $fondo->fondoRecibido = $request->fondoRecibido ?: $fondo->fondoRecibido;
            $fondo->fondoRendido = $request->fondoRendido ?: $fondo->fondoRendido;
            $fondo->monto = $request->monto ?: $fondo->monto;
            $fondo->fechaRecibido = $request->fechaRecibido ?: $fondo->fechaRecibido;
            $fondo->fechaRendicion = $request->fechaRendicion ?: $fondo->fechaRendicion;
            $fondo->anioOtorgado = $request->anioOtorgado ?: $fondo->anioOtorgado;
            // $fondo->idUsuarioModificacion = $request->idUsuarioModificacion ?: $fondo->idUsuarioModificacion;

            if ($fondo->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $fondo->updated_at= Carbon::now();
            $fondo->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Fondo Modificada con exito',
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
     * @param  \App\Models\Fondo  $fondo
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        try {
            Fondo::where('id', $id)->update(['estaActivo'=>false,]);
            Fondo::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Fondo eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, Fondo $fondo)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $fondo->newQuery();

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
