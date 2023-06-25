<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonaRUCERequest;
use App\Http\Requests\UpdatePersonaRUCERequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\PersonaRUCE;
use ArrayObject;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class PersonaRUCEController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(PersonaRUCE::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            // dd(PersonaRUCE::latest()->first()->toArray());
            return  response()->json(new ModelResourse(PersonaRUCE::latest()->first()->toArray(),'PersonaRUCE'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(Request $request): JsonResponse
    {
        $request = new StorePersonaRUCERequest($request->toArray());
        try {
            PersonaRUCE::create([
                'fkRefTipoDocumentoRUCE' => $request->fkRefTipoDocumentoRUCE,
                'documento' => $request->documento,
                'cuil' => $request->cuil,
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'telefono' => $request->telefono,
                'email' => $request->email,
                'idUsuarioAlta' => $request->idUsuarioAlta,
            ]);
            return response()->json([
                'message' => 'Persona registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $personaRUCE): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($personaRUCE,'PersonaRUCE'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(Request $request, int $personaRUCE): JsonResponse
    {
        try {
            $personaRUCE = PersonaRUCE::where('id', $personaRUCE)->first();
            $request = new UpdatePersonaRUCERequest($request->toArray());
            $personaRUCE->fkRefTipoDocumentoRUCE = $request->fkRefTipoDocumentoRUCE ?: $personaRUCE->fkRefTipoDocumentoRUCE;
            $personaRUCE->documento = $request->documento ?: $personaRUCE->documento;
            $personaRUCE->cuil = $request->cuil ?: $personaRUCE->cuil;
            $personaRUCE->nombre = $request->nombre ?: $personaRUCE->nombre;
            $personaRUCE->apellido = $request->apellido ?: $personaRUCE->apellido;
            $personaRUCE->telefono = $request->telefono ?: $personaRUCE->telefono;
            $personaRUCE->email = $request->email ?: $personaRUCE->email;
            // $personaRUCE->idUsuarioModificacion = $request->idUsuarioModificacion ?: $personaRUCE->idUsuarioModificacion;

            if ($personaRUCE->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $personaRUCE->updated_at= Carbon::now();
            $personaRUCE->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Persona Modificada con exito',
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
            PersonaRUCE::where('id', $id)->update(['estaActivo'=>false,]);
            PersonaRUCE::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Persona eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, PersonaRUCE $personaRUCE)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $personaRUCE->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('documento', 'like', '%' . $request->q . '%')
                            ->orWhere('fkRefTipoDocumentoRUCE', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('documento', 'like', '%' . $request->q . '%')
                    ->orWhere('fkRefTipoDocumentoRUCE', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('fkRefTipoDocumentoRUCE')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
