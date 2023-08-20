import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { InstanciainstrumentoRoutingModule } from "./instanciainstrumento-routing.module";
import { InstrumentoListComponent } from "./Components/instrumento-list/instrumento-list.component";
import { InstrumentoInsupdComponent } from "./Components/instrumento-insupd/instrumento-insupd.component";

@NgModule({
  declarations: [InstrumentoListComponent, InstrumentoInsupdComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    InstanciainstrumentoRoutingModule,
  ],
  exports: [InstrumentoListComponent, InstrumentoInsupdComponent],
})
export class InstanciainstrumentoModule {}
