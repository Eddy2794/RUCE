<?php

namespace App\Http\Controllers;

use App\Models\Balance;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBalanceRequest;
use App\Http\Requests\UpdateBalanceRequest;
use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class BalanceController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber')&&$request->has('PageSize')) {
                return new RequestCollection(Balance::all(),$request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Balance::all(),10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }


    public function store(StoreBalanceRequest $request): JsonResponse
    {
        //$request = new StoreBalanceRequest($request->toArray());
        try {
            Balance::create([
                'organizacionDesc' => $request->organizacionDesc,
                'fkCooperadora' => $request->fkCooperadora,
                'estadoBalance' => $request->estadoBalance,
                'idUsuarioAlta' => $request->idUsuarioAlta
            ]);
            return response()->json([
                'message' => 'Balance registrada con Exito',
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
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function show(int $balance): JsonResponse 
    {
        try {
            return response()->json(new ModelResourse($balance,'Balance'));
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
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBalanceRequest $request, int $balance): JsonResponse
    {
        try {
            $balance = Balance::where('id', $balance)->first();
            //$request = new UpdateBalanceRequest($request->toArray());
            $balance->fkCooperadora = $request->fkCooperadora ?: $balance->fkCooperadora;
            $balance->estadoBalance = $request->estadoBalance ?: $balance->estadoBalance;

            if ($balance->isClean()) {
                return response()->json([
                    'message' => 'No se modifico ningun valor',
                    'succeeded' => false
                ], 422);
            }
            $balance->updated_at= Carbon::now();
            $balance->save();

            return response()->json([
                'succeeded' => true,
                'message' => 'Balance Modificada con exito',
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
     * @param  \App\Models\Balance  $balance
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            Balance::where('id', $id)->update(['estaActivo'=>false,]);
            Balance::where('id', $id)->delete();
            return response()->json([
                'succeeded' => true,
                'message' => 'Balance eliminado con exito'
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function search(Request $request, Balance $balance)
    {
        /*
        Seguramente se puede refactorizar y optimizar
        por ahora es la forma que da resultados esperados
        */

        $query = $balance->newQuery();

        if ($request->id) {
            $query->where('id', $request->id)
                ->where(function ($q) use ($request) {
                    if ($request->q) {
                        $q->where('fkCooperadora', 'like', '%' . $request->q . '%')
                            ->orWhere('denominacion', 'like', '%' . $request->q . '%');
                    }
                });
        } else {
            if ($request->q) {
                $query->where('fkCooperadora', 'like', '%' . $request->q . '%')
                    ->orWhere('denominacion', 'like', '%' . $request->q . '%');
            }
        }

        // return new RequestCollection($query->orderBy('organizacionDesc')->paginate()->appends(['q' => $request->q, 'id' => $request->id]));
    }
}
