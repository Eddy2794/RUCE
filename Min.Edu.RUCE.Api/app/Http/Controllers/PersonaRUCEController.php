<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonaRUCERequest;
use App\Http\Requests\UpdatePersonaRUCERequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use App\Models\PersonaRUCE;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class PersonaRUCEController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(PersonaRUCE::orderBy('apellido','asc')->get(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            // dd(PersonaRUCE::latest()->first()->toArray());
            return new RequestCollection(PersonaRUCE::orderBy('apellido','asc')->get(),10, 1);
            // return  response()->json(new ModelResourse(PersonaRUCE::latest()->first()->toArray(),'PersonaRUCE'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StorePersonaRUCERequest $request): JsonResponse
    {
        //$request = new StorePersonaRUCERequest($request->toArray());
        try {
            $persona = PersonaRUCE::create([
                'fkRefTipoDocumentoRUCE' => $request->fkRefTipoDocumentoRUCE,
                'documento' => $request->documento,
                'cuil' => $request->cuil,
                'nombre' => $request->nombre,
                'apellido' => $request->apellido,
                'telefono' => $request->telefono,
                'email' => $request->email,
                'idUsuarioAlta' => Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id,
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
            $url = explode('/', url()->current());
            if($url[sizeof($url)-2]=="persona")
                return $this->getByDNI($personaRUCE);
            return response()->json(new ModelResourse($personaRUCE,'PersonaRUCE'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    private function getByDNI(int $dni):JsonResponse
    {
        try {
            return response()->json(new ModelResourse(PersonaRUCE::where('documento',$dni)->get()->toArray(),'PersonaRUCE'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdatePersonaRUCERequest $request, int $personaRUCE): JsonResponse
    {
        try {
            $personaRUCE = PersonaRUCE::where('id', $personaRUCE)->first();
            $personaRUCE->fkRefTipoDocumentoRUCE = $request->fkRefTipoDocumentoRUCE ?: $personaRUCE->fkRefTipoDocumentoRUCE;
            $personaRUCE->documento = $request->documento ?: $personaRUCE->documento;
            $personaRUCE->cuil = $request->cuil ?: $personaRUCE->cuil;
            $personaRUCE->nombre = $request->nombre ?: $personaRUCE->nombre;
            $personaRUCE->apellido = $request->apellido ?: $personaRUCE->apellido;
            $personaRUCE->telefono = $request->telefono ?: $personaRUCE->telefono;
            $personaRUCE->email = $request->email == null ? $request->email : $personaRUCE->email;
            
            if ($personaRUCE->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $personaRUCE->idUsuarioModificacion = Auth::user()->id;
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

    public function delete(int $id): JsonResponse {
        try {
            PersonaRUCE::where("id",$id)->forceDelete();
            return response()->json([
                'succeeded' => true,
                'message' => ''
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
            PersonaRUCE::where('id', $id)->update(['estaActivo'=>false,'idUsuarioModificacion'=>Auth::user()->id]);
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
}
