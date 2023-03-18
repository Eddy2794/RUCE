import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsEjemploComponent } from './tabs-ejemplo.component';

const routes: Routes = [
  {
    path: '',
    component: TabsEjemploComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsEjemploRoutingModule { }
