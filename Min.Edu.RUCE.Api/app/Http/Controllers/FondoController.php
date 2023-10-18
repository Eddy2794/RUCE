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
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Fondo::with('RefTipoFondo')->orderBy('anioOtorgado','desc')->get(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Fondo::with('RefTipoFondo')->orderBy('anioOtorgado','desc')->get(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
    
    public function store(StoreFondoRequest $request): JsonResponse
    {
        $request = new StoreFondoRequest($request->toArray());
        try {
            Fondo::create([
                'fkRefTipoFondo' => $request->fkRefTipoFondo,
                'fkCooperadora' => $request->fkCooperadora,
                'inscripta' => $request->inscripta,
                'verificada' => $request->verificada,
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
    
    public function show(int $fk_cooperadora): JsonResponse
    {
        try {
            $fondo = Fondo::where('fkCooperadora', $fk_cooperadora)->first();
            if($fondo){
                return response()->json(new ModelResourse($fondo['id'],'Fondo'));
            } else{
                return response()->json([
                    'succeeded' => false,
                    'message' => 'Fondo not found'
                ], Response::HTTP_NOT_FOUND);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
    
    public function update(UpdateFondoRequest $request, int $fondo): JsonResponse
    {
        try {
            $fondo = Fondo::where('id', $fondo)->first();
            //$request = new UpdateFondoRequest($request->toArray());
            $fondo->fkRefTipoFondo = $request->fkRefTipoFondo ?: $fondo->fkRefTipoFondo;
            $fondo->fkCooperadora = $request->fkCooperadora ?: $fondo->fkCooperadora;
            $fondo->inscripta = $request->inscripta !== null ? $request->inscripta : $fondo->inscripta;
            $fondo->verificada = $request->verificada !== null ? $request->verificada : $fondo->verificada;
            $fondo->fondoRecibido = $request->fondoRecibido !== null ? $request->fondoRecibido : $fondo->fondoRecibido;
            $fondo->fondoRendido = $request->fondoRendido !== null ? $request->fondoRendido : $fondo->fondoRendido;
            $fondo->monto = $request->monto ?: $fondo->monto;
            $fondo->fechaRecibido = $request->fechaRecibido ?: $fondo->fechaRecibido;
            $fondo->fechaRendicion = $request->fechaRendicion ?: $fondo->fechaRendicion;
            $fondo->anioOtorgado = $request->anioOtorgado ?: $fondo->anioOtorgado;
            $fondo->idUsuarioModificacion = $request->idUsuarioModificacion ?: $fondo->idUsuarioModificacion;

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
    
    public function destroy(int $id): JsonResponse
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
}
