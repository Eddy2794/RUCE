import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CooperadoraListComponent } from './Components/cooperadora/form-list/cooperadora-list.component';
import { CooperadoraInsupdComponent } from './Components/cooperadora/form-insupd/cooperadora-insupd.component';
import { TabsEjemploComponent } from '../../tabs-ejemplo/tabs-ejemplo.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: CooperadoraListComponent},
      { path: 'add-edit/:id', component: CooperadoraInsupdComponent },
      { path: 'delete/:id', component: CooperadoraInsupdComponent },
      { path: 'detalles/:id', component: TabsEjemploComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefCooperadoraRoutingModule { }