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
            if ($datos->toArray() != []) {
                $this->store($datos->toArray());
            }

            if ($request->has('PageNumber') && $request->has('PageSize')) {
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


    public function show(int $idCooperadora): JsonResponse
    {
        try {
            $datos = Cooperadora::with([
                'OrganizacionRUCE',
                'RefTipoAsociacion',
                'Expediente',
                'Personeria',
                'Comision.RefTipoComision',
                'Comision.AutoridadComision.PersonaRUCE',
                'Comision.AutoridadComision.RefCargo'
            ])->where("id", $idCooperadora)->get()->toArray();

            return response()->json();
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
