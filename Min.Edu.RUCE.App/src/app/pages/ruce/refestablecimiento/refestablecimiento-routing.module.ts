import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablecimientoListComponent } from './Components/establecimiento/form-list/establecimiento-list.component';
import { EstablecimientoInsupdComponent } from './Components/establecimiento/form-insupd/establecimiento-insupd.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: EstablecimientoListComponent},
      { path: 'add-edit/:id', component: EstablecimientoInsupdComponent },
      { path: 'delete/:id', component: EstablecimientoInsupdComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefEstablecimientoRoutingModule { }