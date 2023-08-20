import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CargoListComponent } from "./Components/cargo-list/cargo-list.component";
import { CargoInsupdComponent } from "./Components/cargo-insupd/cargo-insupd.component";

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "listar", component: CargoListComponent },
      { path: "add-edit/:id", component: CargoInsupdComponent },
      { path: "view/:id", component: CargoInsupdComponent },
      { path: "delete/:id", component: CargoInsupdComponent },
      { path: "**", redirectTo: "listar" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargoRoutingModule {}
