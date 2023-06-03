import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionSeguimientoComponent } from './Components/atencion-seguimiento/atencion-seguimiento.component';
import { AutoridadCooperadoraComponent } from './Components/autoridad-cooperadora/autoridad-cooperadora.component';
import { ExpedienteComponent } from './Components/expediente/expediente.component';
import { FondosCooperarComponent } from './Components/fondos-cooperar/fondos-cooperar.component';
import { HistorialCooperadoraComponent } from './Components/historial-cooperadora/historial-cooperadora.component';
import { KioscoComponent } from './Components/kiosco/kiosco.component';
import { PersoneriaComponent } from './Components/personeria/personeria.component';
import { TipoAsociacionComponent } from './Components/tipo-asociacion/tipo-asociacion.component';
import { CooperadoraFormInsupdComponent } from './Components/cooperadora/form-insupd/cooperadora-form-insupd.component';

import { AtencionSeguimientoService } from './Services/AtencionSeguimiento/atencion-seguimiento.service';
import { CooperadoraService } from './Services/Cooperadora/cooperadora.service';
import { AutoridadCooperadoraService } from './Services/AutoridadCooperadora/autoridad-cooperadora.service';
import { KioscoService } from './Services/Kiosco/kiosco.service';
import { FondoCooperarService } from './Services/FondoCooperar/fondo-cooperar.service';
import { HistorialEstadoCooperadoraService } from './Services/Historial_Estado_Cooperadora/historial-estado-cooperadora.service';
import { TipoAsociacionService } from './Services/TipoAsociacion/tipo-asociacion.service';
import { ExpedienteService } from './Services/Expediente/expediente.service';
import { PersoneriaService } from './Services/Personeria/personeria.service';
import { EncabezadoCooperadoraComponent } from './Components/cooperadora/encabezado-cooperadora/encabezado-cooperadora.component';
import { SharedModule } from '@app/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { RefCooperadoraRoutingModule } from './refcooperadora-routing.module';
import { CooperadoraListComponent } from './Components/cooperadora/form-list/cooperadora-list.component';
import { PrincipalComponent } from './Components/cooperadora/principal/principal.component';


@NgModule({
  declarations: [
    AtencionSeguimientoComponent,
    AutoridadCooperadoraComponent,
    ExpedienteComponent,
    FondosCooperarComponent,
    HistorialCooperadoraComponent,
    KioscoComponent,
    PersoneriaComponent,
    TipoAsociacionComponent,
    EncabezadoCooperadoraComponent,
    CooperadoraFormInsupdComponent,
    CooperadoraListComponent,
    PrincipalComponent,
  ],
  imports: [
    CommonModule,
    RefCooperadoraRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule
  ],
  providers: [
    CooperadoraService,
    AutoridadCooperadoraService,
    KioscoService,
    AtencionSeguimientoService,
    FondoCooperarService,

    HistorialEstadoCooperadoraService,
    TipoAsociacionService,
    ExpedienteService,
    PersoneriaService
  ]
})
export class RefCooperadoraModule { }
