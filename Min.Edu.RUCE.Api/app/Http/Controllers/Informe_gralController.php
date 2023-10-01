<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;
use App\Models\Informe_gral;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class Informe_gralController extends Controller
{
    public function index(Request $request)
    {
        try {
            $filtersArray = get_object_vars(json_decode($request['filtros']));
            $datos = Informe_gral::with('Cooperadora.OrganizacionRUCE.Matricula')
            ->whereHas('Cooperadora.OrganizacionRUCE', function ($query) use (&$filtersArray) {
                $query->where(function ($query) use (&$filtersArray) {
                    foreach ($filtersArray as $clave => $valor) {
                        if ($clave != 'matricula') {
                            $query->where($clave, $valor);
                            unset($filtersArray[$clave]);
                        }
                    }
                });
            
                $query->whereHas('Matricula', function ($query) use (&$filtersArray) {
                    foreach ($filtersArray as $clave => $valor) {
                        if ($clave == 'matricula') {
                            $valores = explode(" ", $valor);
                            $query->where('matricula', $valores[0], $valores[1]);
                        }
                    }
                });
            })
            ->get();
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection($datos, $request['PageSize'], $request['PageNumber'], $request['descContains']);
            }
            return new RequestCollection($datos, 10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function show(Informe_gral $informe_gral): JsonResponse
    {
        try {
            
            return response()->json();
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(Request $request): JsonResponse
    {
        try {

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

    public function destroy(Informe_gral $informe_gral): JsonResponse
    {
        try {
            
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
