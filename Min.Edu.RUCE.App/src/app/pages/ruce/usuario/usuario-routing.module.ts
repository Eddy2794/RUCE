import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioListComponent } from './Components/usuario-list/usuario-list.component';
import { UsuarioInsupdComponent } from './Components/usuario-insupd/usuario-insupd.component';

const routes: Routes = [
  {
    path: "",
    children: [
      { path: "listar", component: UsuarioListComponent },
      { path: "add-edit/:id", component: UsuarioInsupdComponent },
      { path: "view/:id", component: UsuarioInsupdComponent },
      { path: "delete/:id", component: UsuarioInsupdComponent },
      { path: "**", redirectTo: "listar" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
