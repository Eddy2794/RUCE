import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { TipoasociacionRoutingModule } from "./tipoasociacion-routing.module";
import { TipoasociacionListComponent } from "./Components/tipoasociacion-list/tipoasociacion-list.component";
import { TipoasociacionInsupdComponent } from "./Components/tipoasociacion-insupd/tipoasociacion-insupd.component";

@NgModule({
  declarations: [TipoasociacionListComponent, TipoasociacionInsupdComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    TipoasociacionRoutingModule,
  ],
  exports: [TipoasociacionListComponent, TipoasociacionInsupdComponent],
})
export class TipoAsociacionModule {}
