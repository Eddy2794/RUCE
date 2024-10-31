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
                    "CUE",
                    "NOMBRE DE LA INSTITUCION",
                    "LOCALIDAD",
                    "DEPARTAMENTO",
                    "NIVEL",
                    "REGION",
                    "CALLE",
                    "NUMERO",
                    "BARRIO",
                    "EMAIL",
                    "TELEFONO",
                    "DENOMINACION DE LA COOPERADORA",
                    "CUIT",
                    "TIPO DE ASOCIACION",
                    "ESTADO",
                    "LEGAJO",
                    "MODALIDAD",
                    "CONVENIO CS ECONOMICAS",
                    "INSCRIPCION AFIP",
                    "INSCRIPCION RENTAS",
                    "INSCRIPCION RENACOPES",
                    "FECHA DE CREACIÓN",
                    "TIPO DE COMISION",
                    "INICIO DE PERIODO",
                    "FIN DE PERIODO",
                    "CANT DE SOCIOS",
                    "ESTADO",
                    "CARGO DE AUTORIDAD",
                    "CUIL",
                    "APELLIDO",
                    "NOMBRES",
                    "TELEFONO",
                    "EMAIL",
                    "INICIO DE CARGO",
                    "FIN DE CARGO",
                    "NUMERO DE EXPEDIENTE",
                    "CANT DE OBSERVACIONES",
                    "DESCRIPCION DE OBSERVACIONES",
                    "OBSERVACIONES RESPONDIDAS",
                    "INSTANCIA DE INSTRUMENTO",
                    "RESOLUCION",
                    "DECRETO",
                    "FECHA DE OBTENCION",
                    "AÑO DE BALANCE",
                    "BALANCE RENDIDO",
                    "OBSERVACION DE BALANCE",
                    "FECHA DE RENDICION",
                    "TIPO DE FONDO",
                    "MONTO",
                    "INSCRIPTA",
                    "VERIFICADA",
                    "FONDO RECIBIDO",
                    "FECHA DE RECIBIDO",
                    "FONDO RENDIDO",
                    "FECHA DE RENDICION",
                    "AÑO OTORGADO",
                    "ACCESO CON LICITACION DE KIOSCO",
                    "DOCUMENTACION PRESENTADA",
                    "INICIO DE PERIODO",
                    "FIN DE PERIODO",
                    "CUIL",
                    "APELLIDO",
                    "NOMBRE",
                    "LLAMADAS REALIZADAS",
                    "MENSAJES ENVIADOS",
                    "EMAIL ENVIADOS",
                    "ATENCION EN OFICINA",
                    "ATENCION TERRITORIAL",
                    "OBSERVACIONES",
                    "FECHA"
                ];
                $datos = $datos->map(function ($item) {
                    return [
                        'organizacionDesc' => $item->organizacionDesc,
                        // Agrega aquí otros campos que desees aplanar desde las relaciones.
                        // 'matricula' => $item->Matricula->matricula ?? "Sin Informacion",
                        'refTipoAsociacion' => $item->Cooperadora->RefTipoAsociacion[0]->tipoAsociacionDesc ?? "Sin Información",
                        'atencionSeguimiento' => $item->Cooperadora->AtencionSeguimiento ?? null,
                        // Continúa agregando campos según tus necesidades.
                        'CUE' => $item->cue,
                        'NOMBRE DE LA INSTITUCION' => $item->organizacionDesc,
                        'LOCALIDAD' => $item->localidad,
                        'DEPARTAMENTO' => $item->departamento,
                        'NIVEL' => $item->nivel,
                        'REGION' => $item->region,
                        'CALLE' => $item->calle,
                        'NUMERO' => $item->numero,
                        'BARRIO' => $item->barrio,
                        'EMAIL' => $item->email,
                        'TELEFONO' => $item->telefono,
                        'DENOMINACION DE LA COOPERADORA' => $item->Cooperadora->denominacion,
                        'CUIT' => $item->Cooperadora->cuit,
                        'TIPO DE ASOCIACION'  => $item->Cooperadora->RefTipoAsociacion[0]->tipoAsociacionDesc,
                        'ESTADO' => $item->Cooperadora->estado,
                        'LEGAJO' => $item->Cooperadora->legajo,
                        'MODALIDAD' => $item->Cooperadora->modalidad,
                        'CONVENIO CS ECONOMICAS' => $item->Cooperadora->convenioCsEconomicas,
                        'INSCRIPCION AFIP' => $item->Cooperadora->estadoAfip,
                        'INSCRIPCION RENTAS' => $item->Cooperadora->estadoRentas,
                        'INSCRIPCION RENACOPES' => $item->Cooperadora->inscripcionRenacopes,
                        'FECHA DE CREACIÓN' => $item->Cooperadora->fechaCreacion,
                        'TIPO DE COMISION' => $item->Cooperadora->comision[0]->RefTipoComision[0]->tipoComisionDesc,
                        'INICIO DE PERIODO' => $item->Cooperadora->comision[0]->periodoInicio,
                        'FIN DE PERIODO' => $item->Cooperadora->comision[0]->periodoFin,
                        'CANT DE SOCIOS' => $item->Cooperadora->comision[0]->nroSocios,
                        'ESTADO' => $item->Cooperadora->comision[0]->estadoResolucion,
                        'CARGO DE AUTORIDAD' => $item->Cooperadora->comision[0],
                        'CUIL',
                        'APELLIDO',
                        'NOMBRES',
                        'TELEFONO',
                        'EMAIL',
                        'INICIO DE CARGO',
                        'FIN DE CARGO',
                        'NUMERO DE EXPEDIENTE',
                        'CANT DE OBSERVACIONES',
                        'DESCRIPCION DE OBSERVACIONES',
                        'OBSERVACIONES RESPONDIDAS',
                        'INSTANCIA DE INSTRUMENTO',
                        'RESOLUCION',
                        'DECRETO',
                        'FECHA DE OBTENCION',
                        'AÑO DE BALANCE',
                        'BALANCE RENDIDO',
                        'OBSERVACION DE BALANCE',
                        'FECHA DE RENDICION',
                        'TIPO DE FONDO',
                        'MONTO',
                        'INSCRIPTA',
                        'VERIFICADA',
                        'FONDO RECIBIDO',
                        'FECHA DE RECIBIDO',
                        'FONDO RENDIDO',
                        'FECHA DE RENDICION',
                        'AÑO OTORGADO',
                        'ACCESO CON LICITACION DE KIOSCO',
                        'DOCUMENTACION PRESENTADA',
                        'INICIO DE PERIODO',
                        'FIN DE PERIODO',
                        'CUIL',
                        'APELLIDO',
                        'NOMBRE',
                        'LLAMADAS REALIZADAS',
                        'MENSAJES ENVIADOS',
                        'EMAIL ENVIADOS',
                        'ATENCION EN OFICINA',
                        'ATENCION TERRITORIAL',
                        'OBSERVACIONES',
                        'FECHA'
                    ];
                });

                $datos = collect(array_merge([$titulos],[$datos->toArray()]));
                dd($datos);
                
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