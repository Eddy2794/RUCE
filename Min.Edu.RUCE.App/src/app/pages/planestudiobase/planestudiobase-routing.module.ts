import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanestudiobaseListComponent } from './components/form-list/planestudiobase-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listar', component: PlanestudiobaseListComponent },
      { path: '**', redirectTo: 'listar' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanestudiobaseRoutingModule { }
