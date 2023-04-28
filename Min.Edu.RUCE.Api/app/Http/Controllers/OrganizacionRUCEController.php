<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;

use App\Http\Requests\StoreOrganizacionRUCERequest;
use App\Http\Requests\UpdateOrganizacionRUCERequest;
use App\Http\Resources\OrganizacionRUCEResourse;
use App\Models\OrganizacionRUCE;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class OrganizacionRUCEController extends Controller
{
    public function index(Request $request)
    {
        // return typeOf($request->page);
        try {
            if ($request->has('page')) {
                return new RequestCollection(OrganizacionRUCE::orderBy('organizacionDesc')->paginate());
            }

            return new RequestCollection(OrganizacionRUCE::orderBy('organizacionDesc')->get());
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreOrganizacionRUCERequest $request): JsonResponse
    {
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
            ]);
            return response()->json();
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show(OrganizacionRUCE $organizacionRUCE): JsonResponse
    {
        try {
            return response()->json(new OrganizacionRUCEResourse($organizacionRUCE));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\OrganizacionRUCE  $organizacionRUCE
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateOrganizacionRUCERequest $request, OrganizacionRUCE $organizacionRUCE): JsonResponse
    {
        try {
            $organizacionRUCE->idOrganizacionRUCE = $request->idOrganizacionRUCE ?: $organizacionRUCE->idOrganizacionRUCE;
            $organizacionRUCE->organizacionDesc = $request->organizacionDesc ?: $organizacionRUCE->organizacionDesc;
            $organizacionRUCE->cue = $request->cue ?: $organizacionRUCE->cue;
            $organizacionRUCE->telefono = $request->telefono ?: $organizacionRUCE->telefono;
            $organizacionRUCE->email = $request->email ?: $organizacionRUCE->email;
            $organizacionRUCE->domicilio = $request->domicilio ?: $organizacionRUCE->domicilio;
            $organizacionRUCE->region = $request->region ?: $organizacionRUCE->region;
            $organizacionRUCE->nivel = $request->nivel ?: $organizacionRUCE->nivel;
            $organizacionRUCE->estaActivo = $request->estaActivo ?: $organizacionRUCE->estaActivo;
            $organizacionRUCE->idUsuarioModificacion = $request->idUsuarioModificacion ?: $organizacionRUCE->idUsuarioModificacion;

            if ($organizacionRUCE->isClean()) {
                return response()->json([
                    'message' => 'Nose modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }

            $organizacionRUCE->update([
                'idOrganizacionRUCE' => $organizacionRUCE->idOrganizacionRUCE,
                'organizacionDesc' => $organizacionRUCE->organizacionDesc,
                'cue' => $organizacionRUCE->cue,
                'anexo' => $organizacionRUCE->anexo,
                'region' => $organizacionRUCE->region,
                'nivel' => $organizacionRUCE->nivel,
                'localidad' => $organizacionRUCE->localidad,
                'departamento' => $organizacionRUCE->departamento,
                'domicilio' => $organizacionRUCE->domicilio,
                'telefono' => $organizacionRUCE->telefono,
                'email' => $organizacionRUCE->email,
                'estaActivo' => $organizacionRUCE->estaActivo,
                'idUsuarioModificacion' => $organizacionRUCE->idUsuarioModificacion,
            ]);

            return response()->json([
                'succeeded' => true,
                'message' => 'Especialidad Modificada con exito',
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\OrganizacionRUCE  $organizacionRUCE
     * @return \Illuminate\Http\Response
     */
    public function destroy(OrganizacionRUCE $organizacionRUCE): JsonResponse
    {
        try {
            
            OrganizacionRUCE::where('id', $organizacionRUCE)->update([
                'estaActivo'=>false,   
            ]);

            $organizacionRUCE->competencias()->delete();
            $organizacionRUCE->delete();

            return response()->json([
                'succeeded' => true,
                'message' => 'Especialidad eliminada con exito'
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

        if ($request->idOrganizacionRUCE) {
            $query->where('idOrganizacionRUCE', $request->idOrganizacionRUCE)
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

        return new RequestCollection($query->orderBy('organizacionDesc')->paginate()->appends(['q' => $request->q, 'idOrganizacionRICE' => $request->idOrganizacionRUCE]));
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
