<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;

use App\Http\Resources\AtencionSeguimientoResourse;
use App\Http\Requests\StoreAtencionSeguimientoRequest;
use App\Http\Requests\UpdateAtencionSeguimientoRequest;
use App\Http\Resources\ModelResourse;
use App\Models\AtencionSeguimiento;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AtencionSeguimientoController extends Controller
{
    public function index(Request $request)
    {
        // return typeOf($request->page);
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(AtencionSeguimiento::orderBy('fecha', 'desc')->get(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }

            return new RequestCollection(AtencionSeguimiento::orderBy('fecha', 'desc')->get(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreAtencionSeguimientoRequest $request)
    {
        //$request = new StoreAtencionSeguimientoRequest($request->toArray());
                try {
            AtencionSeguimiento::create([
                'fkCooperadora' => $request->fkCooperadora,
                // 'fkPersonaRUCE' => $request->fkPersonaRUCE,
                'llamadas' => $request->llamadas,
                'mesajes' => $request->mesajes,
                'emailEnviados' => $request->emailEnviados,
                'atencionOficina' => $request->atencionOficina,
                'atencionTerritorial' => $request->atencionTerritorial,
                'observacion' => $request->observacion,
                'fecha' => $request->fecha,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Organizacion registrada con Exito',
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
     * @param  \App\Models\AtencionSeguimiento  $atencionSeguimiento
     * @return \Illuminate\Http\Response
     */
    public function show(int $atencionSeguimiento)
    {
        try {
            return response()->json(new ModelResourse($atencionSeguimiento,'AtencionSeguimiento'));
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
    public function update(UpdateAtencionSeguimientoRequest $request, int $atencionSeguimiento)
    {
        try {
            $atencionSeguimiento = AtencionSeguimiento::where('id', $atencionSeguimiento)->first();
            //$request = new UpdateAtencionSeguimientoRequest($request->toArray());
            $atencionSeguimiento->fkCooperadora = $request->fkCooperadora ?: $atencionSeguimiento->fkCooperadora;
            // $atencionSeguimiento->fkPersonaRUCE = $request->fkPersonaRUCE ?: $atencionSeguimiento->fkPersonaRUCE;
            $atencionSeguimiento->llamadas = $request->llamadas == null || $request->llamadas !== null ? $request->llamadas : $atencionSeguimiento->llamadas;
            $atencionSeguimiento->mensajes = $request->mensajes == null || $request->mensajes !== null ? $request->mensajes : $atencionSeguimiento->mensajes;
            $atencionSeguimiento->emailEnviados = $request->emailEnviados == null || $request->emailEnviados !== null ? $request->emailEnviados : $atencionSeguimiento->emailEnviados;
            $atencionSeguimiento->atencionOficina = $request->atencionOficina == null || $request->atencionOficina !== null ? $request->atencionOficina : $atencionSeguimiento->atencionOficina;
            $atencionSeguimiento->atencionTerritorial = $request->atencionTerritorial == null || $request->atencionTerritorial !== null ? $request->atencionTerritorial : $atencionSeguimiento->atencionTerritorial;
            $atencionSeguimiento->observacion = $request->observacion == null || $request->observacion !== null ? $request->observacion : $atencionSeguimiento->observacion;
            $atencionSeguimiento->fecha = $request->fecha ?: $atencionSeguimiento->fecha;
            $atencionSeguimiento->estaActivo = $request->estaActivo ?: $atencionSeguimiento->estaActivo;
            $atencionSeguimiento->idUsuarioModificacion = $request->idUsuarioModificacion ?: $atencionSeguimiento->idUsuarioModificacion;
            
            if ($atencionSeguimiento->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            //$organizacionRUCE->updated_at= Carbon::now();
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
    public function destroy(int $id)
    {
        try {
            AtencionSeguimiento::where('id', $id)->update(['estaActivo'=>false,]);
            AtencionSeguimiento::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Datos eliminados con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}