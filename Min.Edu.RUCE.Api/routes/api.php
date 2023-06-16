<?php

use App\Http\Controllers\AtencionSeguimientoController;
use App\Http\Controllers\AutoridadComisionController;
use App\Http\Controllers\PersonaRUCEController;
use App\Http\Controllers\KioscoController;
use App\Http\Controllers\OrganizacionRUCEController;
use App\Http\Controllers\AutoridadOrganizacionRUCEController;
use App\Http\Controllers\CooperadoraController;
use App\Http\Controllers\BalanceController;
use App\Http\Controllers\ComisionController;
use App\Http\Controllers\ExpedienteController;
use App\Http\Controllers\FondoController;
use App\Http\Controllers\MatriculaController;
use App\Http\Controllers\MovimientoExpedienteController;
use App\Http\Controllers\PersoneriaController;
use App\Http\Controllers\RefCargoController;
use App\Http\Controllers\RefInstanciaInstrumentoController;
use App\Http\Controllers\RefTipoAsociacionController;
use App\Http\Controllers\RefTipoComisionController;
use App\Http\Controllers\RefTipoDocumentoRUCEController;
use App\Http\Controllers\RefTipoFondoController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\UsuarioRUCEController;
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

Route::group(['prefix' => '/organizacion'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::post('/', [OrganizacionRUCEController::class, 'store'])->name('organizacion.store');
    Route::get('/{id}', [OrganizacionRUCEController::class, 'show'])->name('organizacion.show');
    Route::delete('/{id}', [OrganizacionRUCEController::class, 'destroy'])->name('organizacion.destroy');
    Route::put('/{id}',[OrganizacionRUCEController::class,'update'])->name('organizacion.update');
});

Route::group(['prefix' => '/cooperadora'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [CooperadoraController::class, 'index'])->name('cooperadora.index');
    Route::post('/', [CooperadoraController::class, 'store'])->name('cooperadora.store');
    Route::get('/{id}', [CooperadoraController::class, 'show'])->name('cooperadora.show');
    Route::delete('/{id}', [CooperadoraController::class, 'destroy'])->name('cooperadora.destroy');
    Route::put('/{id}',[CooperadoraController::class,'update'])->name('cooperadora.update');
});

Route::group(['prefix' => '/atencion_seguimiento'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [AtencionSeguimientoController::class, 'index'])->name('atencion_seguimiento.index');
    Route::post('/', [AtencionSeguimientoController::class, 'store'])->name('atencion_seguimiento.store');
    Route::get('/{id}', [AtencionSeguimientoController::class, 'show'])->name('atencion_seguimiento.show');
    Route::delete('/{id}', [AtencionSeguimientoController::class, 'destroy'])->name('atencion_seguimiento.destroy');
    Route::put('/{id}',[AtencionSeguimientoController::class,'update'])->name('atencion_seguimiento.update');
});

Route::group(['prefix' => '/autoridad_comision'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [AutoridadComisionController::class, 'index'])->name('autoridad_comision.index');
    Route::post('/', [AutoridadComisionController::class, 'store'])->name('autoridad_comision.store');
    Route::get('/{id}', [AutoridadComisionController::class, 'show'])->name('autoridad_comision.show');
    Route::delete('/{id}', [AutoridadComisionController::class, 'destroy'])->name('autoridad_comision.destroy');
    Route::put('/{id}',[AutoridadComisionController::class,'update'])->name('autoridad_comision.update');
});

Route::group(['prefix' => '/autoridad_organizacion'],function () {
    Route::get('/', [AutoridadOrganizacionRUCEController::class, 'index'])->name('autoridad_organizacion.index');
    Route::get('/Filter', [AutoridadOrganizacionRUCEController::class, 'autoridades'])->name('autoridad_organizacion.autoridades');
    // Route::get('/autoridades/{idOrganizacion}', [AutoridadOrganizacionRUCEController::class, 'autoridades'])->name('autoridad_organizacion.autoridades');
    // Route::get('/Filter', [AutoridadOrganizacionRUCEController::class, 'index'])->name('autoridad_organizacion.index');
    Route::post('/', [AutoridadOrganizacionRUCEController::class, 'store'])->name('autoridad_organizacion.store');
    Route::get('/{id}', [AutoridadOrganizacionRUCEController::class, 'show'])->name('autoridad_organizacion.show');
    Route::delete('/{id}', [AutoridadOrganizacionRUCEController::class, 'destroy'])->name('autoridad_organizacion.destroy');
    Route::put('/{id}',[AutoridadOrganizacionRUCEController::class,'update'])->name('autoridad_organizacion.update');
});

Route::group(['prefix' => '/balance'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [BalanceController::class, 'index'])->name('balance.index');
    Route::post('/', [BalanceController::class, 'store'])->name('balance.store');
    Route::get('/{id}', [BalanceController::class, 'show'])->name('balance.show');
    Route::delete('/{id}', [BalanceController::class, 'destroy'])->name('balance.destroy');
    Route::put('/{id}',[BalanceController::class,'update'])->name('balance.update');
});

