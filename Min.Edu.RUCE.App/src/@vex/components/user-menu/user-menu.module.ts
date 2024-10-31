import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserMenuComponent } from './user-menu.component';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    UserMenuComponent
  ],
  imports: [
    CommonModule,

    MatRippleModule,
    RouterModule,
    MatIconModule,
    
    MatSnackBarModule
  ]
})
export class UserMenuModule {
}
