import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefcategoriaorganizacionListComponent } from './components/form-list/refcategoriaorganizacion-list/refcategoriaorganizacion-list.component';
import { RefcategoriaorganizacionInsupdComponent } from './components/form-insupd/refcategoriaorganizacion-insupd/refcategoriaorganizacion-insupd.component';
import { SharedModule } from '@app/shared/shared.module';
import { RefcategoriaorganizacionRoutingModule } from './refcategoriaorganizacion-routing.module';
import { BreadcrumbsModule } from "../../../../@vex/components/breadcrumbs/breadcrumbs.module";
import { SecondaryToolbarModule } from "../../../../@vex/components/secondary-toolbar/secondary-toolbar.module";



@NgModule({
    declarations: [
        RefcategoriaorganizacionInsupdComponent,
        RefcategoriaorganizacionListComponent
    ],
    imports: [
        CommonModule,
        RefcategoriaorganizacionRoutingModule,
        SharedModule,
        BreadcrumbsModule,
        SecondaryToolbarModule
    ]
})
export class RefcategoriaorganizacionModule { }