Route::group(['prefix' => '/comision'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [ComisionController::class, 'index'])->name('comision.index');
    Route::post('/', [ComisionController::class, 'store'])->name('comision.store');
    Route::get('/{id}', [ComisionController::class, 'show'])->name('comision.show');
    Route::delete('/{id}', [ComisionController::class, 'destroy'])->name('comision.destroy');
    Route::put('/{id}',[ComisionController::class,'update'])->name('comision.update');
});

Route::group(['prefix' => '/expediente'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [ExpedienteController::class, 'index'])->name('expediente.index');
    Route::post('/', [ExpedienteController::class, 'store'])->name('expediente.store');
    Route::get('/{id}', [ExpedienteController::class, 'show'])->name('expediente.show');
    Route::delete('/{id}', [ExpedienteController::class, 'destroy'])->name('expediente.destroy');
    Route::put('/{id}',[ExpedienteController::class,'update'])->name('expediente.update');
});

Route::group(['prefix' => '/fondo'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [FondoController::class, 'index'])->name('fondo.index');
    Route::post('/', [FondoController::class, 'store'])->name('fondo.store');
    Route::get('/{id}', [FondoController::class, 'show'])->name('fondo.show');
    Route::delete('/{id}', [FondoController::class, 'destroy'])->name('fondo.destroy');
    Route::put('/{id}',[FondoController::class,'update'])->name('fondo.update');
});

Route::group(['prefix' => '/kiosco'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [KioscoController::class, 'index'])->name('kiosco.index');
    Route::post('/', [KioscoController::class, 'store'])->name('kiosco.store');
    Route::get('/{id}', [KioscoController::class, 'show'])->name('kiosco.show');
    Route::delete('/{id}', [KioscoController::class, 'destroy'])->name('kiosco.destroy');
    Route::put('/{id}',[KioscoController::class,'update'])->name('kiosco.update');
});

Route::group(['prefix' => '/matricula'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [MatriculaController::class, 'index'])->name('matricula.index');
    Route::post('/', [MatriculaController::class, 'store'])->name('matricula.store');
    Route::get('/{id}', [MatriculaController::class, 'show'])->name('matricula.show');
    Route::delete('/{id}', [MatriculaController::class, 'destroy'])->name('matricula.destroy');
    Route::put('/{id}',[MatriculaController::class,'update'])->name('matricula.update');
});

Route::group(['prefix' => '/movimiento_expediente'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [MovimientoExpedienteController::class, 'index'])->name('movimiento_expediente.index');
    Route::post('/', [MovimientoExpedienteController::class, 'store'])->name('movimiento_expediente.store');
    Route::get('/{id}', [MovimientoExpedienteController::class, 'show'])->name('movimiento_expediente.show');
    Route::delete('/{id}', [MovimientoExpedienteController::class, 'destroy'])->name('movimiento_expediente.destroy');
    Route::put('/{id}',[MovimientoExpedienteController::class,'update'])->name('movimiento_expediente.update');
});

Route::group(['prefix' => '/persona_ruce'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [PersonaRUCEController::class, 'index'])->name('persona_ruce.index');
    Route::post('/', [PersonaRUCEController::class, 'store'])->name('persona_ruce.store');
    Route::get('/{id}', [PersonaRUCEController::class, 'show'])->name('persona_ruce.show');
    Route::delete('/{id}', [PersonaRUCEController::class, 'destroy'])->name('persona_ruce.destroy');
    Route::put('/{id}',[PersonaRUCEController::class,'update'])->name('persona_ruce.update');
});

Route::group(['prefix' => '/personeria'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [PersoneriaController::class, 'index'])->name('personeria.index');
    Route::post('/', [PersoneriaController::class, 'store'])->name('personeria.store');
    Route::get('/{id}', [PersoneriaController::class, 'show'])->name('personeria.show');
    Route::delete('/{id}', [PersoneriaController::class, 'destroy'])->name('personeria.destroy');
    Route::put('/{id}',[PersoneriaController::class,'update'])->name('personeria.update');
});

Route::group(['prefix' => '/cargo'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [RefCargoController::class, 'index'])->name('cargo.index');
    Route::post('/', [RefCargoController::class, 'store'])->name('cargo.store');
    Route::get('/{id}', [RefCargoController::class, 'show'])->name('cargo.show');
    Route::delete('/{id}', [RefCargoController::class, 'destroy'])->name('cargo.destroy');
    Route::put('/{id}',[RefCargoController::class,'update'])->name('cargo.update');
});

Route::group(['prefix' => '/instancia_instrumento'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [RefInstanciaInstrumentoController::class, 'index'])->name('instancia_instrumento.index');
    Route::post('/', [RefInstanciaInstrumentoController::class, 'store'])->name('instancia_instrumento.store');
    Route::get('/{id}', [RefInstanciaInstrumentoController::class, 'show'])->name('instancia_instrumento.show');
    Route::delete('/{id}', [RefInstanciaInstrumentoController::class, 'destroy'])->name('instancia_instrumento.destroy');
    Route::put('/{id}',[RefInstanciaInstrumentoController::class,'update'])->name('instancia_instrumento.update');
});

