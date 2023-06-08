import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooperadoraListComponent } from './cooperadora/Components/form-list/cooperadora-list.component';
import { CooperadoraFormInsupdComponent } from './cooperadora/Components/form-insupd/cooperadora-form-insupd.component';
import { PrincipalComponent } from './cooperadora/Components/principal/principal.component';
import { TabsEjemploComponent } from '../../tabs-ejemplo/tabs-ejemplo.component';
import { EncabezadoCooperadoraComponent } from './cooperadora/Components/encabezado-cooperadora/encabezado-cooperadora.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: CooperadoraListComponent},
      { path: 'add-edit/:id', component: CooperadoraFormInsupdComponent },
      { path: 'delete/:id', component: CooperadoraFormInsupdComponent },
      { path: 'detalles/:id', component: PrincipalComponent },
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