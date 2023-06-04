import { DetallesComponent } from './Components/detalles/detalles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizacionRUCEListComponent } from './Components/form-list/organizacionruce-list.component';
import { OrganizacionRUCEInsupdComponent } from './Components/form-insupd/organizacionruce-insupd.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: OrganizacionRUCEListComponent},
      { path: 'add-edit/:id', component: OrganizacionRUCEInsupdComponent },
      { path: 'delete/:id', component: OrganizacionRUCEInsupdComponent },
      { path: 'detalles/:id', component: DetallesComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefOrganizacionRUCERoutingModule { }