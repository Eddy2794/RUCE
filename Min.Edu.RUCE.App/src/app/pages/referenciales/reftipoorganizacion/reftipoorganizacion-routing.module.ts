import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReftiporganizacionInsupdComponent } from "./components/form-insupd/reftiporganizacion-insupd.component";
import { ReftiporganizacionListComponent } from "./components/form-list/reftiporganizacion-list.component";


const routes: Routes = [  
    {
      path: '',
      children: [
        { path: 'listar', component: ReftiporganizacionListComponent },
        { path: 'add-edit/:id', component: ReftiporganizacionInsupdComponent },
        { path: 'delete/:id', component: ReftiporganizacionInsupdComponent },
        { path: '**', redirectTo: 'listar'}
      ]
    }
  ];

@NgModule({
     imports: [RouterModule.forChild(routes)],
     exports: [RouterModule]
   })
   export class RefTipoOrganizacionRoutingModule{}