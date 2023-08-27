import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { TipodocumentoRoutingModule } from "./tipodocumento-routing.module";
import { TipodocumentoListComponent } from "./Components/tipodocumento-list/tipodocumento-list.component";
import { TipodocumentoInsupdComponent } from "./Components/tipodocumento-insupd/tipodocumento-insupd.component";

@NgModule({
  declarations: [TipodocumentoListComponent, TipodocumentoInsupdComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    TipodocumentoRoutingModule,
  ],
  exports: [TipodocumentoListComponent, TipodocumentoInsupdComponent],
})
export class TipoDocumentoModule {}
