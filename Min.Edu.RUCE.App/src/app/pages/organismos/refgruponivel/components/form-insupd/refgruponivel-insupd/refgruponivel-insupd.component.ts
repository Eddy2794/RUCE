import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { RefGrupoNivelService } from '../../../services/refgruponivel.service';

@Component({
  selector: 'app-refgruponivel-insupd',
  templateUrl: './refgruponivel-insupd.component.html',
  styleUrls: ['./refgruponivel-insupd.component.css'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class RefgruponivelInsupdComponent implements OnInit {
  
  formularioGrupoNivel!: FormGroup;
  id: number = 0;
  public accion: string = '';

  constructor(private fb: FormBuilder,
    private refGrupoNivelService: RefGrupoNivelService,
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
        this.refGrupoNivelService.findOne(this.id).subscribe((resp: any) => {
          this.formularioGrupoNivel.patchValue(resp.entities[0]);
        });
      }
    });


  }

  ngOnInit(): void {
  }
  createForm() {
    this.formularioGrupoNivel = this.fb.group({
      id: null,
      grupoDesc: [null, { validators: [Validators.required, Validators.minLength(3), this.validadorServicio.validarCaracteresDescripcion(), Validators.maxLength(50),this.validadorServicio.validarEspaciosInicioFin()] }],
      estaActivo: true,
    },
      {
        //validators: [ this.validadorServicio.validarFechasInicioFin('fechaInicio','fechaFinalizacion')]
      })
    if (this.accion === 'delete') {
      this.formularioGrupoNivel.controls['grupoDesc'].disable();
    }
  }
  save() {
    if (this.formularioGrupoNivel.invalid) {
      this.formularioGrupoNivel.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioGrupoNivel.removeControl('id');
      this.refGrupoNivelService.create(this.formularioGrupoNivel.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Grupo Nivel Creado", false)
        this.router.navigate(['/pages/refgruponivel']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    } else {
      this.refGrupoNivelService.update(this.formularioGrupoNivel.value.id, this.formularioGrupoNivel.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Grupo Nivel Modificado", false)
        this.router.navigate(['/pages/refgruponivel']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/refgruponivel']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.refGrupoNivelService.delete(this.formularioGrupoNivel.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Grupo Nivel Eliminado", false)
          this.router.navigate(['/pages/refgruponivel']);
        }, err => {
          this.mostrarDialogMsj("Atención", err.error.errors, false)
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
}
