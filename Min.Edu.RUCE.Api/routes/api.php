<?php

use App\Http\Controllers\AsociacionCivilController;
use App\Http\Controllers\AutoridadesCooperadoraController;
use App\Http\Controllers\ConExpedienteController;
use App\Http\Controllers\PersonaController;
use App\Http\Controllers\AutoridadesEstablecimientoEducativoController;
use App\Http\Controllers\BalancesController;
use App\Http\Controllers\CooperadoraController;
use App\Http\Controllers\EstablecimientoEducativoController;
use App\Http\Controllers\FondosCooperarController;
use App\Http\Controllers\KioscoController;
use App\Http\Controllers\PersoneriaJuridicaController;
use App\Http\Controllers\SeguimientoAtencionController;
use App\Http\Controllers\SimpleAsociacionController;
use App\Http\Controllers\TipoAsociacionController;
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

Route::apiResource('asociacion_civil',AsociacionCivilController::class);
Route::apiResource('autoridades_cooperadora',AutoridadesCooperadoraController::class);
Route::apiResource('autoridades_est_edu', AutoridadesEstablecimientoEducativoController::class);
Route::apiResource('balances',BalancesController::class);
Route::apiResource('con_expediente',ConExpedienteController::class);
Route::apiResource('cooperadora',CooperadoraController::class);
Route::apiResource('establecimiento_educativo',EstablecimientoEducativoController::class);
Route::apiResource('fondos_cooperar',FondosCooperarController::class);
Route::apiResource('kiosco',KioscoController::class);
Route::apiResource('personas', PersonaController::class);
Route::apiResource('personeria_juridica',PersoneriaJuridicaController::class);
Route::apiResource('seguimiento_atencion',SeguimientoAtencionController::class);
Route::apiResource('simple_asociacion',SimpleAsociacionController::class);
Route::apiResource('tipo_asociacion',TipoAsociacionController::class);