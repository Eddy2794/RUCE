<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Http\Requests\StoreOrganizacionRUCERequest;
use App\Http\Requests\UpdateOrganizacionRUCERequest;
use App\Models\OrganizacionRUCE;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class OrganizacionRUCEController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(OrganizacionRUCE::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(OrganizacionRUCE::paginate(10, ['*'], 'page', 1));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(Request $request): JsonResponse
    {
        $request = new StoreOrganizacionRUCERequest($request->toArray());
        try {
            OrganizacionRUCE::create([
                'organizacionDesc' => $request->organizacionDesc,
                'cue' => $request->cue,
                'anexo' => $request->anexo,
                'region' => $request->region,
                'nivel' => $request->nivel,
                'localidad' => $request->localidad,
                'departamento' => $request->departamento,
                'telefono' => $request->telefono,
                'email' => $request->email,
                'domicilio' => $request->domicilio,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Organizacion registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $organizacionRUCE): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($organizacionRUCE,'OrganizacionRUCE'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(Request $request, int $organizacionRUCE): JsonResponse
    {
        try {
            $organizacionRUCE = OrganizacionRUCE::where('id', $organizacionRUCE)->first();
            $request = new UpdateOrganizacionRUCERequest($request->toArray());
            $organizacionRUCE->organizacionDesc = $request->organizacionDesc ?: $organizacionRUCE->organizacionDesc;
            $organizacionRUCE->cue = $request->cue ?: $organizacionRUCE->cue;
            $organizacionRUCE->anexo = $request->anexo ?: $organizacionRUCE->anexo;
            $organizacionRUCE->region = $request->region ?: $organizacionRUCE->region;
            $organizacionRUCE->nivel = $request->nivel ?: $organizacionRUCE->nivel;
            $organizacionRUCE->localidad = $request->localidad ?: $organizacionRUCE->localidad;
            $organizacionRUCE->departamento = $request->departamento ?: $organizacionRUCE->departamento;
            $organizacionRUCE->telefono = $request->telefono ?: $organizacionRUCE->telefono;
            $organizacionRUCE->email = $request->email ?: $organizacionRUCE->email;
            $organizacionRUCE->domicilio = $request->domicilio ?: $organizacionRUCE->domicilio;
            // $organizacionRUCE->idUsuarioModificacion = $request->idUsuarioModificacion ?: $organizacionRUCE->idUsuarioModificacion;

            if ($organizacionRUCE->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $organizacionRUCE->updated_at= Carbon::now();
            $organizacionRUCE->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Organizacion Modificada con exito',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            OrganizacionRUCE::where('id', $id)->update(['estaActivo'=>false,]);
            OrganizacionRUCE::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Organizacion eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, OrganizacionRUCE $organizacionRUCE)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $organizacionRUCE->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('cue', 'like', '%' . $request->q . '%')
                            ->orWhere('organizacionDesc', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('cue', 'like', '%' . $request->q . '%')
                    ->orWhere('organizacionDesc', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('organizacionDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }

    // public function competencias($id)
    // {
    //     $especialidad = Especialidad::findOrFail($id);

    //     $competencia = new Competencia();

    //     $competencias = $competencia->where('especialidad_id', $id)->paginate();

    //     if ($competencias->isEmpty()) {
    //         return response()->json([
    //             'succeeded' => false,
    //             'message' => "No existen Competencias para la especialidad seleccionado",
    //         ]);
    //     }

    //     return new CompetenciaCollection($competencias);
    // }
}
