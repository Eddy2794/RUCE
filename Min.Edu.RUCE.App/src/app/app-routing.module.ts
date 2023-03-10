import { PersonasComponent } from './ruce/components/personas/personas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablecimientoComponent } from './establecimientos/components/establecimiento/establecimiento.component';

const routes: Routes = [
  { path: 'establecimientos', component: EstablecimientoComponent },
  { path: 'personas', component: PersonasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
