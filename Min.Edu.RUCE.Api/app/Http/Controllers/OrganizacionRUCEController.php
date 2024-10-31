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
use Illuminate\Support\Facades\Auth;

class OrganizacionRUCEController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber') && $request->has('PageSize')) {
                if ($request->has('sinCoop') && $request['sinCoop'] == true) {
                    return new RequestCollection(
                        OrganizacionRUCE::whereDoesntHave('Cooperadora')->orderBy('organizacionDesc', 'asc')->get(),
                        $request['PageSize'],
                        $request['PageNumber'],
                        $request['descContains']
                    );
                } else
                    return new RequestCollection(OrganizacionRUCE::orderBy('organizacionDesc', 'asc')->get(), $request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(OrganizacionRUCE::orderBy('organizacionDesc', 'asc')->get(), 10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreOrganizacionRUCERequest $request): JsonResponse
    {

        $request = new StoreOrganizacionRUCERequest($request->toArray());
        try {
            OrganizacionRUCE::create([
                'organizacionDesc' => $request->organizacionDesc,
                'cueAnexo' => $request->cueAnexo,
                'region' => $request->region,
                'nivel' => $request->nivel,
                'localidad' => $request->localidad,
                'departamento' => $request->departamento,
                'telefono' => $request->telefono,
                'email' => $request->email,
                'calle' => $request->calle,
                'barrio' => $request->barrio,
                'numero' => $request->numero,
                'cp' => $request->cp,
                'idUsuarioAlta'=>Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id
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
            return response()->json(new ModelResourse($organizacionRUCE, 'OrganizacionRUCE'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateOrganizacionRUCERequest $request, int $organizacionRUCE): JsonResponse
    {
        try {
            $organizacionRUCE = OrganizacionRUCE::where('id', $organizacionRUCE)->first();
            $organizacionRUCE->organizacionDesc = $request->organizacionDesc ?: $organizacionRUCE->organizacionDesc;
            $organizacionRUCE->cueAnexo = $request->cueAnexo ?: $organizacionRUCE->cueAnexo;
            $organizacionRUCE->region = $request->region ?: $organizacionRUCE->region;
            $organizacionRUCE->nivel = $request->nivel ?: $organizacionRUCE->nivel;
            $organizacionRUCE->localidad = $request->localidad ?: $organizacionRUCE->localidad;
            $organizacionRUCE->departamento = $request->departamento ?: $organizacionRUCE->departamento;
            $organizacionRUCE->telefono = $request->telefono !== null || $request->telefono == null ? $request->telefono : $organizacionRUCE->telefono;
            $organizacionRUCE->email = $request->email !== null || $request->email == null ? $request->email : $organizacionRUCE->email;
            $organizacionRUCE->calle = $request->calle ?: $organizacionRUCE->calle;
            $organizacionRUCE->numero = $request->numero !== null || $request->numero == null ? $request->numero : $organizacionRUCE->numero;
            $organizacionRUCE->barrio = $request->barrio ?: $organizacionRUCE->barrio;
            $organizacionRUCE->cp = $request->cp !== null || $request->cp == null ? $request->cp : $organizacionRUCE->cp;
            
            if ($organizacionRUCE->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $organizacionRUCE->idUsuarioModificacion = Auth::user()->id;
            // $organizacionRUCE->updated_at = Carbon::now();
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
            OrganizacionRUCE::where('id', $id)->update(['estaActivo' => false, 'idUsuarioModificacion' => Auth::user()->id]);
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
}
