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
            loadChildren: () => import('./pages/ruce/organizacionruce/reforganizacionruce.module').then(m=> m.RefOrganizacionRUCEModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'autoridad-establecimieto',
            loadChildren: () => import('./pages/ruce/autoridadesorganizacion/autoridadesorganizacion.module').then(m=> m.AutoridadesorganizacionModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          }, 
          {
            path: 'matriculas',
            loadChildren: () => import('./pages/ruce/matriculas/matriculas.module').then(m=> m.MatriculasModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          }, 
          {
            path: 'cooperadoras',
            loadChildren: () => import('./pages/ruce/cooperadora/refcooperadora.module').then(m=> m.RefCooperadoraModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'atencion-seguimiento',
            loadChildren: () => import('./pages/ruce/atencionseguimiento/atencionseguimiento.module').then(m=> m.AtencionseguimientoModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'autoridad-comision',
            loadChildren: () => import('./pages/ruce/autoridadescomision/autoridadescomision.module').then(m=> m.AutoridadescomisionModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'balances',
            loadChildren: () => import('./pages/ruce/balances/balances.module').then(m=> m.BalancesModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'comision',
            loadChildren: () => import('./pages/ruce/comision/comision.module').then((m)=> m.ComisionModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'expediente',
            loadChildren: () => import('./pages/ruce/expediente/expediente.module').then(m=> m.ExpedienteModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'fondos',
            loadChildren: () => import('./pages/ruce/fondo/fondo.module').then(m=> m.FondoModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'kiosco',
            loadChildren: () => import('./pages/ruce/kiosco/kiosco.module').then(m=> m.KioscoModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'personeria',
            loadChildren: () => import('./pages/ruce/personeria/personeria.module').then(m=> m.PersoneriaModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'audits',
            loadChildren: () => import('./pages/ruce/refruce/audit/audit.module').then(m=> m.AuditModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'cargos',
            loadChildren: () => import('./pages/ruce/refruce/cargo/cargo.module').then(m=> m.CargoModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'instancia-instrumento',
            loadChildren: () => import('./pages/ruce/refruce/instanciainstrumento/instanciainstrumento.module').then(m=> m.InstanciainstrumentoModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'tipo-asociacion',
            loadChildren: () => import('./pages/ruce/refruce/tipoasociacion/tipoasociacion.module').then(m=> m.TipoAsociacionModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'tipo-comision',
            loadChildren: () => import('./pages/ruce/refruce/tipocomision/tipocomision.module').then(m=> m.TipoComisionModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'tipo-documento',
            loadChildren: () => import('./pages/ruce/refruce/tipodocumento/tipodocumento.module').then(m=> m.TipoDocumentoModule),
            data:{
              toolbarShadowEnabled: true,       
            }
          },
          {
            path: 'tipo-fondo',
            loadChildren: () => import('./pages/ruce/refruce/tipofondo/tipofondo.module').then(m=> m.TipoFondoModule),
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
