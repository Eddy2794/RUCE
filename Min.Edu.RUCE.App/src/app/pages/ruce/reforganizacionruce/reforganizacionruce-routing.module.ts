import { DetallesComponent } from './organizacion/Components/detalles/detalles.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizacionRUCEListComponent } from './organizacion/Components/form-list/organizacionruce-list.component';
import { OrganizacionRUCEInsupdComponent } from './organizacion/Components/form-insupd/organizacionruce-insupd.component';
import { AutoridadInsupdComponent } from './autoridades/Components/form-insupd/insupd.component';
import { AutoridadListComponent } from './autoridades/Components/autoridad-list/autoridad-list.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: OrganizacionRUCEListComponent},
      { path: 'add-edit/:id', component: OrganizacionRUCEInsupdComponent },
      { path: 'delete/:id', component: OrganizacionRUCEInsupdComponent },
      { path: 'view/:id', component: DetallesComponent },
      { path: ':id/autoridades',
        children: [
      //     { path: 'listar', component: AutoridadListComponent},
      //     // { path: 'listar', component: AutoridadFormListComponent},
          { path: 'add-edit/:idAutoridad', component: AutoridadInsupdComponent },
      //     { path: 'delete/:id', component: AutoridadInsupdComponent },
      //     { path: 'view/:id', component: DetallesComponent },
      //     { path: '**', redirectTo: 'listar' }
        ]},
      { path: '**', redirectTo: 'listar' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefOrganizacionRUCERoutingModule { }