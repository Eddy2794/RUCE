<?php

namespace App\Http\Controllers;

use App\Models\Informe_gral;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ReporteController extends Controller
{
    public function index(Request $request)
    {
        try {
             
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
