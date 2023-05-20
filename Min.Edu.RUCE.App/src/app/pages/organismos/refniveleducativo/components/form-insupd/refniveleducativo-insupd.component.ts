import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { RefGrupoNivelModel } from '@app/pages/organismos/refgruponivel/model/refgruponivel.model';
import { RefGrupoNivelService } from '@app/pages/organismos/refgruponivel/services/refgruponivel.service';
import { FilterOptions } from '@app/pages/organismos/shared/utils';
import { ValidatorService } from '@app/pages/organismos/shared/validators/validator.service';
import { RefNivelEducativoService } from '@app/pages/organismos/refniveleducativo/services/refniveleducativo.service';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

@Component({
  selector: 'app-refniveleducativo-insupd',
  templateUrl: './refniveleducativo-insupd.component.html',
  styleUrls: ['./refniveleducativo-insupd.component.css'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class RefNivelEducativoInsupdComponent implements OnInit {
  formularioNivelEducativo!: FormGroup;
  id: number = 0;
  accion: string = '';
  refGrupoNivel: RefGrupoNivelModel[] = [];

  constructor(
    private fb: FormBuilder,
    private nivelEducativoService: RefNivelEducativoService,
    private refGrupoNivelService: RefGrupoNivelService,
    private validadorServicio: ValidatorService,
    private activatedRuote: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog) {
    this.activatedRuote.url.subscribe((parameter: any) => {
      this.accion = (parameter[0].path);
    });
    this.createForm();
    this.activatedRuote.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      if (this.id !== 0) {
        this.nivelEducativoService.findOne(this.id).subscribe((resp: any) => {
          this.formularioNivelEducativo.patchValue(resp.entities[0]);
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadGruposNivel();
  }
  createForm() {
    this.formularioNivelEducativo = this.fb.group({
      id: null,
      nivelEducativoDesc: [null, { validators: [Validators.required, this.validadorServicio.validarSoloLetras(),this.validadorServicio.validarEspaciosInicioFin()] }],
      idRefGrupoNivel: [null, { validators: [Validators.required] }],
      estaActivo: true,
    },
      {
        //validators: [ this.validadorServicio.validarFechasInicioFin('fechaInicio','fechaFinalizacion')]
      })
    if (this.accion === 'delete') {
      this.formularioNivelEducativo.controls['nivelEducativoDesc'].disable();
      this.formularioNivelEducativo.controls['idRefGrupoNivel'].disable();
    }
  }
  save() {
    if (this.formularioNivelEducativo.invalid) {
      this.formularioNivelEducativo.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioNivelEducativo.removeControl('id');
      this.nivelEducativoService.create(this.formularioNivelEducativo.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Nivel Educativo Creado", false)
        this.router.navigate(['/pages/refniveleducativo']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      });
    } else {
      this.nivelEducativoService.update(this.formularioNivelEducativo.value.id, this.formularioNivelEducativo.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Nivel Educativo Modificado", false)
        this.router.navigate(['/pages/refniveleducativo']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      });
    }

  }
  cancel() {
    this.router.navigate(['/pages/refniveleducativo']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.nivelEducativoService.delete(this.formularioNivelEducativo.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Nivel Educativo Eliminado", false)
          this.router.navigate(['/pages/refniveleducativo']);
        }, err => {
          this.mostrarDialogMsj("Atención", err.error.errors, false)
        });
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

  loadGruposNivel() {
    const filtroGrupoNivel: FilterOptions = { estaActivo: true }
    this.refGrupoNivelService.filter(filtroGrupoNivel).subscribe((resp: any) => {
      this.refGrupoNivel = resp.entities || [];
    });
  }



}
