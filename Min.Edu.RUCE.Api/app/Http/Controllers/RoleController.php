<?php

namespace App\Http\Controllers;

use App\Http\Resources\ModelResourse;
use App\Http\Resources\RequestCollection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        try {
            if ($request->has('PageNumber') && $request->has('PageSize')) {
                return new RequestCollection(Role::where("name","<>","super_admin")->get(), $request['PageSize'], $request['PageNumber'], json_decode($request['filtros']), $request['descContains']);
            }
            return new RequestCollection(Role::where("name","<>","super_admin")->get(), 10, 1);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
