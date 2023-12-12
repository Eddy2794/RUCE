<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;
use App\Models\Cooperadora;
use App\Models\Informe_gral;
use App\Models\OrganizacionRUCE;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

use function PHPUnit\Framework\throwException;

class Informe_gralController extends Controller
{
    public function index(Request $request)
    {
        try {
            $filtros = $request['filtros'];
            $filtersArray = [];
            if (!empty($filtros)) {
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
            }

            $url = explode('/', url()->current());

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

            if($datos['informe_gral']){
                $this->destroy($datos['informe_gral']['id']);
                unset($datos['informe_gral']);
            }

            if($datos['comision']==[])
                throw new \Exception("No existe Comision Directiva");

            if($datos['comision'][0]['ref_tipo_comision'][0]['tipoComisionDesc']=='DIRECTIVA' && $datos['comision'][0]['estadoResolucion']=='VIGENTE'){
                $comprobante = new Informe_gral();
                $comprobante['fkCooperadora'] = $id;
                $comprobante['datos']=$datos;
                $comprobante['esReporte']=false; // eliminar
                $comprobante['idUsuarioAlta']= Auth::user()->id;
                $comprobante['idUsuarioModificacion']=Auth::user()->id;
                $comprobante->save();
                $datos['informe_gral'] = $comprobante->toArray();
                return response()->json([
                    'succeeded' => true,
                    'message' => 'Comprobante creado correctamente',
                    'comprobante' => $comprobante->toArray()
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

    public function show(int $id)
    {
        try {
            $url = explode('/', url()->current());
            if ($url[sizeof($url)-2]=='coop_constancia')
                return $this->showByIdCooperadora($id);
            else if ($url[sizeof($url)-2]=="constancia")
                return $this->showByIdConstancia($id);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function showByIdConstancia(int $idInforme_gral): JsonResponse
    {
        try {
            $constancia = Informe_gral::where('id',$idInforme_gral)->get('datos')->toArray();
            if (!empty($constancia))
                return response()->json(['datos'=>$constancia[0]['datos']]);
            throw new \Exception("No existe la Constancia");
            
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function showByIdCooperadora(int $idCooperadora): JsonResponse
    {
        try {
            // dd($idCooperadora);
            $constancia = Informe_gral::where('fkCooperadora',$idCooperadora)->get(['id','fkCooperadora','datos'])->toArray();
            if (!empty($constancia))
                return response()->json(['comprobante'=>$constancia[0]]);
            else
                return $this->storeConstancia($idCooperadora);
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
            dd($datos);
            Informe_gral::create([
                "datos" => $datos,
                'idUsuarioAlta'=>Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id
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

    public function destroy(int $id): JsonResponse
    {
        try {
            Informe_gral::where('id', $id)->update(['estaActivo' => false,'idUsuarioModificacion' => Auth::user()->id]);
            Informe_gral::where('id', $id)->delete();
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
