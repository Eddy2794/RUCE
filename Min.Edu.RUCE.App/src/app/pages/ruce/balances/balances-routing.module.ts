import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceListComponent } from './Components/balance-list/balance-list.component';
import { BalanceInsupdComponent } from './Components/balance-insupd/balance-insupd.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'listar', component: BalanceListComponent },
    { path: 'add-edit/:id', component: BalanceInsupdComponent },
    { path: 'view/:id', component: BalanceInsupdComponent },
    { path: 'delete/:id', component: BalanceInsupdComponent },
    { path: '**', redirectTo: 'listar' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BalancesRoutingModule { }
