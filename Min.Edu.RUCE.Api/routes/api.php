<?php

use App\Http\Controllers\PersonaController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\KioscoController;
use App\Http\Controllers\OrganizacionRUCEController;
use App\Http\Controllers\AutoridadOrganizacionRUCEController;
use App\Http\Controllers\CooperadoraController;
use App\Http\Controllers\SeguimientoAtencionController;
use App\Http\Controllers\AutoridadesCooperadoraController;
use App\Http\Controllers\FondosCooperarController;
use App\Http\Controllers\TipoAsociacionController;
use App\Http\Controllers\HistorialCooperadoraController;
use App\Http\Controllers\ExpedienteController;
use App\Http\Controllers\PersoneriaController;
use App\Models\AutoridadOrganizacionRUCE;
use App\Models\OrganizacionRUCE;
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

// Route::group(['prefix' => '/establecimientos_educativos'],function () {
//     Route::get('/', [EstablecimientoEducativoController::class, 'index'])->name('establecimientos_educativos.index');
//     Route::post('/', [EstablecimientoEducativoController::class, 'store'])->name('establecimientos_educativos.store');
//     Route::get('/{id}', [EstablecimientoEducativoController::class, 'show'])->name('establecimientos_educativos.show');
//     Route::put('/{id}',[EstablecimientoEducativoController::class,'update'])->name('establecimientos_educativos.update');
// });

Route::get('/organizacion', [OrganizacionRUCEController::class, 'index']);
Route::apiResource('organizacion', OrganizacionRUCE::class);

Route::get('/personas/Filter', [PersonaController::class, 'filtro']);
Route::apiResource('personas', PersonaController::class);

Route::get('/usuarios/Filter', [UsuarioController::class, 'filtro']);
Route::apiResource('usuarios', UsuarioController::class);

Route::get('/kioscos/Filter', [KioscoController::class, 'filtro']);
Route::apiResource('kioscos', KioscoController::class);

Route::get('/autoridadOrganizacion', [AutoridadOrganizacionRUCEController::class, 'index']);
Route::apiResource('autoridadOrganizacion', AutoridadOrganizacionRUCEController::class);

Route::get('/cooperadoras/Filter', [CooperadoraController::class, 'filtro']);
Route::apiResource('cooperadoras', CooperadoraController::class);

Route::get('/atencion_seguimiento/Filter', [SeguimientoAtencionController::class, 'filtro']);
Route::apiResource('atencion_seguimiento', SeguimientoAtencionController::class);

Route::get('/autoridades_cooperadoras/Filter', [AutoridadesCooperadoraController::class, 'filtro']);
Route::apiResource('autoridades_cooperadoras', AutoridadesCooperadoraController::class);

Route::get('/fondos_cooperar/Filter', [FondosCooperarController::class, 'filtro']);
Route::apiResource('fondos_cooperar', FondosCooperarController::class);

Route::get('/tipo_asociacion/Filter', [TipoAsociacionController::class, 'filtro']);
Route::apiResource('tipo_asociacion', TipoAsociacionController::class);

Route::get('/expedientes/Filter', [ExpedienteController::class, 'filtro']);
Route::apiResource('expedientes', ExpedienteController::class);

Route::get('/personerias/Filter', [PersoneriaController::class, 'filtro']);
Route::apiResource('personerias', PersoneriaController::class);

Route::get('/historial_estados_coop/Filter', [HistorialCooperadoraController::class, 'filtro']);
Route::apiResource('historial_estados_coop', HistorialCooperadoraController::class);