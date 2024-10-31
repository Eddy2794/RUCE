import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesListComponent } from './Components/reportes-list/reportes-list.component';
import { ReportesGeneratorComponent } from './Components/reportes-generator/reportes-generator.component';
import { PageLayoutModule } from "../../../../@vex/components/page-layout/page-layout.module";
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
    declarations: [
        ReportesListComponent,
        ReportesGeneratorComponent
    ],
    imports: [
        CommonModule,
        ReportesRoutingModule,
        PageLayoutModule,
        SharedModule
    ]
})
export class ReportesModule { }
