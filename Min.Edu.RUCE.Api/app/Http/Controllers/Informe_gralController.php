<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;
use App\Models\Cooperadora;
use App\Models\Informe_gral;
use App\Models\OrganizacionRUCE;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class Informe_gralController extends Controller
{
    public function index(Request $request)
    {
        try {
            $filtros = $request['filtros'];
            // dd($filtros);
            $filtersArray = [];
            if (!empty($filtros)) {
                // dd(json_decode($request['filtros']));
                $jsonData = json_decode($filtros, true);
                if ($jsonData !== null) {
                    // A continuación, verifica que sea un array.
                    if (is_array($jsonData)) {
                        $filtersArray = $jsonData;
                    }
                }
                $datos = OrganizacionRUCE::with([
                    'AutoridadOrganizacionRUCE.PersonaRUCE.RefTipoDocumentoRUCE',
                    'AutoridadOrganizacionRUCE.RefCargo',
                    'Matricula', 
                    'Cooperadora.RefTipoAsociacion', 
                    'Cooperadora.AtencionSeguimiento', 
                    'Cooperadora.Comision.RefTipoComision', 
                    'Cooperadora.Comision.AutoridadComision.RefCargo',
                    'Cooperadora.Comision.AutoridadComision.PersonaRUCE.RefTipoDocumentoRUCE', 
                    'Cooperadora.Balance', 
                    'Cooperadora.Expediente.RefInstanciaInstrumento', 
                    'Cooperadora.Personeria', 
                    'Cooperadora.Fondo.RefTipoFondo', 
                    'Cooperadora.Kiosco.PersonaRuce'
                ])
                ->where(
                    function ($query) use (&$filtersArray) {
                        $query->where(function ($query) use (&$filtersArray) {
                            foreach ($filtersArray as $clave => $valor) {
                                if ($clave != 'matricula' && $clave != 'modalidad') {
                                    $query->where($clave, $valor);
                                    unset($filtersArray[$clave]);
                                }
                            }
                        });
                        if (array_key_exists('matricula', $filtersArray)) {
                            $query->whereHas('Matricula', function ($query) use (&$filtersArray) {
                                foreach ($filtersArray as $clave => $valor) {
                                    if ($clave == 'matricula') {
                                        $valores = explode(" ", $valor);
                                        $query->where('matricula', $valores[0], $valores[1]);
                                    }
                                }
                            });
                        };
                        if (array_key_exists('modalidad', $filtersArray)) {
                            $query->whereHas('Cooperadora', function ($query) use (&$filtersArray) {
                                foreach ($filtersArray as $clave => $valor) {
                                    if ($clave == 'modalidad') {
                                        $query->where('modalidad', $valor);
                                    }
                                }
                            });
                        }
                    }
                )
                ->orderBy('organizacionDesc', 'asc')
                ->get();
                // dd($datos->toArray());
            } else {
                $datos = OrganizacionRUCE::with([
                    'AutoridadOrganizacionRUCE.PersonaRUCE.RefTipoDocumentoRUCE',
                    'AutoridadOrganizacionRUCE.RefCargo',
                    'Matricula', 
                    'Cooperadora.RefTipoAsociacion', 
                    'Cooperadora.AtencionSeguimiento', 
                    'Cooperadora.Comision.RefTipoComision', 
                    'Cooperadora.Comision.AutoridadComision.RefCargo',
                    'Cooperadora.Comision.AutoridadComision.PersonaRUCE.RefTipoDocumentoRUCE', 
                    'Cooperadora.Balance', 
                    'Cooperadora.Expediente.RefInstanciaInstrumento', 
                    'Cooperadora.Personeria', 
                    'Cooperadora.Fondo.RefTipoFondo', 
                    'Cooperadora.Kiosco.PersonaRuce'
                ])->orderBy('OrganizacionRUCE.organizacionDesc', 'asc')->get();
            // dd($datos->toArray());
            }

            $url = explode('/', url()->current());
            // dd(end($url));
            if (end($url)=='export'){
                $exportController = new ExportController();
                return $exportController->export($datos);
            }
            else {
                if(end($url)=='Filter') {
                    if ($request->has('PageNumber') && $request->has('PageSize')) {
                        return new RequestCollection($datos, $request['PageSize'], $request['PageNumber'], $request['descContains']);
                    }
                    return new RequestCollection($datos, 10, 1);
                }
                return response()->json([
                    'succeeded' => false,
                    'message' => "Error"
                ], Response::HTTP_NOT_ACCEPTABLE);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function storeConstancia(int $id): JsonResponse
    {
        try {
            $datos = Cooperadora::with([
                'OrganizacionRUCE',
                'RefTipoAsociacion',
                'Expediente',
                'Personeria',
                'Comision.RefTipoComision',
                'Comision.AutoridadComision.PersonaRUCE',
                'Comision.AutoridadComision.RefCargo',
                'Informe_gral'
            ])->where("id", $id)->get()->toArray()[0];
            // dd($datos);
            if($datos['informe_gral']){
                $this->destroy($datos['informe_gral']['id']);
            }
            if($datos['comision'][0]['ref_tipo_comision'][0]['tipoComisionDesc']=='DIRECTIVA' && $datos['comision'][0]['estadoResolucion']=='VIGENTE'){
                $comprobante = new Informe_gral();
                $comprobante['fkCooperadora'] = $id;
                $comprobante['datos']=$datos[0];
                $comprobante['esReporte']=false; // eliminar
                // dd($comprobante->toArray());
                $comprobante->save();

                return response()->json([
                    'succeeded' => true,
                    'message' => 'Comprobante creado correctamente',
                    'id' => $comprobante->toArray()['id']
                ]);
            } else {
                return response()->json([
                    'succeeded' => false,
                    'message' => "No cuenta con Comision DIRECTIVA o Resolucion VIGENTE."
                ], Response::HTTP_NOT_ACCEPTABLE);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $idInforme_gral): JsonResponse
    {
        try {
            $constancia = Informe_gral::where('id',$idInforme_gral)->get('datos')->toArray();
            return response()->json(['datos'=>$constancia]);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(array $datos): JsonResponse
    {
        try {
            Informe_gral::create([
                "datos" => $datos
            ]);
            return response()->json([
                'message' => 'Reporte registrado con Exito',
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
            $informe_gral->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Comprobante eliminado con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
