import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { OrganizacionRUCEService } from '../../Services/organizacionruce-service.service';

@Component({
  selector: 'app-organizacionruce-form',
  templateUrl: './organizacionruce-insupd.component.html',
  styleUrls: ['./organizacionruce-insupd.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class OrganizacionRUCEInsupdComponent implements OnInit {

  formularioOrganizacionRUCE!: FormGroup;
  id: number = 0;
  public accion: string = '';

  regiones: string[]= ['I','II','III','IV',"V",'VI','VII'];
  niveles: string[]= ['INICIAL','PRIMARIO','SECUNDARIO','SUPERIOR','EDUCACION ESPECIAL','TECNICO PROFESIONAL'];

  constructor(
    private fb: FormBuilder,
    private organizacionRUCEService: OrganizacionRUCEService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private matDialog: MatDialog)
    {
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
          case 'view': {
            this.accion = 'view'
            break;
          }
        }
      });
      
      this.createForm();
      this.activatedRoute.params.subscribe((param: any) => {
        this.id = parseInt(param.id);
        if (this.id !== 0) {
          if (this.accion !== 'delete'){this.accion = 'edit'}
          this.organizacionRUCEService.findOne(this.id).subscribe((resp: any) => {
            this.formularioOrganizacionRUCE.patchValue(resp.entities);
          });
        }
      });
    }

  ngOnInit(): void {
    
  }

  createForm() {
    this.formularioOrganizacionRUCE = this.fb.group({
      id: null,
      cueAnexo: [null, { validators: [ Validators.required, Validators.minLength(9), Validators.maxLength(9) ]}],
      organizacionDesc: [null, {validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(250) ]}],
      nivel: [null, {validators: [ Validators.required, ]}],
      region: [null, {validators: [ Validators.required, ]}],
      departamento: [null, {validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(250), this.validadorServicio.validarCaracteresDescripcion() ]}],
      calle: [null, {validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(250), this.validadorServicio.validarCaracteresDescripcion()]}],
      numero: [null, {validators: [ Validators.maxLength(5) ]}],
      barrio: [null, {validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(250), this.validadorServicio.validarCaracteresDescripcion()]}],
      cp: [null, {validators: [ Validators.minLength(4), Validators.maxLength(8) ]}],
      localidad: [null, {validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(250), this.validadorServicio.validarCaracteresDescripcion()]}],
      email: [null, {validators: [ Validators.email, Validators.minLength(5) ]}],
      telefono: null,
      estaActivo: true,
    },
      {
        //validators: [ this.validadorServicio.validarFechasInicioFin('fechaInicio','fechaFinalizacion')]
      })
    if (this.accion === 'delete' || this.accion === 'view') {
      this.formularioOrganizacionRUCE.disable();
    }
  }

  save() {
    if (this.formularioOrganizacionRUCE.invalid) {
      this.formularioOrganizacionRUCE.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioOrganizacionRUCE.removeControl('id');
      this.organizacionRUCEService.create(this.formularioOrganizacionRUCE.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Institución Creada", false)
        this.router.navigate(['/pages/establecimientos']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.organizacionRUCEService.update(this.formularioOrganizacionRUCE.value.id, this.formularioOrganizacionRUCE.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Institución Modificada", false)
        this.router.navigate(['/pages/establecimientos']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/establecimientos']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.organizacionRUCEService.delete(this.formularioOrganizacionRUCE.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Institución Eliminado", false)
          this.router.navigate(['/pages/establecimientos']);
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
