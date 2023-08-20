import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { PersoneriaRoutingModule } from "./personeria-routing.module";
import { InsupdPersoneriaComponent } from "./Components/insupd-personeria/insupd-personeria.component";
import { PersoneriaListComponent } from "./Components/personeria-list/personeria-list.component";

@NgModule({
  declarations: [InsupdPersoneriaComponent, PersoneriaListComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    PersoneriaRoutingModule,
  ],
  exports: [InsupdPersoneriaComponent, PersoneriaListComponent],
})
export class PersoneriaModule {}
