import { SelectService } from '../../../shared/services/select.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CooperadoraFormInsupdComponent } from './cooperadora/Components/form-insupd/cooperadora-form-insupd.component';
import { CooperadoraListComponent } from './cooperadora/Components/form-list/cooperadora-list.component';
import { PrincipalComponent } from './cooperadora/Components/principal/principal.component';
import { EncabezadoCooperadoraComponent } from './cooperadora/Components/encabezado-cooperadora/encabezado-cooperadora.component';

import { AtencionSeguimientoService } from './atencion-seguimiento/Service/atencion-seguimiento.service';
import { CooperadoraService } from './cooperadora/Services/cooperadora.service';
import { KioscoService } from './kiosco/Services/kiosco.service';
import { FondoService } from './fondo/Services/fondo.service';
import { MovimientoExpedienteService } from './expediente/Services/movimiento-expediente.service';
import { ExpedienteService } from './expediente/Services/expediente.service';
import { PersoneriaService } from './personeria/Services/personeria.service';

import { SharedModule } from '@app/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { RefCooperadoraRoutingModule } from './refcooperadora-routing.module';
import { RefTipoAsociacionService } from '../ref-ruce/Services/reftipoasociacion.service';
import { AutoridadListComponent } from './autoridades/Components/autoridad-list/autoridad-list.component';
import { AutoridadInsupdComponent } from './comision/Components/frm-insupd/autoridad-insupd/autoridad-insupd.component';
import { ExpedienteListComponent } from './expediente/Components/frm-list/expediente-list/expediente-list.component';
import { MovimientoExpedienteListComponent } from './expediente/Components/frm-list/movimiento-expediente-list/movimiento-expediente-list.component';
import { EncabezadoComisionComponent } from './comision/Components/encabezado/encabezado-comision.component';
import { ComisionInsupdComponent } from './comision/Components/frm-insupd/comision-insupd/comision-insupd.component';
import { AutoridadComisionService } from './comision/Services/autoridad-comision.service';
import { ExpedienteInsupdComponent } from './expediente/Components/expediente-insupd/expediente-insupd.component';


@NgModule({
  declarations: [
    EncabezadoCooperadoraComponent,
    CooperadoraFormInsupdComponent,
    ComisionInsupdComponent,
    CooperadoraListComponent,
    PrincipalComponent,
    AutoridadListComponent,
    AutoridadInsupdComponent,
    ExpedienteListComponent,
    MovimientoExpedienteListComponent,
    EncabezadoComisionComponent,
    ExpedienteInsupdComponent,
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
    AutoridadComisionService,
    KioscoService,
    AtencionSeguimientoService,
    FondoService,
    RefTipoAsociacionService,

    MovimientoExpedienteService,
    ExpedienteService,
    PersoneriaService,
    SelectService
  ]
})
export class RefCooperadoraModule { }
