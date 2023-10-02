<?php

namespace App\Http\Controllers;

use App\Models\Cooperadora;
use App\Models\Informe_gral;
use App\Models\OrganizacionRUCE;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        try {
            $datos = [];
            $cooperadoras = Cooperadora::all()->toArray();
            $cooperadorasVerde = count(array_filter($cooperadoras, function($cooperadora) {
                return $cooperadora['estado'] === 'VERDE';
            }));
            $cooperadorasAmarillo = count(array_filter($cooperadoras, function($cooperadora) {
                return $cooperadora['estado'] === 'AMARILLO';
            }));
            $cooperadorasRojo = count(array_filter($cooperadoras, function($cooperadora) {
                return $cooperadora['estado'] === 'ROJO';
            }));
            $instituciones = OrganizacionRUCE::with(['Cooperadora'])->get()->toArray();
            $instCoop = count(array_filter($instituciones, function($institucion) {
                return $institucion['cooperadora'] === null;
            }));
            $constancias = count(array_filter(Informe_gral::all()->toArray(), function($informe){
                return $informe['esReporte'] === false;
            }));
            
            $datos = [
                "totalCooperadoras" => count($cooperadoras),
                "totalInstituciones" => count($instituciones),
                "coopPersonaria" => $cooperadorasVerde,
                "coopExpediente" => $cooperadorasAmarillo,
                "coopSinNovedad" => $cooperadorasRojo,
                "coopConstancias" => $constancias,
                "instSinCoop" => $instCoop,
            ];
            return response()->json([
                'succeded' => true,
                'datos' => $datos
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
