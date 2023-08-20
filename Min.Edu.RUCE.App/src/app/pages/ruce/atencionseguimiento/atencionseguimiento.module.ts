import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { AtencionseguimientoRoutingModule } from "./atencionseguimiento-routing.module";
import { AtencionSeguimientoInsupdComponent } from "./Components/form-insupd/atencion-seguimiento-insupd.component";
import { AtencionSeguimientoListComponent } from "./Components/form-list/atencion-seguimiento-list.component";

@NgModule({
  declarations: [
    AtencionSeguimientoInsupdComponent,
    AtencionSeguimientoListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    AtencionseguimientoRoutingModule,
  ],
  exports: [
    AtencionSeguimientoListComponent,
    AtencionSeguimientoInsupdComponent
  ]
})
export class AtencionseguimientoModule {}
