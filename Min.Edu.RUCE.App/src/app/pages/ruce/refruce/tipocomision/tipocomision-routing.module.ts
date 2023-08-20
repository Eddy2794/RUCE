import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TipoasociacionListComponent } from "../tipoasociacion/Components/tipoasociacion-list/tipoasociacion-list.component";
import { TipoasociacionInsupdComponent } from "../tipoasociacion/Components/tipoasociacion-insupd/tipoasociacion-insupd.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "listar", component: TipoasociacionListComponent },
      { path: "add-edit/:id", component: TipoasociacionInsupdComponent },
      { path: "view/:id", component: TipoasociacionInsupdComponent },
      { path: "delete/:id", component: TipoasociacionInsupdComponent },
      { path: "**", redirectTo: "listar" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipocomisionRoutingModule {}
