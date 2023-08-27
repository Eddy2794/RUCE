import { AuditModule } from './../refruce/audit/audit.module';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { ExpedienteRoutingModule } from "./expediente-routing.module";
import { ExpedienteInsupdComponent } from "./Components/expediente-insupd/expediente-insupd.component";
import { ExpedienteListComponent } from "./Components/frm-list/expediente-list/expediente-list.component";

@NgModule({
  declarations: [ExpedienteInsupdComponent, ExpedienteListComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    ExpedienteRoutingModule,
    AuditModule
  ],
  exports: [ExpedienteInsupdComponent, ExpedienteListComponent],
})
export class ExpedienteModule {}
