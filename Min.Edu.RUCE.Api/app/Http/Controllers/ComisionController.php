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
use Illuminate\Support\Facades\Auth;

class ComisionController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Comision::orderBy('delete_at','desc')->get(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Comision::orderBy('delete_at','desc')->get(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreComisionRequest $request): JsonResponse
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
                'idUsuarioAlta'=>Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id
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
            $comision->fkCooperadora = $request->fkCooperadora ?: $comision->fkCooperadora;
            $comision->fkRefTipoComision = $request->fkRefTipoComision ?: $comision->fkRefTipoComision;
            $comision->periodoInicio = $request->periodoInicio ?: $comision->periodoInicio;
            $comision->periodoFin = $request->periodoFin ?: $comision->periodoFin;
            $comision->nroSocios = $request->nroSocios ?: $comision->nroSocios;
            $comision->estadoResolucion = $request->estadoResolucion ?: $comision->estadoResolucion;
            
            if ($comision->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            
            $comision->idUsuarioModificacion = Auth::user()->id;
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
            Comision::where('id', $id)->update(['estaActivo'=>false,'idUsuarioModificacion'=>Auth::user()->id]);
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
}
