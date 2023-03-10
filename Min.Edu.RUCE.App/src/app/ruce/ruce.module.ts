import { PersonasComponent } from './components/personas/personas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    PersonasComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class RUCEModule { }
