import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooperadoraListComponent } from './cooperadora/Components/form-list/cooperadora-list.component';
import { CooperadoraFormInsupdComponent } from './cooperadora/Components/form-insupd/cooperadora-form-insupd.component';
import { PrincipalComponent } from './cooperadora/Components/principal/principal.component';
import { TabsEjemploComponent } from '../../tabs-ejemplo/tabs-ejemplo.component';
import { EncabezadoCooperadoraComponent } from './cooperadora/Components/encabezado-cooperadora/encabezado-cooperadora.component';
//import { AutoridadInsupdComponentComision } from './comision/Components/frm-insupd/autoridad-insupd/autoridad-insupd.component';
import { ComisionInsupdComponent } from './comision/Components/frm-insupd/comision-insupd/comision-insupd.component';
import { AutoridadInsupdComponent } from './autoridades/Components/autoridad-insupd/autoridad-insupd.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: CooperadoraListComponent},
      { path: 'add-edit/:id', component: CooperadoraFormInsupdComponent },
      { path: 'delete/:id', component: CooperadoraFormInsupdComponent },
      { path: 'view/:id', component: PrincipalComponent },
      { path: ':id/comision',
        children: [
      //     { path: 'listar', component: AutoridadListComponent},
      //     // { path: 'listar', component: AutoridadFormListComponent},
          { path: 'add-edit/:idComision', component: ComisionInsupdComponent },
          { path: 'delete/:idComision', component: ComisionInsupdComponent },
          { path: 'view/:idComision', component: PrincipalComponent },
      //     { path: '**', redirectTo: 'listar' }
          { path: ':idComision/autoridades',
            children: [
              { path: 'add-edit/:idAutoridad', component: AutoridadInsupdComponent },
              { path: 'delete/:idAutoridad', component: AutoridadInsupdComponent },
            ]},
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