import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { FondoRoutingModule } from "./fondo-routing.module";
import { FondoListComponent } from "./Components/fondo-list/fondo-list.component";
import { FondoInsupdComponent } from "./Components/fondo-insupd/fondo-insupd.component";

@NgModule({
  declarations: [FondoListComponent, FondoInsupdComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    FondoRoutingModule,
  ],
  exports: [FondoListComponent, FondoInsupdComponent],
})
export class FondoModule {}
