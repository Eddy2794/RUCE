import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooperadoraListComponent } from './cooperadora/Components/form-list/cooperadora-list.component';
import { CooperadoraFormInsupdComponent } from './cooperadora/Components/form-insupd/cooperadora-form-insupd.component';
import { PrincipalComponent } from './cooperadora/Components/principal/principal.component';
import { TabsEjemploComponent } from '../../tabs-ejemplo/tabs-ejemplo.component';
import { EncabezadoCooperadoraComponent } from './cooperadora/Components/encabezado-cooperadora/encabezado-cooperadora.component';
import { AutoridadInsupdComponent } from './autoridades/Components/frm-insupd/insupd/autoridad-insupd.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: CooperadoraListComponent},
      { path: 'add-edit/:id', component: CooperadoraFormInsupdComponent },
      { path: 'delete/:id', component: CooperadoraFormInsupdComponent },
      { path: 'view/:id', component: PrincipalComponent },
      { path: ':id/autoridades',
        children: [
      //     { path: 'listar', component: AutoridadListComponent},
      //     // { path: 'listar', component: AutoridadFormListComponent},
          { path: 'add-edit/:idAutoridad', component: AutoridadInsupdComponent },
          { path: 'delete/:idAutoridad', component: AutoridadInsupdComponent },
          { path: 'view/:idAutoridad', component: PrincipalComponent },
      //     { path: '**', redirectTo: 'listar' }
        ]},
      { path: 'principal', component: PrincipalComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefCooperadoraRoutingModule { }