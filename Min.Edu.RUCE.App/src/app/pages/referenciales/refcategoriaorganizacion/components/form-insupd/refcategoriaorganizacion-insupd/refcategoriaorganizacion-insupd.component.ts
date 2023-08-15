import { ValidatorService } from '@app/shared/validators/validator.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { RefcategoriaorganizacionService } from '../../../services/refcategoriaorganizacion.service';

@Component({
  selector: 'app-refcategoriaorganizacion-insupd',
  templateUrl: './refcategoriaorganizacion-insupd.component.html',
  styleUrls: ['./refcategoriaorganizacion-insupd.component.css'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class RefcategoriaorganizacionInsupdComponent implements OnInit {
  formularioCategoriaOrganizacion!: FormGroup;
  id: number = 0;
  public accion: string = '';

  constructor(private fb: FormBuilder,
    private refcategoriaorganizacionService: RefcategoriaorganizacionService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio : ValidatorService,
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
        this.refcategoriaorganizacionService.findOne(this.id).subscribe((resp: any) => {
          this.formularioCategoriaOrganizacion.patchValue(resp.entities[0]);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioCategoriaOrganizacion = this.fb.group({
      id: null,
      categoriaOrganizacionDesc: [null, { validators: [Validators.required, Validators.minLength(3), this.validadorServicio.validarCaracteresDescripcion() ,Validators.maxLength(60),this.validadorServicio.validarEspaciosInicioFin()]}],
      estaActivo: true,
    },
      {
        //validators: [ this.validadorServicio.validarFechasInicioFin('fechaInicio','fechaFinalizacion')]
      })
    if (this.accion === 'delete') {
      this.formularioCategoriaOrganizacion.controls['categoriaOrganizacionDesc'].disable();
    }
  }

  save() {
    if (this.formularioCategoriaOrganizacion.invalid) {
      this.formularioCategoriaOrganizacion.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioCategoriaOrganizacion.removeControl('id');
      this.refcategoriaorganizacionService.create(this.formularioCategoriaOrganizacion.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Categoria Organizacion Creada", false)
        this.router.navigate(['/pages/refcategoriaorganizacion']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.refcategoriaorganizacionService.update(this.formularioCategoriaOrganizacion.value.id,this.formularioCategoriaOrganizacion.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Categoria Organizacion Modificada", false)
        this.router.navigate(['/pages/refcategoriaorganizacion']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }

  cancel() {
    this.router.navigate(['/pages/refcategoriaorganizacion']);
  }

  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.refcategoriaorganizacionService.delete(this.formularioCategoriaOrganizacion.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Categoria Organizacion Eliminada", false)
          this.router.navigate(['/pages/refcategoriaorganizacion']);
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

  }
