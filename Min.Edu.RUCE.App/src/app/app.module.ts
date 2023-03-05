import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EstablecimientoComponent } from './components/establecimiento/establecimiento.component';
import { PersonasComponent } from './components/personas/personas.component';
import { AutoridadesEstablecimientoComponent } from './components/autoridades-establecimiento/autoridades-establecimiento.component';

@NgModule({
  declarations: [
    AppComponent,
    EstablecimientoComponent,
    PersonasComponent,
    AutoridadesEstablecimientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