Route::group(['prefix' => '/tipo_asociacion'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [RefTipoAsociacionController::class, 'index'])->name('tipo_asociacion.index');
    Route::post('/', [RefTipoAsociacionController::class, 'store'])->name('tipo_asociacion.store');
    Route::get('/{id}', [RefTipoAsociacionController::class, 'show'])->name('tipo_asociacion.show');
    Route::delete('/{id}', [RefTipoAsociacionController::class, 'destroy'])->name('tipo_asociacion.destroy');
    Route::put('/{id}',[RefTipoAsociacionController::class,'update'])->name('tipo_asociacion.update');
});

Route::group(['prefix' => '/tipo_comision'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [RefTipoComisionController::class, 'index'])->name('tipo_comision.index');
    Route::post('/', [RefTipoComisionController::class, 'store'])->name('tipo_comision.store');
    Route::get('/{id}', [RefTipoComisionController::class, 'show'])->name('tipo_comision.show');
    Route::delete('/{id}', [RefTipoComisionController::class, 'destroy'])->name('tipo_comision.destroy');
    Route::put('/{id}',[RefTipoComisionController::class,'update'])->name('tipo_comision.update');
});

Route::group(['prefix' => '/tipo_documento'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [RefTipoDocumentoRUCEController::class, 'index'])->name('tipo_documento.index');
    Route::post('/', [RefTipoDocumentoRUCEController::class, 'store'])->name('tipo_documento.store');
    Route::get('/{id}', [RefTipoDocumentoRUCEController::class, 'show'])->name('tipo_documento.show');
    Route::delete('/{id}', [RefTipoDocumentoRUCEController::class, 'destroy'])->name('tipo_documento.destroy');
    Route::put('/{id}',[RefTipoDocumentoRUCEController::class,'update'])->name('tipo_documento.update');
});

Route::group(['prefix' => '/tipo_fondo'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [RefTipoFondoController::class, 'index'])->name('tipo_fondo.index');
    Route::post('/', [RefTipoFondoController::class, 'store'])->name('tipo_fondo.store');
    Route::get('/{id}', [RefTipoFondoController::class, 'show'])->name('tipo_fondo.show');
    Route::delete('/{id}', [RefTipoFondoController::class, 'destroy'])->name('tipo_fondo.destroy');
    Route::put('/{id}',[RefTipoFondoController::class,'update'])->name('tipo_fondo.update');
});

Route::group(['prefix' => '/usuario'],function () {
    // Route::get('/', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
    Route::get('/Filter', [UsuarioRUCEController::class, 'index'])->name('usuario.index');
    Route::post('/', [UsuarioRUCEController::class, 'store'])->name('usuario.store');
    Route::get('/{id}', [UsuarioRUCEController::class, 'show'])->name('usuario.show');
    Route::delete('/{id}', [UsuarioRUCEController::class, 'destroy'])->name('usuario.destroy');
    Route::put('/{id}',[UsuarioRUCEController::class,'update'])->name('usuario.update');
});

// Route::apiResource('organizacion',OrganizacionRUCEController::class);

// Route::get('/persona/Filter', [PersonaRUCEController::class, 'filtro']);
// Route::apiResource('persona', PersonaRUCEController::class);

// Route::get('/usuarios/Filter', [UsuarioRUCEController::class, 'filtro']);
// Route::apiResource('usuarios', UsuarioRUCEController::class);

// Route::get('/kioscos/Filter', [KioscoController::class, 'filtro']);
// Route::apiResource('kioscos', KioscoController::class);

// Route::get('/autoridadOrganizacion', [AutoridadOrganizacionRUCEController::class, 'index']);
// Route::apiResource('autoridadOrganizacion', AutoridadOrganizacionRUCEController::class);

// Route::get('/cooperadoras/Filter', [CooperadoraController::class, 'filtro']);
// Route::apiResource('cooperadoras', CooperadoraController::class);

// Route::get('/atencion_seguimiento/Filter', [SeguimientoAtencionController::class, 'filtro']);
// Route::apiResource('atencion_seguimiento', SeguimientoAtencionController::class);

// Route::get('/autoridades_cooperadoras/Filter', [AutoridadesCooperadoraController::class, 'filtro']);
// Route::apiResource('autoridades_cooperadoras', AutoridadesCooperadoraController::class);

// Route::get('/fondos_cooperar/Filter', [FondosCooperarController::class, 'filtro']);
// Route::apiResource('fondos_cooperar', FondosCooperarController::class);

// Route::get('/tipo_asociacion/Filter', [TipoAsociacionController::class, 'filtro']);
// Route::apiResource('tipo_asociacion', TipoAsociacionController::class);

// Route::get('/expedientes/Filter', [ExpedienteController::class, 'filtro']);
// Route::apiResource('expedientes', ExpedienteController::class);

// Route::get('/personerias/Filter', [PersoneriaController::class, 'filtro']);
// Route::apiResource('personerias', PersoneriaController::class);

// Route::get('/historial_estados_coop/Filter', [HistorialCooperadoraController::class, 'filtro']);
// Route::apiResource('historial_estados_coop', HistorialCooperadoraController::class);