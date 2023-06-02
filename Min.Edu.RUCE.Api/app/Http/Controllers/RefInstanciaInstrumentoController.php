<?php

namespace App\Http\Controllers;

use App\Models\RefInstanciaInstrumento;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRefInstanciaInstrumentoRequest;
use App\Http\Requests\UpdateRefInstanciaInstrumentoRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class RefInstanciaInstrumentoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(RefInstanciaInstrumento::paginate($request['PageSize'], ['*'], 'page', $request['PageNumber']));
            }
            return new RequestCollection(RefInstanciaInstrumento::paginate(10, ['*'], 'page', 1));
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
    public function store(Request $request): JsonResponse
    {
        $request = new StoreRefInstanciaInstrumentoRequest($request->toArray());
        try {
            RefInstanciaInstrumento::create([
                'instrumentoDesc' => $request->instrumentoDesc,
            ]);
            return response()->json([
                'message' => 'Instancia de Instrumento registrada con Exito',
                'succeeded' => true
            ], Response::HTTP_OK);
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
     * @return \Illuminate\Http\Response
     */
    public function show(int $refInstanciaInstrumento): JsonResponse
    {
        try {
            return response()->json(new ModelResourse($refInstanciaInstrumento,'RefInstanciaInstrumento'));
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
     * @param  \App\Models\RefInstanciaInstrumento  $refInstanciaInstrumento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $refInstanciaInstrumento): JsonResponse
    {
        try {
            $refInstanciaInstrumento = RefInstanciaInstrumento::where('id', $refInstanciaInstrumento)->first();
            $request = new UpdateRefInstanciaInstrumentoRequest($request->toArray());
            $refInstanciaInstrumento->instrumentoDesc = $request->instrumentoDesc ?: $refInstanciaInstrumento->instrumentoDesc;

            if ($refInstanciaInstrumento->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $refInstanciaInstrumento->updated_at= Carbon::now();
            $refInstanciaInstrumento->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Instancia de Instrumento Modificada con exito',
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
     * @param  \App\Models\RefInstanciaInstrumento  $refInstanciaInstrumento
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            RefInstanciaInstrumento::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Instancia de Instrumento eliminada con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, RefInstanciaInstrumento $refInstanciaInstrumento)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $refInstanciaInstrumento->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('cue', 'like', '%' . $request->q . '%')
                            ->orWhere('instrumentoDesc', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('cue', 'like', '%' . $request->q . '%')
                    ->orWhere('instrumentoDesc', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('instrumentoDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
