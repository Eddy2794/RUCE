import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { CargoRoutingModule } from "./cargo-routing.module";
import { CargoListComponent } from "./Components/cargo-list/cargo-list.component";
import { CargoInsupdComponent } from "./Components/cargo-insupd/cargo-insupd.component";

@NgModule({
  declarations: [CargoListComponent, CargoInsupdComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    CargoRoutingModule,
  ],
})
export class CargoModule {}
