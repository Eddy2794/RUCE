import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger80ms } from 'src/@vex/animations/stagger.animation';

@Component({
  selector: 'vex-wizard-ejemplo',
  templateUrl: './wizard-ejemplo.component.html',
  styleUrls: ['./wizard-ejemplo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    stagger80ms,
    fadeInUp400ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class WizardEjemploComponent implements OnInit {

  
  accountFormGroup: UntypedFormGroup;
  passwordFormGroup: UntypedFormGroup;
  confirmFormGroup: UntypedFormGroup;

  verticalAccountFormGroup: UntypedFormGroup;
  verticalPasswordFormGroup: UntypedFormGroup;
  verticalConfirmFormGroup: UntypedFormGroup;

  phonePrefixOptions = ['+1', '+27', '+44', '+49', '+61', '+91'];

  passwordInputType = 'password';

  constructor(private fb: UntypedFormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    /**
     * Horizontal Stepper
     * @type {FormGroup}
     */
    this.accountFormGroup = this.fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phonePrefix: [this.phonePrefixOptions[3]],
      phone: [],
    });

    this.passwordFormGroup = this.fb.group({
      password: [
        null,
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(6)
          ]
        )
      ],
      passwordConfirm: [null, Validators.required]
    });

    this.confirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue]
    });

    /**
     * Vertical Stepper
     * @type {FormGroup}
     */
    this.verticalAccountFormGroup = this.fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phonePrefix: [this.phonePrefixOptions[3]],
      phone: [],
    });

    this.verticalPasswordFormGroup = this.fb.group({
      password: [
        null,
        Validators.compose(
          [
            Validators.required,
            Validators.minLength(6)
          ]
        )
      ],
      passwordConfirm: [null, Validators.required]
    });

    this.verticalConfirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue]
    });
  }

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  submit() {
    this.snackbar.open('Hooray! You successfully created your account.', null, {
      duration: 5000
    });
  }




}
