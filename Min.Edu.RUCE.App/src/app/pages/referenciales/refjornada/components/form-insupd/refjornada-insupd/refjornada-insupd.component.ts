import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { RefjornadaService } from '../../../services/refjornada.service';

@Component({
  selector: 'app-refjornada-insupd',
  templateUrl: './refjornada-insupd.component.html',
  styleUrls: ['./refjornada-insupd.component.css'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class RefjornadaInsupdComponent implements OnInit {
  
  formularioJornada!: FormGroup;
  id: number = 0;
  public accion: string = '';

  constructor(private fb: FormBuilder,
    private refjornadaService: RefjornadaService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private matDialog: MatDialog) {
    this.activatedRoute.url.subscribe((parameter: any) => {
      this.accion = (parameter[0].path);
      switch (parameter[0].path) {
        case 'delete': {
          this.accion = 'delete'
          break;
        }
        case 'add-edit': {
          this.accion = 'add'
          break;
        }
      }
    });
    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){this.accion = 'edit'}
        this.refjornadaService.findOne(this.id).subscribe((resp: any) => {
          this.formularioJornada.patchValue(resp.entities[0]);
        });
      }
    });


  }

  ngOnInit(): void {
  }
  createForm() {
    this.formularioJornada = this.fb.group({
      id: null,
      jornadaDesc: [null, { validators: [Validators.required, Validators.minLength(3), this.validadorServicio.validarCaracteresDescripcion(), Validators.maxLength(20),this.validadorServicio.validarEspaciosInicioFin()] }],
      nemotecnico: [null, { validators: [Validators.required, Validators.minLength(1), this.validadorServicio.nemotecnico(), Validators.maxLength(2)] }],
      estaActivo: true,
    },
      {
        //validators: [ this.validadorServicio.validarFechasInicioFin('fechaInicio','fechaFinalizacion')]
      })
    if (this.accion === 'delete') {
      this.formularioJornada.controls['jornadaDesc'].disable();
      this.formularioJornada.controls['nemotecnico'].disable();
    }
  }
  save() {
    if (this.formularioJornada.invalid) {
      this.formularioJornada.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioJornada.removeControl('id');
      this.refjornadaService.create(this.formularioJornada.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Jornada Creada", false)
        this.router.navigate(['/pages/refjornada']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.refjornadaService.update(this.formularioJornada.value.id, this.formularioJornada.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Jornada Modificada", false)
        this.router.navigate(['/pages/refjornada']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/refjornada']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.refjornadaService.delete(this.formularioJornada.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Jornada Eliminada", false)
          this.router.navigate(['/pages/refjornada']);
        }, err => {
          this.mostrarDialogMsj("Atención", err.error.message, false)
        }
        );
      }
    })
  }

  mostrarDialogMsj(titulo: string, msj: string, cancelVisible: boolean) {
    let datos: DialogData = { titulo, msj, cancelVisible }
    this.matDialog.open(DialogComponent, {
      width: '200px',
      data: datos
    });
  }

  obtenerError() {
    var campo = this.formularioJornada.get('jornadaDesc');
    if (campo?.hasError('errorCaracteres')) {
      return campo.getError('errorCaracteres').mensaje;
    }
    var campo2 = this.formularioJornada.get('nemotecnico');
    if (campo2?.hasError('errorCaracteres')) {
      return campo2.getError('errorCaracteres').mensaje;
    }
    return '';
  }

}
