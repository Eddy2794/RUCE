import { SelectService } from '../../../shared/services/select.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CooperadoraFormInsupdComponent } from './cooperadora/Components/form-insupd/cooperadora-form-insupd.component';
import { CooperadoraListComponent } from './cooperadora/Components/form-list/cooperadora-list.component';
import { PrincipalComponent } from './cooperadora/Components/principal/principal.component';
import { EncabezadoCooperadoraComponent } from './cooperadora/Components/encabezado-cooperadora/encabezado-cooperadora.component';

import { AtencionSeguimientoService } from './cooperadora/Services/AtencionSeguimiento/atencion-seguimiento.service';
import { CooperadoraService } from './cooperadora/Services/Cooperadora/cooperadora.service';
import { AutoridadCooperadoraService } from './cooperadora/Services/AutoridadCooperadora/autoridad-cooperadora.service';
import { KioscoService } from './kiosco/Services/kiosco.service';
import { FondoCooperarService } from './cooperadora/Services/FondoCooperar/fondo-cooperar.service';
import { HistorialEstadoCooperadoraService } from './cooperadora/Services/Historial_Estado_Cooperadora/historial-estado-cooperadora.service';
import { ExpedienteService } from './expediente/Services/expediente.service';
import { PersoneriaService } from './personeria/Services/personeria.service';

import { SharedModule } from '@app/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { RefCooperadoraRoutingModule } from './refcooperadora-routing.module';
import { RefTipoAsociacionService } from '../ref-ruce/Services/reftipoasociacion.service';
import { AutoridadListComponent } from './autoridades/Components/autoridad-list/autoridad-list/autoridad-list.component';
import { InsupdComponent } from './autoridades/Components/frm-insupd/insupd/insupd.component';
import { ExpedienteListComponent } from './expediente/Components/frm-list/expediente-list/expediente-list.component';
import { MovimientoExpedienteListComponent } from './expediente/Components/frm-list/movimiento-expediente-list/movimiento-expediente-list.component';


@NgModule({
  declarations: [
    EncabezadoCooperadoraComponent,
    CooperadoraFormInsupdComponent,
    CooperadoraListComponent,
    PrincipalComponent,
    AutoridadListComponent,
    InsupdComponent,
    ExpedienteListComponent,
    MovimientoExpedienteListComponent,
  ],
  imports: [
    CommonModule,
    RefCooperadoraRoutingModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
  ],
  providers: [
    CooperadoraService,
    AutoridadCooperadoraService,
    KioscoService,
    AtencionSeguimientoService,
    FondoCooperarService,
    RefTipoAsociacionService,

    HistorialEstadoCooperadoraService,
    ExpedienteService,
    PersoneriaService,
    SelectService
  ]
})
export class RefCooperadoraModule { }
