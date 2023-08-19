import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizacionRUCEListComponent } from './Components/form-list/organizacionruce-list.component';
import { OrganizacionRUCEInsupdComponent } from './Components/form-insupd/organizacionruce-insupd.component';
import { DetallesComponent } from './Components/detalles/detalles.component';
//import { AutoridadInsupdComponent } from '../autoridadesorganizacion/Components/form-insupd/insupd.component';
//import { AutoridadListComponent } from '../autoridadesorganizacion/Components/autoridad-list/autoridad-list.component';
//import { MatriculaInsupdComponent } from './matricula/Components/form-insupd/matricula-insupd/matricula-insupd.component';
//import { ExpedienteInsupdComponent } from '../cooperadora/expediente/Components/expediente-insupd/expediente-insupd.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: OrganizacionRUCEListComponent},
      { path: 'add-edit/:id', component: OrganizacionRUCEInsupdComponent },
      { path: 'delete/:id', component: OrganizacionRUCEInsupdComponent },
      { path: 'view/:id', component: DetallesComponent },
      // { path: ':id/autoridades',
      //   children: [
      //     { path: 'listar', component: AutoridadListComponent},
      //     // { path: 'listar', component: AutoridadFormListComponent},
          // { path: 'add-edit/:idAutoridad', component: AutoridadInsupdComponent },
          // { path: 'delete/:idAutoridad', component: AutoridadInsupdComponent },
          // { path: 'view/:idAutoridad', component: DetallesComponent },
      //     { path: '**', redirectTo: 'listar' }
      //   ]},
      // { path : ':id/matricula',
      //   children:[
      //     { path: 'add-edit/:idMatricula', component: MatriculaInsupdComponent },
      //     { path: 'delete/:idMatricula', component: MatriculaInsupdComponent },
      //     { path: 'view/:idMatricula', component: DetallesComponent },
      //   ]
      // },
      // { path : ':id/expediente',
      //   children:[
      //     { path: 'add-edit/:idExpediente', component: ExpedienteInsupdComponent },
      //     { path: 'delete/:idExpediente', component: ExpedienteInsupdComponent },
      //     { path: 'view/:idExpediente', component: ExpedienteInsupdComponent },
      //   ]
      // },
      { path: '**', redirectTo: 'listar' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefOrganizacionRUCERoutingModule { }