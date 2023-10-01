<?php

use App\Http\Controllers\AutoridadOrganizacionRUCEController;
use App\Http\Controllers\AutoridadComisionController;
use App\Http\Controllers\AtencionSeguimientoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PersonaRUCEController;
use App\Http\Controllers\KioscoController;
use App\Http\Controllers\OrganizacionRUCEController;
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
use App\Http\Controllers\UsuarioRUCEController;
use App\Http\Controllers\AuditController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Informe_gralController;
use App\Models\Informe_gral;
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

Route::middleware('auth:sanctum')->group(function () {
    Route::middleware('role:super_admin|admin|writer|user')->get('/audit/Filter', [AuditController::class, 'index'])->name('audit.getAudits');
    // Route::get('/audit/Filter', [AuditController::class, 'getAudits'])->name('audit.getAudits');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/organizacion'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [OrganizacionRUCEController::class, 'index'])->name('organizacion.index');
        Route::middleware('role:super_admin|admin')->post('/', [OrganizacionRUCEController::class, 'store'])->name('organizacion.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [OrganizacionRUCEController::class, 'show'])->name('organizacion.show');
        Route::middleware('role:super_admin')->delete('/{id}', [OrganizacionRUCEController::class, 'destroy'])->name('organizacion.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [OrganizacionRUCEController::class, 'update'])->name('organizacion.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/cooperadora'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [CooperadoraController::class, 'index'])->name('cooperadora.index');
        Route::middleware('role:super_admin|admin')->post('/', [CooperadoraController::class, 'store'])->name('cooperadora.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [CooperadoraController::class, 'show'])->name('cooperadora.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [CooperadoraController::class, 'destroy'])->name('cooperadora.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [CooperadoraController::class, 'update'])->name('cooperadora.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/atencion_seguimiento'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [AtencionSeguimientoController::class, 'index'])->name('atencion_seguimiento.index');
        Route::middleware('role:super_admin|admin|writer')->post('/', [AtencionSeguimientoController::class, 'store'])->name('atencion_seguimiento.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [AtencionSeguimientoController::class, 'show'])->name('atencion_seguimiento.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [AtencionSeguimientoController::class, 'destroy'])->name('atencion_seguimiento.destroy');
        Route::middleware('role:super_admin|admin|writer')->put('/{id}', [AtencionSeguimientoController::class, 'update'])->name('atencion_seguimiento.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/autoridad_comision'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [AutoridadComisionController::class, 'index'])->name('autoridad_comision.index');
        Route::middleware('role:super_admin|admin')->post('/', [AutoridadComisionController::class, 'store'])->name('autoridad_comision.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [AutoridadComisionController::class, 'show'])->name('autoridad_comision.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [AutoridadComisionController::class, 'destroy'])->name('autoridad_comision.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [AutoridadComisionController::class, 'update'])->name('autoridad_comision.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/autoridad_organizacion'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [AutoridadOrganizacionRUCEController::class, 'index'])->name('autoridad_organizacion.index');
        Route::middleware('role:super_admin|admin')->post('/', [AutoridadOrganizacionRUCEController::class, 'store'])->name('autoridad_organizacion.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [AutoridadOrganizacionRUCEController::class, 'show'])->name('autoridad_organizacion.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [AutoridadOrganizacionRUCEController::class, 'destroy'])->name('autoridad_organizacion.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [AutoridadOrganizacionRUCEController::class, 'update'])->name('autoridad_organizacion.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/balance', 'middleware' => ['role:super_admin']], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [BalanceController::class, 'index'])->name('balance.index');
        Route::middleware('role:super_admin|admin')->post('/', [BalanceController::class, 'store'])->name('balance.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [BalanceController::class, 'show'])->name('balance.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [BalanceController::class, 'destroy'])->name('balance.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [BalanceController::class, 'update'])->name('balance.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/comision'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [ComisionController::class, 'index'])->name('comision.index');
        Route::middleware('role:super_admin|admin')->post('/', [ComisionController::class, 'store'])->name('comision.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [ComisionController::class, 'show'])->name('comision.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [ComisionController::class, 'destroy'])->name('comision.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [ComisionController::class, 'update'])->name('comision.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/expediente'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [ExpedienteController::class, 'index'])->name('expediente.index');
        Route::middleware('role:super_admin|admin')->post('/', [ExpedienteController::class, 'store'])->name('expediente.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [ExpedienteController::class, 'show'])->name('expediente.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [ExpedienteController::class, 'destroy'])->name('expediente.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [ExpedienteController::class, 'update'])->name('expediente.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/movimiento_expediente'], function () {
        Route::middleware('role:super_admin|admin')->get('/Filter', [MovimientoExpedienteController::class, 'index'])->name('movimiento_expediente.index');
        // Route::middleware('role:super_admin|admin')->post('/', [MovimientoExpedienteController::class, 'store'])->name('movimiento_expediente.store');
        Route::middleware('role:super_admin|admin')->get('/{id}', [MovimientoExpedienteController::class, 'show'])->name('movimiento_expediente.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [MovimientoExpedienteController::class, 'destroy'])->name('movimiento_expediente.destroy');
        // Route::middleware('role:super_admin|admin')->put('/{id}',[MovimientoExpedienteController::class,'update'])->name('movimiento_expediente.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/fondo'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [FondoController::class, 'index'])->name('fondo.index');
        Route::middleware('role:super_admin|admin')->post('/', [FondoController::class, 'store'])->name('fondo.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [FondoController::class, 'show'])->name('fondo.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [FondoController::class, 'destroy'])->name('fondo.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [FondoController::class, 'update'])->name('fondo.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/kiosco'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [KioscoController::class, 'index'])->name('kiosco.index');
        Route::middleware('role:super_admin|admin')->post('/', [KioscoController::class, 'store'])->name('kiosco.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [KioscoController::class, 'show'])->name('kiosco.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [KioscoController::class, 'destroy'])->name('kiosco.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [KioscoController::class, 'update'])->name('kiosco.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/matricula'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [MatriculaController::class, 'index'])->name('matricula.index');
        Route::middleware('role:super_admin|admin')->post('/', [MatriculaController::class, 'store'])->name('matricula.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [MatriculaController::class, 'show'])->name('matricula.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [MatriculaController::class, 'destroy'])->name('matricula.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [MatriculaController::class, 'update'])->name('matricula.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/persona_ruce'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [PersonaRUCEController::class, 'index'])->name('persona_ruce.index');
        Route::middleware('role:super_admin|admin')->post('/', [PersonaRUCEController::class, 'store'])->name('persona_ruce.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [PersonaRUCEController::class, 'show'])->name('persona_ruce.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [PersonaRUCEController::class, 'destroy'])->name('persona_ruce.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [PersonaRUCEController::class, 'update'])->name('persona_ruce.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/personeria'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [PersoneriaController::class, 'index'])->name('personeria.index');
        Route::middleware('role:super_admin|admin')->post('/', [PersoneriaController::class, 'store'])->name('personeria.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [PersoneriaController::class, 'show'])->name('personeria.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [PersoneriaController::class, 'destroy'])->name('personeria.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [PersoneriaController::class, 'update'])->name('personeria.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/refcargo'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [RefCargoController::class, 'index'])->name('cargo.index');
        Route::middleware('role:super_admin|admin')->post('/', [RefCargoController::class, 'store'])->name('cargo.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [RefCargoController::class, 'show'])->name('cargo.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [RefCargoController::class, 'destroy'])->name('cargo.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [RefCargoController::class, 'update'])->name('cargo.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/instancia_instrumento'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [RefInstanciaInstrumentoController::class, 'index'])->name('instancia_instrumento.index');
        Route::middleware('role:super_admin|admin')->post('/', [RefInstanciaInstrumentoController::class, 'store'])->name('instancia_instrumento.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [RefInstanciaInstrumentoController::class, 'show'])->name('instancia_instrumento.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [RefInstanciaInstrumentoController::class, 'destroy'])->name('instancia_instrumento.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [RefInstanciaInstrumentoController::class, 'update'])->name('instancia_instrumento.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/tipo_asociacion'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [RefTipoAsociacionController::class, 'index'])->name('tipo_asociacion.index');
        Route::middleware('role:super_admin|admin')->post('/', [RefTipoAsociacionController::class, 'store'])->name('tipo_asociacion.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [RefTipoAsociacionController::class, 'show'])->name('tipo_asociacion.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [RefTipoAsociacionController::class, 'destroy'])->name('tipo_asociacion.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [RefTipoAsociacionController::class, 'update'])->name('tipo_asociacion.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/tipo_comision'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [RefTipoComisionController::class, 'index'])->name('tipo_comision.index');
        Route::middleware('role:super_admin|admin')->post('/', [RefTipoComisionController::class, 'store'])->name('tipo_comision.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [RefTipoComisionController::class, 'show'])->name('tipo_comision.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [RefTipoComisionController::class, 'destroy'])->name('tipo_comision.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [RefTipoComisionController::class, 'update'])->name('tipo_comision.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/tipo_documento'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [RefTipoDocumentoRUCEController::class, 'index'])->name('tipo_documento.index');
        Route::middleware('role:super_admin|admin')->post('/', [RefTipoDocumentoRUCEController::class, 'store'])->name('tipo_documento.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [RefTipoDocumentoRUCEController::class, 'show'])->name('tipo_documento.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [RefTipoDocumentoRUCEController::class, 'destroy'])->name('tipo_documento.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [RefTipoDocumentoRUCEController::class, 'update'])->name('tipo_documento.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/tipo_fondo'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [RefTipoFondoController::class, 'index'])->name('tipo_fondo.index');
        Route::middleware('role:super_admin|admin')->post('/', [RefTipoFondoController::class, 'store'])->name('tipo_fondo.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [RefTipoFondoController::class, 'show'])->name('tipo_fondo.show');
        Route::middleware('role:super_admin|admin')->delete('/{id}', [RefTipoFondoController::class, 'destroy'])->name('tipo_fondo.destroy');
        Route::middleware('role:super_admin|admin')->put('/{id}', [RefTipoFondoController::class, 'update'])->name('tipo_fondo.update');
    });
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/usuario'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [UsuarioRUCEController::class, 'index'])->name('usuario.index');
        Route::middleware('role:super_admin')->post('/', [UsuarioRUCEController::class, 'store'])->name('usuario.store');
        Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [UsuarioRUCEController::class, 'show'])->name('usuario.show');
        Route::middleware('role:super_admin')->delete('/{id}', [UsuarioRUCEController::class, 'destroy'])->name('usuario.destroy');
        Route::middleware('role:super_admin')->put('/{id}', [UsuarioRUCEController::class, 'update'])->name('usuario.update');
    });
});

Route::group(['prefix' => '/auth'], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
    Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout'])->name('auth.logout');
    Route::get('/unauthorized', [AuthController::class, 'unauthorized'])->name('auth.unauthorized');
});

Route::middleware('auth:sanctum')->group(function () {
    Route::group(['prefix' => '/panel'], function () {
        Route::middleware('role:super_admin|admin|writer|user')->get('/Filter', [DashboardController::class, 'index'])->name('panel.index');
        // Route::middleware('role:super_admin')->post('/', [UsuarioRUCEController::class, 'store'])->name('usuario.store');
        // Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [UsuarioRUCEController::class, 'show'])->name('usuario.show');
        // Route::middleware('role:super_admin')->delete('/{id}', [UsuarioRUCEController::class, 'destroy'])->name('usuario.destroy');
        // Route::middleware('role:super_admin')->put('/{id}', [UsuarioRUCEController::class, 'update'])->name('usuario.update');
    });
});

Route::group(['prefix' => '/informe_gral'], function () {
    Route::get('/Filter', [Informe_gralController::class, 'index'])->name('reportes');
    // Route::middleware('role:super_admin')->post('/', [UsuarioRUCEController::class, 'store'])->name('usuario.store');
    // Route::middleware('role:super_admin|admin|writer|user')->get('/{id}', [UsuarioRUCEController::class, 'show'])->name('usuario.show');
    // Route::middleware('role:super_admin')->delete('/{id}', [UsuarioRUCEController::class, 'destroy'])->name('usuario.destroy');
    // Route::middleware('role:super_admin')->put('/{id}', [UsuarioRUCEController::class, 'update'])->name('usuario.update');
});