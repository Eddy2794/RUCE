import { FondoModule } from './../fondo/fondo.module';
import { BalancesModule } from './../balances/balances.module';
import { AtencionseguimientoModule } from './../atencionseguimiento/atencionseguimiento.module';
import { SelectService } from "../../../shared/services/select.service";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@app/shared/shared.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";
import { RefCooperadoraRoutingModule } from "./refcooperadora-routing.module";
import { EncabezadoCooperadoraComponent } from "./Components/encabezado-cooperadora/encabezado-cooperadora.component";
import { CooperadoraFormInsupdComponent } from "./Components/form-insupd/cooperadora-form-insupd.component";
import { PrincipalComponent } from "./Components/principal/principal.component";
import { CooperadoraListComponent } from "./Components/form-list/cooperadora-list.component";
import { ExpedienteListComponent } from "../expediente/Components/frm-list/expediente-list/expediente-list.component";
import { BalanceListComponent } from "../balances/Components/balance-list/balance-list.component";
import { FondoListComponent } from "../fondo/Components/fondo-list/fondo-list.component";
import { AtencionSeguimientoListComponent } from "../atencionseguimiento/Components/form-list/atencion-seguimiento-list.component";
import { EncabezadoComisionComponent } from "../comision/Components/encabezado-comision/encabezado-comision.component";
import { PersoneriaModule } from "../personeria/personeria.module";
import { ComisionModule } from "../comision/comision.module";
import { ExpedienteModel } from "../expediente/Models/expediente-model";
import { ExpedienteModule } from '../expediente/expediente.module';
import { CooperadoraService } from './Services/cooperadora.service';
import { KioscoModule } from "../kiosco/kiosco.module";

@NgModule({
    declarations: [
        EncabezadoCooperadoraComponent,
        CooperadoraFormInsupdComponent,
        CooperadoraListComponent,
        PrincipalComponent,
    ],
    providers: [
        CooperadoraService,
        SelectService,
    ],
    imports: [
        CommonModule,
        RefCooperadoraRoutingModule,
        SharedModule,
        PageLayoutModule,
        BreadcrumbsModule,
        SecondaryToolbarModule,
        PersoneriaModule,
        ComisionModule,
        ExpedienteModule,
        AtencionseguimientoModule,
        BalancesModule,
        FondoModule,
        KioscoModule
    ]
})
export class RefCooperadoraModule {}
