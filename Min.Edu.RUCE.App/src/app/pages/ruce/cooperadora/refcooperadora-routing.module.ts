import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooperadoraListComponent } from './Components/form-list/cooperadora-list.component';
import { CooperadoraFormInsupdComponent } from './Components/form-insupd/cooperadora-form-insupd.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { EncabezadoCooperadoraComponent } from './Components/encabezado-cooperadora/encabezado-cooperadora.component';


const routes: VexRoutes = [
  {
    path: '',
    children: [
      { path: 'listar', component: CooperadoraListComponent},
      { path: 'add-edit/:id', component: CooperadoraFormInsupdComponent },
      { path: 'delete/:id', component: CooperadoraFormInsupdComponent },
      { path: 'view/:id', component: PrincipalComponent },
      { path: 'view/:id/detalles', component: EncabezadoCooperadoraComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefCooperadoraRoutingModule { }