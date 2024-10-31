<?php

namespace App\Http\Controllers;

use App\Models\RefTipoDocumentoRUCE;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRefTipoDocumentoRUCERequest;
use App\Http\Requests\UpdateRefTipoDocumentoRUCERequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RefTipoDocumentoRUCEController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(RefTipoDocumentoRUCE::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(RefTipoDocumentoRUCE::all(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreRefTipoDocumentoRUCERequest $request): JsonResponse
    {
        //$request = new StoreRefTipoDocumentoRUCERequest($request->toArray());
        try {
            RefTipoDocumentoRUCE::create([
                'tipoDocumentoDesc' => $request->tipoDocumentoDesc,
                'idUsuarioAlta'=>Auth::user()->id,
                'idUsuarioModificacion' => Auth::user()->id
            ]);
            return response()->json([
                'message' => 'Tipo de Documento registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function show(int $refTipoDocumentoRUCE): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($refTipoDocumentoRUCE,'RefTipoDocumentoRUCE'));
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateRefTipoDocumentoRUCERequest $request, int $refTipoDocumentoRUCE): JsonResponse
    {
        try {
            $refTipoDocumentoRUCE = RefTipoDocumentoRUCE::where('id', $refTipoDocumentoRUCE)->first();
            $refTipoDocumentoRUCE->tipoDocumentoDesc = $request->tipoDocumentoDesc ?: $refTipoDocumentoRUCE->tipoDocumentoDesc;

            if ($refTipoDocumentoRUCE->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $refTipoDocumentoRUCE->idUsuarioModifiacion = Auth::user()->id;
            $refTipoDocumentoRUCE->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Tipo de Documento Modificada con exito',
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
            RefTipoDocumentoRUCE::where('id',$id)->update(['estaActivo'=>false,'idUsuarioModificacion'=>Auth::user()->id]);
            RefTipoDocumentoRUCE::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Tipo de Documento eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
