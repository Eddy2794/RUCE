import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablecimientoComponent } from './components/establecimiento/establecimiento.component';

const routes: Routes = [
  { path: 'establecimientos', component: EstablecimientoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class EstablecimientosRoutingModule { }
export function EstrablecimientosEntryPoint(){
  return EstablecimientosRoutingModule;
}