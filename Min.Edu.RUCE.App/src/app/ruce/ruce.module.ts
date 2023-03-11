import { EstablecimientoService } from './services/Establecimiento/establecimiento-service.service';
import { EstablecimientoComponent } from './components/establecimiento/establecimiento.component';
import { PersonasComponent } from './components/personas/personas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RuceRoutingModule } from './ruce-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    PersonasComponent,
    EstablecimientoComponent
  ],
  imports: [
    CommonModule,
    RuceRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    EstablecimientoService
  ]
})
export class RuceModule { }
