import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//* Rutas Sub-Modulos
import { AppRoutingModule } from './app-routing.module';
import { RuceRoutingModule } from './ruce/ruce-routing.module';
import { EstablecimientosRoutingModule } from './establecimientos/establecimientos-routing.module';

//* Sub-Modulos
import { RUCEModule } from './ruce/ruce.module';
import { EstablecimientosModule } from './establecimientos/establecimientos.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    //* Rutas Sub-Modulos
    AppRoutingModule,
    RuceRoutingModule,
    EstablecimientosRoutingModule,

    //* Sub-Modulos
    EstablecimientosModule,
    RUCEModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
