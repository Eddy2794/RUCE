import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtencionSeguimientoListComponent } from './Components/form-list/atencion-seguimiento-list.component';
import { AtencionSeguimientoInsupdComponent } from './Components/form-insupd/atencion-seguimiento-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: AtencionSeguimientoListComponent },
    { path: 'add-edit/:id', component: AtencionSeguimientoInsupdComponent },
    { path: 'view/:id', component: AtencionSeguimientoInsupdComponent },
    { path: 'delete/:id', component: AtencionSeguimientoInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtencionseguimientoRoutingModule { }
