<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OwenIt\Auditing\Models\Audit;

class AuditController extends Controller
{
    public function getAuditsAdmin(Request $request): JsonResponse
    {
        // Obtener los registros de auditoría de un modelo y un ID específico
        if($request != null){
            if (class_exists('App\Models\\'.$request['modelo'])) {
                try{
                    $audits = Audit::where([
                        'auditable_type' => 'App\Models\\'.$request['modelo'],
                        'auditable_id' => $request['id'],
                        'event' => $request['event'],
                    ])->get()->toArray();
                    // dd($audits);
                } catch(\Throwable $th){
                    $audits = [$th];
                }
                return response()->json(["audits" => $audits, "status" => JsonResponse::HTTP_OK]);
            }
            else return response()->json(["error" =>"El modelo ".$request['modelo']." no existe.", "status" => JsonResponse::HTTP_BAD_REQUEST]);
        }
        else return response()->json(["error" =>"Peticion vacia.", "status" => JsonResponse::HTTP_BAD_REQUEST]);
    }

    public function getAudits(Request $request): JsonResponse
    {
        // Obtener los registros de auditoría de un modelo y un ID específico
        if($request != null){
            if (class_exists('App\Models\\'.$request['modelo'])) {
                try{
                    $audits = Audit::where([
                        'auditable_type' => 'App\Models\\'.$request['modelo'],
                        'auditable_id' => $request['id'],
                        'event' => $request['event'],
                    ])->get(['old_values','new_values','created_at'])->toArray();
                    // dd($audits);
                } catch(\Throwable $th){
                    $audits = [$th];
                }
                return response()->json(["audits" => $audits, "status" => JsonResponse::HTTP_OK]);
            }
            else return response()->json(["error" =>"El modelo ".$request['modelo']." no existe.", "status" => JsonResponse::HTTP_BAD_REQUEST]);
        }
        else return response()->json(["error" =>"Peticion vacia.", "status" => JsonResponse::HTTP_BAD_REQUEST]);
    }
}
