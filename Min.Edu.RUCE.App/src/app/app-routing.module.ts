
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { VexRoutes } from 'src/@vex/interfaces/vex-route.interface';
import { CustomLayoutComponent } from './custom-layout/custom-layout.component';

const routes: VexRoutes = [
  {
    path: '',
    component: CustomLayoutComponent,
    children: [
      {
        path: 'pages',
        children: [
          {
            path: 'refniveleducativo',
            loadChildren: () => import('./pages/organismos/refniveleducativo/refniveleducativo.module').then(m=> m.RefNivelEducativoModule),
            data:{
              toolbarShadowEnabled: true,          
            }
          },
          {
            path: 'refgruponivel',
            loadChildren: () => import('./pages/organismos/refgruponivel/refgruponivel.module').then(m=> m.RefGrupoNivelModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          }, 
          {
            path: 'refestablecimiento',
            loadChildren: () => import('./pages/ruce/refestablecimiento/refestablecimiento.module').then(m=> m.RefEstablecimientoModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          }, 
          {
            path: 'refcooperadora',
            loadChildren: () => import('./pages/ruce/refcooperadora/refcooperadora.module').then(m=> m.RefCooperadoraModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          }, 
            {
            path: 'wizard-ejemplo',
            loadChildren: () => import('./pages/wizard-ejemplo/wizard-ejemplo.module').then(m=> m.WizardEjemploModule)
          },
          {
            path: 'tabs-ejemplo',
            loadChildren: () => import('./pages/tabs-ejemplo/tabs-ejemplo.module').then(m=> m.TabsEjemploModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,
    preloadingStrategy: QuicklinkStrategy,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule,QuicklinkModule]
})
export class AppRoutingModule {
}
