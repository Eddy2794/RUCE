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
use App\Http\Controllers\HistorialCooperadoraController;
use App\Http\Controllers\ExpedienteController;
use App\Http\Controllers\PersoneriaController;
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


// Route::group(['prefix' => '/establecimientos_educativos/Filter'],function () {
//     Route::get('/', [EstablecimientoEducativoController::class, 'filtro'])->name('establecimientos_educativos.filter');
// });
Route::get('/establecimientos_educativos/Filter', [EstablecimientoEducativoController::class, 'filtro']);
Route::apiResource('establecimientos_educativos', EstablecimientoEducativoController::class);
// Route::group(['prefix' => '/establecimientos_educativos'],function () {
//     Route::get('/', [EstablecimientoEducativoController::class, 'index'])->name('establecimientos_educativos.index');
//     Route::post('/', [EstablecimientoEducativoController::class, 'store'])->name('establecimientos_educativos.store');
//     Route::get('/{id}', [EstablecimientoEducativoController::class, 'show'])->name('establecimientos_educativos.show');
//     Route::put('/{id}',[EstablecimientoEducativoController::class,'update'])->name('establecimientos_educativos.update');
// });

Route::apiResource('personas', PersonaController::class);
Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('kioscos',KioscoController::class);
Route::apiResource('autoridades_est_edu', AutoridadesEstablecimientoEducativoController::class);
Route::apiResource('cooperadoras',CooperadoraController::class);
Route::apiResource('atencion_seguimiento',SeguimientoAtencionController::class);
Route::apiResource('autoridades_cooperadoras',AutoridadesCooperadoraController::class);
Route::apiResource('fondos_cooperar',FondosCooperarController::class);
Route::apiResource('tipo_asociacion',TipoAsociacionController::class);
Route::apiResource('expedientes',ExpedienteController::class);
Route::apiResource('personerias',PersoneriaController::class);
Route::apiResource('historial_estados_coop',HistorialCooperadoraController::class);