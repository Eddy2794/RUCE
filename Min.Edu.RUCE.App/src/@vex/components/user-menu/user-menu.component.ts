import { Component, OnInit } from '@angular/core';
import { PopoverRef } from '../popover/popover-ref';
import { AuthenticationService } from '@app/_services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(
    private readonly popoverRef: PopoverRef,
    private authenticationService: AuthenticationService,
    private snackbar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }

  close(): void {
    /** Wait for animation to complete and then close */
    setTimeout(() => this.popoverRef.close(), 250);
  }

  send() {
    this.close();
    this.authenticationService.logout();
    this.snackbar.open('Cierre de sesión exitoso.', 'OK', { duration: 10000 });
}
}
