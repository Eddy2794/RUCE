import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { TipofondoRoutingModule } from "./tipofondo-routing.module";
import { TipofondoListComponent } from "./Components/tipofondo-list/tipofondo-list.component";
import { TipofondoInsupdComponent } from "./Components/tipofondo-insupd/tipofondo-insupd.component";

@NgModule({
  declarations: [TipofondoListComponent, TipofondoInsupdComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    TipofondoRoutingModule,
  ],
  exports: [TipofondoListComponent, TipofondoInsupdComponent],
})
export class TipoFondoModule {}
