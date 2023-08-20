import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@app/shared/shared.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";

import { BalancesRoutingModule } from "./balances-routing.module";
import { BalanceListComponent } from "./Components/balance-list/balance-list.component";
import { BalanceInsupdComponent } from "./Components/balance-insupd/balance-insupd.component";

@NgModule({
  declarations: [BalanceInsupdComponent, BalanceListComponent],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    BalancesRoutingModule,
  ],
  exports: [BalanceListComponent, BalanceInsupdComponent],
})
export class BalancesModule {}
