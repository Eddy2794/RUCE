<?php

use App\Http\Controllers\PersonaController;
use App\Http\Controllers\AutoridadesEstablecimientoEducativoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('personas', PersonaController::class);
Route::apiResource('autoridades_establecimiento_educativo', AutoridadesEstablecimientoEducativoController::class);