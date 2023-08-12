<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePersonaRUCERequest;
use App\Http\Resources\RequestCollection;

use App\Http\Requests\StoreAutoridadComisionRequest;
use App\Http\Requests\UpdateAutoridadComisionRequest;
use App\Http\Resources\AutoridadComisionResourse;
use App\Http\Resources\ModelResourse;
use App\Models\AutoridadComision;
use App\Models\PersonaRUCE;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AutoridadComisionController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(AutoridadComision::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }

            return new RequestCollection(AutoridadComision::paginate(10, ['*'], 'page', 1));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreAutoridadComisionRequest $request)
    {
        $persona = new PersonaRUCEController();
        $requestPersona = new StorePersonaRUCERequest($request->toArray());
        $created = json_decode($persona->store($requestPersona)->getContent());
        $idPersona = PersonaRUCE::max('id');
        if($created->succeeded){
            try {
                AutoridadComision::create([
                    'fkPersonaRUCE' => $idPersona,
                    'fkRefCargo' => $request->fkRefCargo,
                    'fkComision' => $request->fkComision,
                    'inicioCargo' => date_create($request->inicioCargo),
                    'finCargo' => date_create($request->finCargo),
                    'idUsuarioAlta'=>$request->idUsuarioAlta,
                    'idUsuarioModificacion' => $request->idUsuarioModificacion
                ]);
                return response()->json([
                    'message' => 'Autoridad de Comision registrada con Exito',
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

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AutoridadComision  $autoridadComision
     * @return \Illuminate\Http\Response
     */
    public function show(int $autoridadComision)
    {
        try {
            return response()->json(new ModelResourse($autoridadComision,'AutoridadComision'));
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
     * @param  \App\Models\AutoridadComision  $autoridadComision
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAutoridadComisionRequest $request, int $autoridadComision)
    {
        try {
            $autoridadComision = AutoridadComision::where('id', $autoridadComision)->first();
            //$request = new UpdateAutoridadComisionRequest($request->toArray());
            $autoridadComision->fkPersonaRUCE = $request->fkPersonaRUCE ?: $autoridadComision->fkRefCargo;
            $autoridadComision->fkRefCargo = $request->fkRefCargo ?: $autoridadComision->fkRefCargo;
            $autoridadComision->fkComision = $request->fkComision ?: $autoridadComision->fkComision;
            $autoridadComision->inicioCargo = $request->inicioCargo ?: $autoridadComision->inicioCargo;
            $autoridadComision->finCargo = $request->finCargo ?: $autoridadComision->finCargo;
            $autoridadComision->estaActivo = $request->estaActivo ?: $autoridadComision->estaActivo;
            $autoridadComision->idUsuarioModificacion = $request->idUsuarioModificacion ?: $autoridadComision->idUsuarioModificacion;

            if ($autoridadComision->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $autoridadComision->updated_at= Carbon::now();
            $autoridadComision->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Autoridad Modificado con exito',
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
     * @param  \App\Models\AutoridadComision  $autoridadComision
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        try {

            AutoridadComision::where('id', $id)->update(['estaActivo'=>false,]);
            AutoridadComision::where('id', $id)->delete();

            return response()->json([
                'succeeded' => true,
                'message' => 'Autoridad eliminado con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, AutoridadComision $autoridadComision)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $autoridadComision->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('fkComision', 'like', '%' . $request->q . '%')
                            ->orWhere('fkCooperadora', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('fkComision', 'like', '%' . $request->q . '%')
                    ->orWhere('fkCooperadora', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('organizacionDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
