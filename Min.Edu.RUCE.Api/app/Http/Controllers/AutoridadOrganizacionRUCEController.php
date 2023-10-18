<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;

use App\Http\Requests\StoreAutoridadOrganizacionRUCERequest;
use App\Http\Requests\UpdateAutoridadOrganizacionRUCERequest;
use App\Http\Resources\AutoridadOrganizacionRUCEResourse;
use App\Http\Resources\ModelResourse;
use App\Models\AutoridadOrganizacionRUCE;
use App\Models\PersonaRUCE;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\PersonaRUCEController;
use App\Http\Requests\StorePersonaRUCERequest;
use App\Http\Requests\UpdatePersonaRUCERequest;

class AutoridadOrganizacionRUCEController extends Controller
{
    public function index(Request $request)
    {
        // return typeOf($request->page);
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(AutoridadOrganizacionRUCE::with(["PersonaRUCE.RefTipoDocumentoRUCE","RefCargo"])->orderBy('fkRefCargo')->get(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(AutoridadOrganizacionRUCE::with(["PersonaRUCE.RefTipoDocumentoRUCE","RefCargo"])->orderBy('fkRefCargo')->get(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    // public function autoridades(Request $request)
    // {
    //     try{
    //         if ($request->has('PageNumber')&&$request->has('PageSize')) {
    //             $autoridades = AutoridadOrganizacionRUCE::with('refCargo','personaRuce')->where('fkOrganizacionRUCE', $request['idOrganizacion'])->paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']);
    //             // $autoridades = AutoridadOrganizacionRUCE::where('fkOrganizacionRUCE', $request['idOrganizacion'])->paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']);
    //             $datos = [];
    //             foreach ($autoridades->items() as $autoridad) {
    //                 $datos[] = $autoridad->toArray();
    //             }
    //             $resp['entities'] = $datos;
    //             $resp['message'] = "";
    //             $resp['succeded'] = true;
    //             $resp['paged'] = [
    //                 "entityCount"=> count($datos),
    //                 "pageSize"=> $request['PageSize'],
    //                 "pageNumber"=> $request['PageNumber']
    //             ];
    //             return $resp;
    //             // return AutoridadOrganizacionRUCE::where('fkOrganizacionRUCE',$idOrganizacion)->get();
    //         }
    //         return AutoridadOrganizacionRUCE::where('fkOrganizacionRUCE',$request['idOrganizacion'])->get();
    //     } catch(\Throwable $th){
    //         return response()->json([
    //             'succeeded' => false,
    //             'message' => $th->getMessage()
    //         ], Response::HTTP_NOT_FOUND);
    //     }
    // }

    public function store(StoreAutoridadOrganizacionRUCERequest $request): JsonResponse
    {
        $persona = new PersonaRUCEController();
        $requestPersona = app(StorePersonaRUCERequest::class);
        $created = json_decode($persona->store($requestPersona)->getContent());
        $idPersona = PersonaRUCE::max('id');
        if($created->succeeded){
            try {
                AutoridadOrganizacionRUCE::create([
                    'fkRefCargo' => $request->fkRefCargo,
                    'fkPersonaRUCE' => $idPersona,
                    'fkOrganizacionRUCE' => $request->fkOrganizacionRUCE,
                    'inicioCargo' => ($request->inicioCargo),
                    'finCargo' => ($request->finCargo),
                    'idUsuarioAlta'=>$request->idUsuarioAlta,
                    'idUsuarioModificacion' => $request->idUsuarioModificacion
                ]);
                return response()->json([
                    'message' => 'Autoridad Organización registrado con Exito',
                    'succeeded' => true
                ], Response::HTTP_OK);
            } catch (\Throwable $th) {
                $persona->delete($idPersona);
                return response()->json([
                    'succeeded' => false,
                    'message' => $th->getMessage()
                ], Response::HTTP_BAD_REQUEST);
            }
        }
        return response()->json([
            'message' => $created->message,
            'succeeded' => $created->succeeded
        ], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AutoridadOrganizacionRUCE  $autoridadOrganizacionRUCE
     * @return \Illuminate\Http\Response
     */
    public function show(int $autoridadOrganizacionRUCE): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($autoridadOrganizacionRUCE,'AutoridadOrganizacionRUCE'));
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
     * @param  \App\Models\AutoridadOrganizacionRUCE  $autoridadOrganizacionRUCE
     * @return \Illuminate\Http\Response
     */
    public function update( int $id, UpdateAutoridadOrganizacionRUCERequest $request): JsonResponse
    {
        $persona = new PersonaRUCEController();
        $requestPersona = app(UpdatePersonaRUCERequest::class);
        $personaUpdated = response()->json($persona->update($requestPersona,$request->fkPersonaRUCE));
        if($personaUpdated->original->getStatusCode() != Response::HTTP_NOT_FOUND)
            {
            try {
                $autoridadOrganizacionRUCE = AutoridadOrganizacionRUCE::find($id);
                //$request = new UpdateAutoridadOrganizacionRUCERequest($request->toArray());
                $autoridadOrganizacionRUCE->fkRefCargo = $request->fkRefCargo ?: $autoridadOrganizacionRUCE->fkRefCargo;
                $autoridadOrganizacionRUCE->fkPersonaRUCE = $request->fkPersonaRUCE ?: $autoridadOrganizacionRUCE->fkPersonaRUCE;
                $autoridadOrganizacionRUCE->fkOrganizacionRUCE = $request->fkOrganizacionRUCE ?: $autoridadOrganizacionRUCE->fkOrganizacionRUCE;
                $autoridadOrganizacionRUCE->inicioCargo = $request->inicioCargo ?: $autoridadOrganizacionRUCE->inicioCargo;
                $autoridadOrganizacionRUCE->finCargo = $request->finCargo == null || $request->finCargo !== null ? $request->finCargo : $autoridadOrganizacionRUCE->finCargo;
                $autoridadOrganizacionRUCE->idUsuarioModificacion = $request->idUsuarioModificacion ?: $autoridadOrganizacionRUCE->idUsuarioModificacion;

                if ($autoridadOrganizacionRUCE->isClean() && $personaUpdated->original->getStatusCode()== Response::HTTP_UNPROCESSABLE_ENTITY) {
                    return response()->json([
                        'message' => 'No se modifico ningun valor.',
                        'succeeded' => false
                    ], Response::HTTP_UNPROCESSABLE_ENTITY);
                }
                $autoridadOrganizacionRUCE->save();

                return response()->json([
                    'succeeded' => true,
                    'message' => 'Autoridad Organización Modificado con exito',
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

            AutoridadOrganizacionRUCE::where('id', $id)->update(['estaActivo'=>false,]);
            AutoridadOrganizacionRUCE::where('id', $id)->delete();

            return response()->json([
                'succeeded' => true,
                'message' => 'Autoridad Organización eliminado con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

        public function search(Request $request, AutoridadOrganizacionRUCE $organizacionRUCE)
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
                        $q->where('fkOrganizacionRUCE', 'like', '%' . $request->q . '%')
                            ->orWhere('organizacionDesc', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('fkOrganizacionRUCE', 'like', '%' . $request->q . '%')
                    ->orWhere('organizacionDesc', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('organizacionDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }

}
