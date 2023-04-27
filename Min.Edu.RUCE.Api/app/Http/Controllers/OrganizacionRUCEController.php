<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrganizacionRUCERequest;
use App\Http\Requests\UpdateOrganizacionRUCERequest;
use App\Http\Resources\OrganizacionRUCECollection;
use App\Http\Resources\OrganizacionRUCEResourse;
use App\Models\OrganizacionRUCE;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OrganizacionRUCEController extends Controller
{
    public function index(Request $request)
    {
        // return typeOf($request->page);
        try {
            if ($request->has('page')) {
                return new OrganizacionRUCECollection(OrganizacionRUCE::orderBy('organizacionDesc')->paginate());
            }

            return new OrganizacionRUCECollection(OrganizacionRUCE::orderBy('organizacionDesc')->get());
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
    public function store(StoreOrganizacionRUCERequest $request)
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
    public function show(OrganizacionRUCE $organizacionRUCE)
    {
        try {
            return new OrganizacionRUCEResourse($organizacionRUCE);
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
    public function update(UpdateOrganizacionRUCERequest $request, OrganizacionRUCE $organizacionRUCE)
    {
        try {
            $organizacionRUCE->nivel_id = $request->nivelId ?: $organizacionRUCE->nivel_id;
            $organizacionRUCE->nombre = $request->nombre ?: $organizacionRUCE->nombre;
            $organizacionRUCE->nombre_abreviado = $request->nombreAbreviado ?: $organizacionRUCE->nombre_abreviado;
            $organizacionRUCE->orientacion_id = $request->orientacionId ?: $organizacionRUCE->orientacion_id;

            if ($organizacionRUCE->isClean()) {
                return response()->json([
                    'message' => 'Nose modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }

            $organizacionRUCE->save();

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
    public function destroy(OrganizacionRUCE $organizacionRUCE)
    {
        try {
            
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

        if ($request->nivelId) {
            $query->where('nivel_id', $request->nivelId)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('nombre', 'like', '%' . $request->q . '%')
                            ->orWhere('nombre_abreviado', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('nombre', 'like', '%' . $request->q . '%')
                    ->orWhere('nombre_abreviado', 'like', '%' . $request->q . '%');
            }
        }

        return new OrganizacionRUCECollection($query->orderBy('nombre')->paginate()->appends(['q' => $request->q, 'nivel' => $request->nivelId]));
    }

    public function competencias($id)
    {
        $especialidad = Especialidad::findOrFail($id);

        $competencia = new Competencia();

        $competencias = $competencia->where('especialidad_id', $id)->paginate();

        if ($competencias->isEmpty()) {
            return response()->json([
                'succeeded' => false,
                'message' => "No existen Competencias para la especialidad seleccionado",
            ]);
        }

        return new CompetenciaCollection($competencias);
    }
}
