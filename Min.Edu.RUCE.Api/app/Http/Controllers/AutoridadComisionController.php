<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;

use App\Http\Requests\StoreAutoridadComisionRequest;
use App\Http\Requests\UpdateAutoridadComisionRequest;
use App\Http\Resources\AutoridadComisionResourse;
use App\Models\AutoridadComision;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AutoridadComisionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            if ($request->has('page')) {
                return new RequestCollection(AutoridadComision::orderBy('fkPersonaRUCE')->paginate());
            }

            return new RequestCollection(AutoridadComision::orderBy('fkPersonaRUCE')->get());
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
    public function store(Request $request)
    {
        try {
            AutoridadComision::create([
                'fkPersonaRUCE' => $request->fkPersonaRUCE,
                'fkRefCargo' => $request->fkRefCargo,
                'fkComision' => $request->fkComision,
                'inicioCargo' => $request->inicioCargo,
                'finCargo' => $request->finCargo,
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
     * @param  \App\Models\AutoridadComision  $autoridadComision
     * @return \Illuminate\Http\Response
     */
    public function show(AutoridadComision $autoridadComision)
    {
        try {
            return response()->json(new AutoridadComisionResourse($autoridadComision));
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
    public function update(UpdateAutoridadComisionRequest $request, AutoridadComision $autoridadComision)
    {
        try {
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
    public function destroy(AutoridadComision $autoridadComision)
    {
        try {


            $autoridadComision->delete();

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
}
