import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TipodocumentoListComponent } from "./Components/tipodocumento-list/tipodocumento-list.component";
import { TipodocumentoInsupdComponent } from "./Components/tipodocumento-insupd/tipodocumento-insupd.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "listar", component: TipodocumentoListComponent },
      { path: "add-edit/:id", component: TipodocumentoInsupdComponent },
      { path: "view/:id", component: TipodocumentoInsupdComponent },
      { path: "delete/:id", component: TipodocumentoInsupdComponent },
      { path: "**", redirectTo: "listar" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipodocumentoRoutingModule {}
