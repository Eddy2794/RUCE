<?php

use App\Http\Controllers\PersonaController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\KioscoController;
use App\Http\Controllers\EstablecimientoEducativoController;
use App\Http\Controllers\AutoridadesEstablecimientoEducativoController;
use App\Http\Controllers\CooperadoraController;
use App\Http\Controllers\SeguimientoAtencionController;
use App\Http\Controllers\AutoridadesCooperadoraController;
use App\Http\Controllers\FondosCooperarController;
use App\Http\Controllers\TipoAsociacionController;
use App\Http\Controllers\CooperadoraTipoAsociacionController;
use App\Http\Controllers\ExpedienteController;
use App\Http\Controllers\PersoneriaController;
use App\Http\Controllers\HistorialEstadoCooperadoraController;
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
Route::apiResource('usuario', UsuarioController::class);
Route::apiResource('kiosco',KioscoController::class);
Route::apiResource('establecimiento_educativo',EstablecimientoEducativoController::class);
Route::apiResource('autoridades_est_edu', AutoridadesEstablecimientoEducativoController::class);
Route::apiResource('cooperadora',CooperadoraController::class);
Route::apiResource('seguimiento_atencion',SeguimientoAtencionController::class);
Route::apiResource('autoridades_cooperadora',AutoridadesCooperadoraController::class);
Route::apiResource('fondos_cooperar',FondosCooperarController::class);
Route::apiResource('tipo_asociacion',TipoAsociacionController::class);
Route::apiResource('coop_tipo_asociacion',CooperadoraTipoAsociacionController::class);
Route::apiResource('expedientes',ExpedienteController::class);
Route::apiResource('personerias',PersoneriaController::class);
Route::apiResource('historial_estado_coop',HistorialEstadoCooperadoraController::class);