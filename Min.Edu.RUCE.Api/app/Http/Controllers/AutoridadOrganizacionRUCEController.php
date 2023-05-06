<?php

namespace App\Http\Controllers;

use App\Http\Resources\RequestCollection;

use App\Http\Requests\StoreAutoridadOrganizacionRUCERequest;
use App\Http\Requests\UpdateAutoridadOrganizacionRUCERequest;
use App\Http\Resources\AutoridadOrganizacionRUCEResourse;
use App\Models\AutoridadOrganizacionRUCE;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AutoridadOrganizacionRUCEController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // return typeOf($request->page);
        try {
            if ($request->has('page')) {
                return new RequestCollection(AutoridadOrganizacionRUCE::orderBy('fkIdPersonaRUCE')->paginate());
            }

            return new RequestCollection(AutoridadOrganizacionRUCE::orderBy('fkIdPersonaRUCE')->get());
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
    public function store(StoreAutoridadOrganizacionRUCERequest $request)
    {
        try {
            AutoridadOrganizacionRUCE::create([
                'fkIdRefCargo' => $request->fkIdRefCargo,
                'fkIdPersonaRUCE' => $request->fkIdPersonaRUCE,
                'fkIdOrganizacionRUCE' => $request->fkIdOrganizacionRUCE,
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
     * @param  \App\Models\AutoridadOrganizacionRUCE  $autoridadOrganizacionRUCE
     * @return \Illuminate\Http\Response
     */
    public function show(AutoridadOrganizacionRUCE $autoridadOrganizacionRUCE)
    {
        try {
            return response()->json(new AutoridadOrganizacionRUCEResourse($autoridadOrganizacionRUCE));
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
    public function update(UpdateAutoridadOrganizacionRUCERequest $request, AutoridadOrganizacionRUCE $autoridadOrganizacionRUCE)
    {
        try {
            $autoridadOrganizacionRUCE->fkIdRefCargo = $request->fkIdRefCargo ?: $autoridadOrganizacionRUCE->fkIdRefCargo;
            $autoridadOrganizacionRUCE->fkIdPersonaRUCE = $request->fkIdPersonaRuce ?: $autoridadOrganizacionRUCE->fkIdRefCargo;
            $autoridadOrganizacionRUCE->fkIdOrganizacionRUCE = $request->fkIdOrganizacionRUCE ?: $autoridadOrganizacionRUCE->fkIdOrganizacionRUCE;
            $autoridadOrganizacionRUCE->inicioCargo = $request->inicioCargo ?: $autoridadOrganizacionRUCE->inicioCargo;
            $autoridadOrganizacionRUCE->finCargo = $request->finCargo ?: $autoridadOrganizacionRUCE->finCargo;
            $autoridadOrganizacionRUCE->estaActivo = $request->estaActivo ?: $autoridadOrganizacionRUCE->estaActivo;
            $autoridadOrganizacionRUCE->idUsuarioModificacion = $request->idUsuarioModificacion ?: $autoridadOrganizacionRUCE->idUsuarioModificacion;

            if ($autoridadOrganizacionRUCE->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }

            $autoridadOrganizacionRUCE->save();

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
     * @param  \App\Models\AutoridadOrganizacionRUCE  $autoridadOrganizacionRUCE
     * @return \Illuminate\Http\Response
     */
    public function destroy(AutoridadOrganizacionRUCE $autoridadOrganizacionRUCE)
    {
        try {


            $autoridadOrganizacionRUCE->delete();

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
