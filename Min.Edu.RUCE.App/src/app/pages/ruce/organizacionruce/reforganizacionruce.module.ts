import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RefOrganizacionRUCERoutingModule } from "./reforganizacionruce-routing.module";

import { SharedModule } from "@app/shared/shared.module";
import { PageLayoutModule } from "src/@vex/components/page-layout/page-layout.module";
import { BreadcrumbsModule } from "src/@vex/components/breadcrumbs/breadcrumbs.module";
import { SecondaryToolbarModule } from "src/@vex/components/secondary-toolbar/secondary-toolbar.module";
import { OrganizacionRUCEListComponent } from "./Components/form-list/organizacionruce-list.component";
import { OrganizacionRUCEInsupdComponent } from "./Components/form-insupd/organizacionruce-insupd.component";
import { DetallesComponent } from "./Components/detalles/detalles.component";
import { EncabezadoOrganizacionruceComponent } from "./Components/encabezado-organizacionruce/encabezado-organizacionruce.component";
import { MatriculaListComponent } from "../matriculas/Components/form-list/matricula-list/matricula-list.component";
import { MatriculaInsupdComponent } from "../matriculas/Components/form-insupd/matricula-insupd/matricula-insupd.component";
import { AutoridadOrganizacionListComponent } from "../autoridadesorganizacion/Components/autoridad-list/autoridad-list.component";
import { AutoridadesorganizacionModule } from "../autoridadesorganizacion/autoridadesorganizacion.module";
import { MatriculasModule } from "../matriculas/matriculas.module";

// import { VexAioTableModule } from 'vex-aio-table';

@NgModule({
  declarations: [
    OrganizacionRUCEListComponent,
    OrganizacionRUCEInsupdComponent,
    DetallesComponent,
    EncabezadoOrganizacionruceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PageLayoutModule,
    BreadcrumbsModule,
    SecondaryToolbarModule,
    RefOrganizacionRUCERoutingModule,
    AutoridadesorganizacionModule,
    MatriculasModule,
  ],
  providers: [
    //OrganizacionRUCEService,
    //AutoridadOrganizacionRUCEService,
  ],
})
export class RefOrganizacionRUCEModule {}
