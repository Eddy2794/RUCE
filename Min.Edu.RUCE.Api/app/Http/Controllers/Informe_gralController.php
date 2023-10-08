<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;
use App\Models\Cooperadora;
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
            $datos = Cooperadora::with(['OrganizacionRUCE.Matricula','RefTipoAsociacion','AtencionSeguimiento','Comision.RefTipoComision','Comision.AutoridadComision','Balance','Expediente.RefInstanciaInstrumento','Personeria','Fondo.RefTipoFondo','Kiosco.PersonaRuce'])
                ->whereHas('OrganizacionRUCE', function ($query) use (&$filtersArray) {
                    $query->where(function ($query) use (&$filtersArray) {
                        foreach ($filtersArray as $clave => $valor) {
                            if ($clave != 'matricula') {
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
                    }
                })->get();
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
