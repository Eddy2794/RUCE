import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: UntypedFormGroup;

  inputType = 'password';
  visible = false;

  constructor(private router: Router,
              private fb: UntypedFormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private authenticationService:AuthenticationService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember_me : false,
    });
  }

  send() {
    console.log(this.form.value);
    this.authenticationService.login(this.form.value.username, this.form.value.password, this.form.value.remember_me).subscribe(
      response => {
        if (response.succeeded===false){
          this.snackbar.open('Inicio de sesión fallido. Por favor, verifica tus credenciales.', 'OK', { duration: 10000 });
        }
        else{
          // Maneja la respuesta exitosa del inicio de sesión y la navegación
          this.router.navigate(['/pages/inicio']);
          this.snackbar.open('Inicio de sesión exitoso.', 'OK', { duration: 10000 });
        }
      }
    )
}  

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
  
}
