<?php

namespace App\Http\Controllers;

use Exception;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use OwenIt\Auditing\Models\Audit;
use Illuminate\Pagination\LengthAwarePaginator;

class AuditController extends Controller
{
    protected function index(Request $request){
        $datos = $this->getAudits($request)->getData();
        // dd($datos->error);
        try{
            return response()->json( [
                'message' => $datos->error,
                'succeeded' => false,
            ], Response::HTTP_BAD_REQUEST);
        }
        catch(Exception $e){
            $paginacion = new LengthAwarePaginator(collect($datos), collect($datos)->count(),10);
            return [
                "entities"=>$paginacion->getCollection(),
                'succeeded' => true,
                'paged' => [
                    'entityCount' => $paginacion['total'],
                    'pageSize' => $paginacion['perPage'],
                    'pageNumber' => $paginacion['currentPage']
                ]
            ];
        }
    }
    private function completarModels(array $audits){
        $respuesta = [];
        array_push($respuesta,["expediente" => $audits[0]['new_values'], "fecha" => $audits[0]["created_at"]]);
        if($audits[1]){
            for($i = 1; $i < count($audits); $i++){
                $actual = $respuesta[$i-1];
                $claves = array_keys($audits[$i]['new_values']);
                foreach($claves as $clave){
                    $actual["expediente"][$clave] = $audits[$i]['new_values'][$clave];
                }
                $actual["fecha"]=$audits[$i]['created_at'];
                array_push($respuesta,$actual);
            }
            usort($respuesta, function ($a, $b) {
                return strtotime($b['fecha']) - strtotime($a['fecha']);
            });
        }
        return $respuesta;
    }

    private function getAuditsAdmin(Request $request): JsonResponse
    {
        // Obtener los registros de auditoría de un modelo y un ID específico
        if($request != null){
            if (class_exists('App\Models\\'.$request['modelo'])) {
                try{
                    $audits = Audit::where([
                        'auditable_type' => 'App\Models\\'.$request['modelo'],
                        'auditable_id' => $request['id'],
                    ])->whereIn('event', ['created', 'updated'])
                    ->orderBy('created_at')->get()->toArray();
                    $audits = $this->completarModels($audits);
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

    protected function getAudits(Request $request): JsonResponse
    {   
        //dd($request->get('Id'));
        // Obtener los registros de auditoría de un modelo y un ID específico
        if($request != null){
            //if (class_exists('App\Models\\'.$request['modelo'])) {
            if ($request->get('Id')!="") {
                try{
                    $audits = Audit::where([
                        'auditable_type' => 'App\Models\Expediente',
                        'auditable_id' => $request['id'],
                    ])->whereIn('event', ['created', 'updated'])
                    ->orderBy('created_at')
                    ->get(['new_values','created_at'])
                    ->toArray();
                    $audits = $this->completarModels($audits);
                } catch(\Throwable $th){
                    $audits = [$th];
                }
                return response()->json($audits);
            }
            else return response()->json(["error" =>"El modelo ".$request['modelo']." no existe.", "status" => JsonResponse::HTTP_BAD_REQUEST]);
        }
        else return response()->json(["error" =>"Peticion vacia.", "status" => JsonResponse::HTTP_BAD_REQUEST]);
    }
}
