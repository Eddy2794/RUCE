<?php

namespace App\Http\Controllers;

use \Carbon\Carbon;
use Illuminate\Support\Collection;
use App\Http\Resources\RequestCollection;
use App\Models\Cooperadora;
use App\Models\Informe_gral;
use App\Models\OrganizacionRUCE;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

use App\Exports\ReportExport;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    public function index(Request $request){
        try {
            $reportes = Informe_gral::where('fkCooperadora',null)->orderBy('created_at','desc')->get(['id','created_at'])->toArray();
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(collect($reportes),$request['PageSize'], $request['PageNumber']);
            }
            return new RequestCollection(collect($reportes),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $id){
        $datos = Informe_gral::where('id',$id)->get()->toArray()[0];
        $export = new ReportExport($datos['datos']);
        return Excel::download($export, 'reporte-'. $datos['created_at'].'.xlsx');
    }

    public function export(Collection $datos) 
    {
        try{
            if ($datos->toArray() != []) {
                $informe_gralController = new Informe_gralController();
                $titulos = [
                    "ORGANIZACION DESC",
                    "TIPO ASOCIACION",
                    "ATENCION SEGUIMIENTO"
                ];
                $datos = $datos->map(function ($item) {
                    return [
                        'organizacionDesc' => $item->organizacionDesc,
                        // Agrega aquí otros campos que desees aplanar desde las relaciones.
                        // 'matricula' => $item->Matricula->matricula ?? "Sin Informacion",
                        'refTipoAsociacion' => $item->Cooperadora->RefTipoAsociacion[0]->tipoAsociacionDesc ?? "Sin Información",
                        'atencionSeguimiento' => $item->Cooperadora->AtencionSeguimiento ?? null,
                        // Continúa agregando campos según tus necesidades.
                    ];
                });

                $datos = collect(array_merge([$titulos],[$datos->toArray()]));
                // dd($datos);
                
                $informe_gralController->store($datos->toArray());

                $export = new ReportExport($datos->toArray());
                return Excel::download($export, 'reporte-'. Carbon::now()->format('d-m-Y H:i:s').'.xlsx');
            }
            return response()->json([
                'succeeded' => false,
                'message' => "Lista Vacía."
            ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th){
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}