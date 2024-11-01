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
                    return new RequestCollection(OrganizacionRUCE::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(OrganizacionRUCE::all(),10, 1);
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

    public function update(UpdateOrganizacionRUCERequest $request, int $organizacionRUCE): JsonResponse
    {
        try {
            $organizacionRUCE = OrganizacionRUCE::where('id', $organizacionRUCE)->first();
            //$request = new UpdateOrganizacionRUCERequest($request->toArray());
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

    /*public function search(Request $request, $model){
        $query = $model::query();
        if($request->has('descContains')){
            $query->where('organizacionDesc', 'LIKE', '%'.$request->descContains.'%')
            ->orWhere('cue', 'LIKE', '%'.$request->descContains.'%');
        }
        return $query->paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']);
    }*/

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

/* public function storeUser(UserStoreRequest $request)
{
    // Llama al método storePersona del controlador de personas para almacenar los datos de persona
    $person = $personController->storePersona($request);

    // Crea un nuevo usuario relacionado con la persona
    $user = User::create([
        'name' => $request->input('name'),
        'email' => $request->input('email'),
        'password' => bcrypt($request->input('password')),
        'person_id' => $person->id,
    ]);

    // Redirecciona a alguna ruta después de guardar el usuario y persona
    return redirect()->route('users.index')->with('success', 'Usuario y persona creados exitosamente.');
} */