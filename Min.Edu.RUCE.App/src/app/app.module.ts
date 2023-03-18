import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { NgModule } from '@angular/core';
import { CooperadoraComponent } from './pages/ruce/refcooperadora/Components/cooperadora/cooperadora.component';
import { KioscoComponent } from './pages/ruce/refcooperadora/Components/kiosco/kiosco.component';
import { AutoridadCooperadoraComponent } from './pages/ruce/refcooperadora/Components/autoridad-cooperadora/autoridad-cooperadora.component';
import { AtencionSeguimientoComponent } from './pages/ruce/refcooperadora/Components/atencion-seguimiento/atencion-seguimiento.component';
import { FondosCooperarComponent } from './pages/ruce/refcooperadora/Components/fondos-cooperar/fondos-cooperar.component';
import { HistorialCooperadoraComponent } from './pages/ruce/refcooperadora/Components/historial-cooperadora/historial-cooperadora.component';
import { TipoAsociacionComponent } from './pages/ruce/refcooperadora/Components/tipo-asociacion/tipo-asociacion.component';
import { ExpedienteComponent } from './pages/ruce/refcooperadora/Components/expediente/expediente.component';
import { PersoneriaComponent } from './pages/ruce/refcooperadora/Components/personeria/personeria.component';

@NgModule({
  declarations: [AppComponent, CooperadoraComponent, KioscoComponent, AutoridadCooperadoraComponent, AtencionSeguimientoComponent, FondosCooperarComponent, HistorialCooperadoraComponent, TipoAsociacionComponent, ExpedienteComponent, PersoneriaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Vex
    VexModule,
    CustomLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
