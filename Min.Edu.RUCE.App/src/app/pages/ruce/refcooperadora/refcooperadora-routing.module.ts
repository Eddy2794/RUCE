import { PrincipalComponent } from './Components/cooperadora/principal/principal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooperadoraListComponent } from './Components/cooperadora/form-list/cooperadora-list.component';
import { CooperadoraFormInsupdComponent } from './Components/cooperadora/form-insupd/cooperadora-form-insupd.component';
import { TabsEjemploComponent } from '../../tabs-ejemplo/tabs-ejemplo.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: CooperadoraListComponent},
      { path: 'add-edit/:id', component: CooperadoraFormInsupdComponent },
      { path: 'delete/:id', component: CooperadoraFormInsupdComponent },
      { path: 'detalles/:id', component: TabsEjemploComponent },
      { path: 'principal', component: PrincipalComponent },
      { path: '**', redirectTo: 'principal' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefCooperadoraRoutingModule { }