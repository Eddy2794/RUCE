import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { CargoListComponent } from './pages/ruce/ref-ruce/cargo/Components/cargo-list/cargo-list.component';
import { CargoInsupdComponent } from './pages/ruce/ref-ruce/cargo/Components/cargo-insupd/cargo-insupd.component';
import { InstrumentoListComponent } from './pages/ruce/ref-ruce/instanciainstrumento/Components/instrumento-list/instrumento-list.component';
import { InstrumentoInsupdComponent } from './pages/ruce/ref-ruce/instanciainstrumento/Components/instrumento-insupd/instrumento-insupd.component';
import { TipocomisionListComponent } from './pages/ruce/ref-ruce/tipocomision/Components/tipocomision-list/tipocomision-list.component';
import { TipocomisionInsupdComponent } from './pages/ruce/ref-ruce/tipocomision/Components/tipocomision-insupd/tipocomision-insupd.component';
import { TipodocumentoListComponent } from './pages/ruce/ref-ruce/tipodocumento/Components/tipodocumento-list/tipodocumento-list.component';
import { TipodocumentoInsupdComponent } from './pages/ruce/ref-ruce/tipodocumento/Components/tipodocumento-insupd/tipodocumento-insupd.component';
import { TipofondoListComponent } from './pages/ruce/ref-ruce/tipofondo/Components/tipofondo-list/tipofondo-list.component';
import { TipofondoInsupdComponent } from './pages/ruce/ref-ruce/tipofondo/Components/tipofondo-insupd/tipofondo-insupd.component';
import { TipoasociacionListComponent } from './pages/ruce/ref-ruce/tipoasociacion/Components/tipoasociacion-list/tipoasociacion-list.component';
import { TipoasociacionInsupdComponent } from './pages/ruce/ref-ruce/tipoasociacion/Components/tipoasociacion-insupd/tipoasociacion-insupd.component';

@NgModule({
  declarations: [AppComponent, CargoListComponent, CargoInsupdComponent, InstrumentoListComponent, InstrumentoInsupdComponent, TipocomisionListComponent, TipocomisionInsupdComponent, TipodocumentoListComponent, TipodocumentoInsupdComponent, TipofondoListComponent, TipofondoInsupdComponent, TipoasociacionListComponent, TipoasociacionInsupdComponent, ],
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
