<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;

use App\Http\Resources\AtencionSeguimientoResourse;
use App\Http\Requests\StoreAtencionSeguimientoRequest;
use App\Http\Requests\UpdateAtencionSeguimientoRequest;
use App\Models\AtencionSeguimiento;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AtencionSeguimientoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // return typeOf($request->page);
        try {
            if ($request->has('page')) {
                return new RequestCollection(AtencionSeguimiento::orderBy('atencionSeguimiento')->paginate());
            }

            return new RequestCollection(AtencionSeguimiento::orderBy('atencionSeguimiento')->get());
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
    public function store(StoreAtencionSeguimientoRequest $request)
    {
                try {
            AtencionSeguimiento::create([
                'fkCooperadora' => $request->fkCooperadora,
                'fkPersonaRUCE' => $request->fkPersonaRUCE,
                'llamadas' => $request->llamadas,
                'mesajes' => $request->mesajes,
                'emailEnviados' => $request->emailEnviados,
                'atencionOficina' => $request->atencionOficina,
                'atencionTerritorial' => $request->atencionTerritorial,
                'observacion' => $request->observacion,
                'fecha' => $request->fecha,
                'estaActivo' => $request->estaActivo,
                'fechaEliminacion' => $request->fechaEliminacion,
                'idUsuarioAlta' => $request->idUsuarioAlta,
                'idUsuarioModificacion' => $request->idUsuarioModificacion
            ]);
            return response()->json();
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
     * @param  \App\Models\AtencionSeguimiento  $atencionSeguimiento
     * @return \Illuminate\Http\Response
     */
    public function show(AtencionSeguimiento $atencionSeguimiento)
    {
        try {
            return response()->json(new AtencionSeguimientoResourse($atencionSeguimiento));
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
     * @param  \App\Models\AtencionSeguimiento  $atencionSeguimiento
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAtencionSeguimientoRequest $request, AtencionSeguimiento $atencionSeguimiento)
    {
        try {
            $atencionSeguimiento->fkCooperadora = $request->fkCooperadora ?: $atencionSeguimiento->fkCooperadora;
            $atencionSeguimiento->fkPersonaRUCE = $request->fkPersonaRUCE ?: $atencionSeguimiento->fkPersonaRUCE;
            $atencionSeguimiento->llamadas = $request->llamadas ?: $atencionSeguimiento->llamadas;
            $atencionSeguimiento->mesajes = $request->mesajes ?: $atencionSeguimiento->mesajes;
            $atencionSeguimiento->emailEnviados = $request->emailEnviados ?: $atencionSeguimiento->emailEnviados;
            $atencionSeguimiento->atencionOficina = $request->atencionOficina ?: $atencionSeguimiento->atencionOficina;
            $atencionSeguimiento->atencionTerritorial = $request->atencionTerritorial ?: $atencionSeguimiento->atencionTerritorial;
            $atencionSeguimiento->observacion = $request->observacion ?: $atencionSeguimiento->observacion;
            $atencionSeguimiento->fecha = $request->fecha ?: $atencionSeguimiento->fecha;
            $atencionSeguimiento->estaActivo = $request->estaActivo ?: $atencionSeguimiento->estaActivo;
            $atencionSeguimiento->idUsuarioModificacion = $request->idUsuarioModificacion ?: $atencionSeguimiento->idUsuarioModificacion;
            
            if ($atencionSeguimiento->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }

            $atencionSeguimiento->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Datos Modificados con exito',
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
     * @param  \App\Models\AtencionSeguimiento  $atencionSeguimiento
     * @return \Illuminate\Http\Response
     */
    public function destroy(AtencionSeguimiento $atencionSeguimiento)
    {
        try {
            
            AtencionSeguimiento::where('id', $atencionSeguimiento)->update([
                'estaActivo'=>false,   
            ]);

            $atencionSeguimiento->delete();

            return response()->json([
                'succeeded' => true,
                'message' => 'Especialidad eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, AtencionSeguimiento $atencionSeguimiento)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $atencionSeguimiento->newQuery();

        if ($request->fkCooperadora) {
            $query->where('fkCooperadora', $request->fkCooperadora)
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

        return new RequestCollection($query->orderBy('denominacion')->paginate()->appends(['q' => $request->q, 'fkCooperadora' => $request->fkCooperadora]));
    }
}