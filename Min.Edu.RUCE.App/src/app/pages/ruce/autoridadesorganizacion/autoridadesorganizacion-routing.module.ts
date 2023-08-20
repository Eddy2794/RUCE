import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoridadOrganizacionListComponent } from './Components/autoridad-list/autoridad-list.component';
import { AutoridadOrganizacionInsupdComponent } from './Components/form-insupd/insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: AutoridadOrganizacionListComponent },
    { path: 'add-edit/:id', component: AutoridadOrganizacionInsupdComponent },
    { path: 'view/:id', component: AutoridadOrganizacionInsupdComponent },
    { path: 'delete/:id', component: AutoridadOrganizacionInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutoridadesorganizacionRoutingModule { }
