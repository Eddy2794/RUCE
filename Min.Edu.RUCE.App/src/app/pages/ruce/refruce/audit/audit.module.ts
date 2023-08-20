import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { AuditRoutingModule } from "./audit-routing.module";
import { AuditListComponent } from "./Components/audit-list/audit-list.component";

@NgModule({
  declarations: [AuditListComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    AuditRoutingModule,
  ],
  exports: [AuditListComponent],
})
export class AuditModule {}
