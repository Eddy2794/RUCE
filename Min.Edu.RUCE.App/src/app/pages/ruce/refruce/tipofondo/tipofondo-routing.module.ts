import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TipofondoListComponent } from "./Components/tipofondo-list/tipofondo-list.component";
import { TipofondoInsupdComponent } from "./Components/tipofondo-insupd/tipofondo-insupd.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "listar", component: TipofondoListComponent },
      { path: "add-edit/:id", component: TipofondoInsupdComponent },
      { path: "view/:id", component: TipofondoInsupdComponent },
      { path: "delete/:id", component: TipofondoInsupdComponent },
      { path: "**", redirectTo: "listar" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipofondoRoutingModule {}
