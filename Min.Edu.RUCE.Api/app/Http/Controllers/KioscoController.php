<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKioscoRequest;
use App\Http\Requests\StorePersonaRUCERequest;
use App\Http\Requests\UpdateKioscoRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\Kiosco;
use App\Models\PersonaRUCE;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class KioscoController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Kiosco::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Kiosco::all(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function store(StoreKioscoRequest $request): JsonResponse
    {
        $persona = new PersonaRUCEController();
        $requestPersona = new StorePersonaRUCERequest($request->toArray());
        $created = json_decode($persona->store($requestPersona)->getContent());
        $idPersona = PersonaRUCE::max('id');
        if($created->succeeded){
            try {
                Kiosco::create([
                    'fkCooperadora' => $request->fkCooperadora,
                    'fkPersonaRUCE' => $idPersona,
                    'accesoLicitacion' => $request->accesoLicitacion,
                    'documentacionPresentada' => $request->documentacionPresentada,
                    'periodoInicio' => date_create($request->periodoInicio),
                    'periodoFin' => date_create($request->periodoFin),
                    'idUsuarioAlta' => $request->idUsuarioAlta,
                    'idUsuarioModificacion' => $request->idUsuarioModificacion
                ]);
                return response()->json([
                    'message' => 'Kiosco registrado con Exito',
                    'succeeded' => true
                ], Response::HTTP_OK);
            } catch (\Throwable $th) {
                return response()->json([
                    'succeeded' => false,
                    'message' => $th->getMessage()
                ], Response::HTTP_NOT_FOUND);
            }
        }
        return response()->json([
            'message' => $created->message,
            'succeeded' => $created->succeeded
        ], Response::HTTP_BAD_REQUEST);
    }

    public function show(int $fk_cooperadora): JsonResponse
    {
        try {
            $kiosco = Kiosco::where('fkCooperadora', $fk_cooperadora)->first();
            if($kiosco){
                return response()->json(new ModelResourse($kiosco['id'],'Kiosco'));
            }
            else
                return response()->json([
                    'succeeded' => false,
                    'message' => 'Kiosco no Encontrado'
                ], Response::HTTP_NOT_FOUND);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateKioscoRequest $request, int $kiosco): JsonResponse
    {
        $persona = new PersonaRUCEController();
        $requestPersona = new \App\Http\Requests\UpdatePersonaRUCERequest($request->toArray());
        $personaUpdated = response()->json($persona->update($requestPersona,$request->fkPersonaRUCE));
        if($personaUpdated->original->getStatusCode() != Response::HTTP_NOT_FOUND)
            try {
                $kiosco = Kiosco::where('id', $kiosco)->first();
                //$request = new UpdateKioscoRequest($request->toArray());
                $kiosco->fkCooperadora = $request->fkCooperadora ?: $kiosco->fkCooperadora;
                $kiosco->fkPersonaRUCE = $request->fkPersonaRUCE ?: $kiosco->fkPersonaRUCE;
                $kiosco->accesoLicitacion = $request->accesoLicitacion!==null ? $request->accesoLicitacion : $kiosco->accesoLicitacion;
                $kiosco->documentacionPresentada = $request->documentacionPresentada!==null ? $request->documentacionPresentada : $kiosco->documentacionPresentada;
                $kiosco->periodoInicio = $request->periodoInicio ?: $kiosco->periodoInicio;
                $kiosco->periodoFin = $request->periodoFin ?: $kiosco->periodoFin;
                $kiosco->idUsuarioModificacion = $request->idUsuarioModificacion ?: $kiosco->idUsuarioModificacion;

                if ($kiosco->isClean() && $personaUpdated->original->getStatusCode()== Response::HTTP_UNPROCESSABLE_ENTITY) {
                    return response()->json([
                        'message' => 'No se modifico ningun valor',
                        'succeeded' => false
                    ], 422);
                }
                $kiosco->save();

                return response()->json([
                    'succeeded' => true,
                    'message' => 'Kiosco Modificado con exito',
                ], Response::HTTP_OK);
            } catch (\Throwable $th) {
                return response()->json([
                    'succeeded' => false,
                    'message' => $th->getMessage()
                ], Response::HTTP_NOT_FOUND);
            }
        return response()->json([
            'message' => $personaUpdated->original->content->message,
            'succeeded' => $personaUpdated->original->content->succeeded
        ], $personaUpdated->original->getStatusCode());
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            Kiosco::where('id', $id)->update(['estaActivo'=>false,]);
            Kiosco::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Kiosco eliminado con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
