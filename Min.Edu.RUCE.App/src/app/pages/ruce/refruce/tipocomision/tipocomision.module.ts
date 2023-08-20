import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { TipocomisionRoutingModule } from "./tipocomision-routing.module";
import { TipocomisionListComponent } from "./Components/tipocomision-list/tipocomision-list.component";
import { TipocomisionInsupdComponent } from "./Components/tipocomision-insupd/tipocomision-insupd.component";

@NgModule({
  declarations: [TipocomisionListComponent, TipocomisionInsupdComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    TipocomisionRoutingModule,
  ],
  exports: [TipocomisionListComponent, TipocomisionInsupdComponent],
})
export class TipoComisionModule {}
