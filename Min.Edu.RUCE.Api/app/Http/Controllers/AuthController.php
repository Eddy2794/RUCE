<?php

namespace App\Http\Controllers;

use App\Models\UsuarioRUCE;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            if (Auth::attempt(['username' => $request->username, 'password' => $request->password], false)) {
                $expires_at = Carbon::now();

                // if ($request->remember_me) {
                //     $expires_at = $expires_at->addWeek();
                // } else {
                //     $expires_at = $expires_at->addHour();
                // }
                /** @var \App\Models\UsuarioRUCE $usuario **/
                $usuario = Auth::user();
                // $tokenResult = $usuario->createToken('Personal Access Token', ['expires_at' => $expires_at]);
                // $token = $tokenResult->accessToken->token;
                return response([
                    'message' => 'Inicio de Sesión exitoso!',
                    'succeeded' => true,
                    'auth' => [
                        // 'access_token' => $token,
                        // 'token_type' => 'Bearer',
                        // 'expires_at' => $expires_at->toDateTimeString(),
                        'username' => $usuario->username,
                    ]
                ], Response::HTTP_OK);
            } else {
                return response()->json([
                    'message' => 'Usuario y/o Contraseña incorrecta',
                    'succeeded' => false,
                ], Response::HTTP_OK);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->token()->revoke();
            return response()->json([
                'succeeded' => true,
                'message' => "Logout"
            ], Response::HTTP_OK);
        } catch (\Throwable $th) {
            return response()->json([
                'succeeded' => false,
                'message' => $th->getMessage()
            ], Response::HTTP_NOT_ACCEPTABLE);
        }
    }

    public function unauthorized(): JsonResponse
    {
        return response()->json([
            "error" => "Unauthorized",
            "status" => 401
        ], Response::HTTP_UNAUTHORIZED);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
