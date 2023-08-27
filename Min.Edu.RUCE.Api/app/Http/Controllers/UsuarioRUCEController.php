<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonaRUCERequest;
use App\Http\Requests\StoreUsuarioRUCERequest;
use App\Http\Requests\UpdatePersonaRUCERequest;
use App\Http\Requests\UpdateUsuarioRUCERequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\PersonaRUCE;
use App\Models\UsuarioRUCE;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class UsuarioRUCEController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(UsuarioRUCE::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(UsuarioRUCE::all(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreUsuarioRUCERequest $request): JsonResponse
    {
        $persona = new PersonaRUCEController();
        $requestPersona = new StorePersonaRUCERequest($request->toArray());
        $created = json_decode($persona->store($requestPersona)->getContent());
        $idPersona = PersonaRUCE::max('id');
        if($created->succeeded){
            try {
                UsuarioRUCE::create([
                    'fkPersonaRUCE' => $idPersona,
                    'password' => $request->password,
                    'username' => $request->username,
                    'idUsuarioAlta' => $request->idUsuarioAlta,
                ]);
                return response()->json([
                    'message' => 'Usuario Registrado con Exito',
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

    public function show(int $usuarioRUCE): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($usuarioRUCE,'UsuarioRUCE'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateUsuarioRUCERequest $request, int $usuarioRUCE): JsonResponse
    {
        $persona = new PersonaRUCEController();
        $requestPersona = new UpdatePersonaRUCERequest($request->toArray());
        //dd($$persona->update($requestPersona,$request->fkPersonaRUCE)->toArray());
        $personaUpdated = response()->json($persona->update($requestPersona,$request->fkPersonaRUCE));
        if($personaUpdated->original->getStatusCode() != Response::HTTP_NOT_FOUND)
            {
            try {
                $usuarioRUCE = UsuarioRUCE::find($usuarioRUCE);
                //$request = new UpdateUsuarioRUCERequest($request->toArray());
                //$usuarioRUCE->fkPersonaRUCE = $request->fkPersonaRUCE ?: $usuarioRUCE->fkPersonaRUCE;
                $usuarioRUCE->password = $request->password ? $request->password: $usuarioRUCE->password;
                $usuarioRUCE->username = $request->username ? $request->username: $usuarioRUCE->username;
                // $usuarioRUCE->idUsuarioModificacion = $request->idUsuarioModificacion ?: $usuarioRUCE->idUsuarioModificacion;

                if ($usuarioRUCE->isClean() && $personaUpdated->original->getStatusCode()== Response::HTTP_UNPROCESSABLE_ENTITY) {
                    return response()->json([
                        'message' => 'No se modifico ningun valor',
                        'succeeded' => false
                    ], 422);
                }
                $usuarioRUCE->save();

                return response()->json([
                    'succeeded' => true,
                    'message' => 'Tipo de Asociacion Modificada con exito',
                ], Response::HTTP_OK);
            } catch (\Throwable $th) {
                return response()->json([
                    'succeeded' => false,
                    'message' => $th->getMessage()
                ], Response::HTTP_NOT_FOUND);
            }
        }
            return response()->json([
                'message' => $personaUpdated->original->content->message,
                'succeeded' => $personaUpdated->original->content->succeeded
            ], $personaUpdated->original->getStatusCode());
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            UsuarioRUCE::where('id', $id)->update(['estaActivo'=>false,]);
            UsuarioRUCE::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Tipo de Asociacion eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, UsuarioRUCE $usuarioRUCE)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $usuarioRUCE->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('password', 'like', '%' . $request->q . '%')
                            ->orWhere('tipoAsociacionDesc', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('password', 'like', '%' . $request->q . '%')
                    ->orWhere('tipoAsociacionDesc', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('tipoAsociacionDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
