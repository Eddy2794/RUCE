import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PersoneriaListComponent } from "./Components/personeria-list/personeria-list.component";
import { InsupdPersoneriaComponent } from "./Components/insupd-personeria/insupd-personeria.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "listar", component: PersoneriaListComponent },
      { path: "add-edit/:id", component: InsupdPersoneriaComponent },
      { path: "view/:id", component: InsupdPersoneriaComponent },
      { path: "delete/:id", component: InsupdPersoneriaComponent },
      { path: "**", redirectTo: "listar" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersoneriaRoutingModule {}
