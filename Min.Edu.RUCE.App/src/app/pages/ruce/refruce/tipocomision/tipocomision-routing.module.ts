import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TipocomisionListComponent } from "./Components/tipocomision-list/tipocomision-list.component";
import { TipocomisionInsupdComponent } from "./Components/tipocomision-insupd/tipocomision-insupd.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "listar", component: TipocomisionListComponent },
      { path: "add-edit/:id", component: TipocomisionInsupdComponent },
      { path: "view/:id", component: TipocomisionInsupdComponent },
      { path: "delete/:id", component: TipocomisionInsupdComponent },
      { path: "**", redirectTo: "listar" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipocomisionRoutingModule {}
