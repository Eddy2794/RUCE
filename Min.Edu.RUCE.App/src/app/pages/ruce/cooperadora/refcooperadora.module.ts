import { SelectService } from '../../../shared/services/select.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';
import { RefCooperadoraRoutingModule } from './refcooperadora-routing.module';
import { EncabezadoCooperadoraComponent } from './Components/encabezado-cooperadora/encabezado-cooperadora.component';
import { CooperadoraFormInsupdComponent } from './Components/form-insupd/cooperadora-form-insupd.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { CooperadoraListComponent } from './Components/form-list/cooperadora-list.component';
import { ExpedienteListComponent } from '../expediente/Components/frm-list/expediente-list/expediente-list.component';
import { BalanceListComponent } from '../balances/Components/balance-list/balance-list.component';
import { FondoListComponent } from '../fondo/Components/fondo-list/fondo-list.component';
import { AtencionSeguimientoListComponent } from '../atencionseguimiento/Components/form-list/atencion-seguimiento-list.component';
import { EncabezadoComisionComponent } from '../comision/Components/encabezado-comision/encabezado-comision.component';
import { InsupdPersoneriaComponent } from '../personeria/Components/insupd-personeria/insupd-personeria.component';



@NgModule({
  declarations: [
    EncabezadoCooperadoraComponent,
    CooperadoraFormInsupdComponent,
//    ComisionInsupdComponent,
    CooperadoraListComponent,
    PrincipalComponent,
//     AutoridadListComponent,
//     AutoridadInsupdComponent,
    ExpedienteListComponent,
//     MovimientoExpedienteListComponent,
    EncabezadoComisionComponent,
//     ExpedienteInsupdComponent,
   AtencionSeguimientoListComponent,
// //    AtencionSeguimientoInsupdComponent,
    BalanceListComponent,
//     BalanceInsupdComponent,
    FondoListComponent,
//     FondoInsupdComponent,
//     KioscoListComponent,
//     KioscoInsupdComponent,
//     PersoneriaListComponent,
    InsupdPersoneriaComponent,
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
    // CooperadoraService,
    // AutoridadComisionService,
    // KioscoService,
    // AtencionSeguimientoService,
    // FondoService,
    // RefTipoAsociacionService,

    // MovimientoExpedienteService,
    // ExpedienteService,
    // PersoneriaService,
    SelectService,
  ]
})
export class RefCooperadoraModule { }
