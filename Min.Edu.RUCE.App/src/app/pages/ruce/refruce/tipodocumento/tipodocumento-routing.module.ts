import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component:  },
    { path: 'add-edit/:id', component:  },
    { path: 'view/:id', component:  },
    { path: 'delete/:id', component:  },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipodocumentoRoutingModule { }
