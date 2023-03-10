import { EstablecimientoComponent } from './components/establecimiento/establecimiento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    EstablecimientoComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule
  ]
})
export class EstablecimientosModule { }
