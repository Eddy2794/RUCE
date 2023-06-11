import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
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
            path: 'planestudio',
            loadChildren: () => import('./pages/planestudiobase/planestudiobase.module').then(m => m.PlanestudiobaseModule),
          },
          {
            path: 'cargosalarial',
            loadChildren: () => import('./pages/cargosalarial/cargosalarial.module').then(m => m.CargosalarialModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'cargofuncional',
            loadChildren: () => import('./pages/cargofuncional/cargofuncional.module').then(m => m.CargofuncionalModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'plaza',
            loadChildren: () => import('./pages/plaza/plaza.module').then(m => m.PlazaModule),
          },
          {
            path: 'presupuesto',
            loadChildren: () => import('./pages/presupuesto/presupuesto.module').then(m => m.PresupuestoModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'ejbuscfiltr',
            loadChildren: () => import('./pages/ejemplobuscadorfiltros/ejbuscfilt.module').then(m => m.EjbuscfiltModule),
            data: {
              toolbarShadowEnabled: true
            }
          },
          {
            path: 'wizard-ejemplo',
            loadChildren: () => import('./pages/wizard-ejemplo/wizard-ejemplo.module').then(m => m.WizardEjemploModule)
          },
          {
            path: 'tabs-ejemplo',
            loadChildren: () => import('./pages/tabs-ejemplo/tabs-ejemplo.module').then(m => m.TabsEjemploModule)
          },
          {
            path: 'establecimientos',
            loadChildren: () => import('./pages/ruce/reforganizacionruce/reforganizacionruce.module').then(m=> m.RefOrganizacionRUCEModule),
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
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    //preloadingStrategy: QuicklinkStrategy,
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule, QuicklinkModule]
})
export class AppRoutingModule {
}
