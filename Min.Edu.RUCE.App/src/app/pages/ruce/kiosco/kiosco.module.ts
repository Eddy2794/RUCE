import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { KioscoRoutingModule } from "./kiosco-routing.module";
import { KioscoInsupdComponent } from "./Components/kiosco-insupd/kiosco-insupd.component";
import { KioscoListComponent } from "./Components/kiosco-list/kiosco-list.component";
import { EncabezadoKioscoComponent } from "./Components/encabezado-kiosco/encabezado-kiosco.component";

@NgModule({
  declarations: [
    KioscoInsupdComponent,
    KioscoListComponent,
    EncabezadoKioscoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    KioscoRoutingModule,
  ],
  exports: [KioscoInsupdComponent, KioscoListComponent, EncabezadoKioscoComponent,],
})
export class KioscoModule {}
