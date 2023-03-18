import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

export const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'refniveleducativo', loadChildren: () => import('./organismos/refniveleducativo/refniveleducativo.module').then(m => m.RefNivelEducativoModule) },
      { path: 'refgruponivel', loadChildren: () => import('./organismos/refgruponivel/refgruponivel.module').then(m => m.RefGrupoNivelModule) },
      { path: 'campoformacion', loadChildren: () => import('./organismos/campoformacion/campoformacion.module').then(m => m.CampoformacionModule) },
    ]
  },

  // Not lazy-loaded routes
  // { path: 'login', component: LoginComponent },
  //Not found
  { path: '**', redirectTo: 'PagesComponent' }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
