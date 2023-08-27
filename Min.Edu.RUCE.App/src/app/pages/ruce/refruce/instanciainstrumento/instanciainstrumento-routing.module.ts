import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InstrumentoInsupdComponent } from "./Components/instrumento-insupd/instrumento-insupd.component";
import { InstrumentoListComponent } from "./Components/instrumento-list/instrumento-list.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "listar", component: InstrumentoListComponent },
      { path: "add-edit/:id", component: InstrumentoInsupdComponent },
      { path: "view/:id", component: InstrumentoInsupdComponent },
      { path: "delete/:id", component: InstrumentoInsupdComponent },
      { path: "**", redirectTo: "listar" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstanciainstrumentoRoutingModule {}
