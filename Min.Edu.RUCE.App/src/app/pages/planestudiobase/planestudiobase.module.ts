import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { BreadcrumbsModule } from 'src/@vex/components/breadcrumbs/breadcrumbs.module';
import { PageLayoutModule } from 'src/@vex/components/page-layout/page-layout.module';
import { SecondaryToolbarModule } from 'src/@vex/components/secondary-toolbar/secondary-toolbar.module';

import { PlanestudiobaseRoutingModule } from './planestudiobase-routing.module';
import { PlanestudiobaseListComponent } from './components/form-list/planestudiobase-list.component';



@NgModule({
    declarations: [
        PlanestudiobaseListComponent,
    ],
    imports: [
        CommonModule,
        PlanestudiobaseRoutingModule,
        SharedModule,
        PageLayoutModule,
        BreadcrumbsModule,
        SecondaryToolbarModule,
    ]
})
export class PlanestudiobaseModule { }
