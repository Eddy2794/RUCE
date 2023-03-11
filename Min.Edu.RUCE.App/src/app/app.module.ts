import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

//* Rutas Sub-Modulos
import { RuceRoutingModule } from './ruce/ruce-routing.module';

//* Sub-Modulos
import { RuceModule } from './ruce/ruce.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,

    //* Rutas Sub-Modulos
    RuceRoutingModule,

    //* Sub-Modulos
    RuceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
