import { EstablecimientoComponent } from './components/establecimiento/establecimiento.component';
import { PersonasComponent } from './components/personas/personas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'personas', component: PersonasComponent },
  { path: 'establecimientos', component: EstablecimientoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RuceRoutingModule { }