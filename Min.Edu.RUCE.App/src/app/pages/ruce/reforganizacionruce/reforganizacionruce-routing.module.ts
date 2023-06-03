import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizacionRUCEListComponent } from './Components/organizacion-ruce/form-list/organizacionruce-list.component';
import { OrganizacionRUCEInsupdComponent } from './Components/organizacion-ruce/form-insupd/organizacionruce-insupd.component';
import { TabsEjemploComponent } from '../../tabs-ejemplo/tabs-ejemplo.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: OrganizacionRUCEListComponent},
      { path: 'add-edit/:id', component: OrganizacionRUCEInsupdComponent },
      { path: 'delete/:id', component: OrganizacionRUCEInsupdComponent },
      { path: 'detalles/:id', component: TabsEjemploComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefOrganizacionRUCERoutingModule { }