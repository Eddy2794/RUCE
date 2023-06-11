import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { AutoridadOrganizacionRUCEService } from './../../Services/AutoridadOrganizacionRUCE/autoridad-organizacionruce.service';
@Component({
  selector: 'app-autoridades-form',
  templateUrl: './insupd.component.html',
  styleUrls: ['./insupd.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class AutoridadInsupdComponent implements OnInit {

  formularioOrganizacionRUCE!: FormGroup;
  id: number = 0;
  public accion: string = '';

  regiones: string[]= ['I','II','III','IV',"V",'VI','VII'];
  niveles: string[]= ['INICIAL','PRIMARIO','SECUNDARIO','SUPERIOR'];

  constructor(
    private fb: FormBuilder,
    private autoridadOrganizacionRUCEService: AutoridadOrganizacionRUCEService,
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
        }
      });
      
      this.createForm();
      this.activatedRoute.params.subscribe((param: any) => {
        this.id = parseInt(param.id);
        if (this.id !== 0) {
          if (this.accion !== 'delete'){this.accion = 'edit'}
          this.autoridadOrganizacionRUCEService.findOne(this.id).subscribe((resp: any) => {
            this.formularioOrganizacionRUCE.patchValue(resp.entities[0]);
          });
        }
      });
    }

  ngOnInit(): void {
    
  }

  createForm() {
    this.formularioOrganizacionRUCE = this.fb.group({
      id: null,
      // cue: [
      //   null, { 
      //     validators: [ Validators.required, ] 
      //   }
      // ],
      // organizacionDesc: [
      //   null, { 
      //     validators: [ Validators.required, ] 
      //   }
      // ],
      // anexo: [
      //   null, { 
      //     validators: [ Validators.required, ] 
      //   }
      // ],
      // nivel: [
      //   null, {
      //     validators: [ Validators.required, ]
      //   }
      // ],
      // region: [
      //   null, { 
      //     validators: [ Validators.required, ] 
      //   }
      // ],
      // departamento: [
      //   null, {
      //     validators: [
      //       Validators.required,
      //       this.validadorServicio.validarSoloLetras(),
      //       this.validadorServicio.validarEspaciosInicioFin()
      //     ]
      //   }
      // ],
      // domicilio: [
      //   null, {
      //     validators: [
      //       Validators.required,
      //       this.validadorServicio.validarCaracteresDescripcion(),
      //       this.validadorServicio.validarEspaciosInicioFin()
      //     ]
      //   }
      // ],
      // localidad: [
      //   null, {
      //     validators: [
      //       Validators.required,
      //       this.validadorServicio.validarSoloLetras(),
      //       this.validadorServicio.validarEspaciosInicioFin()
      //     ]
      //   }
      // ],
      // email: [
      //   null, {
      //     validators: [
      //       // Validators.required,
      //       this.validadorServicio.validarEspaciosInicioFin()
      //     ]
      //   }
      // ],
      // telefono: [
      //   null, { 
      //     validators: [ 
      //       Validators.required,
      //     ] 
      //   }
      // ],
      estaActivo: true,
    },
      {
        //validators: [ this.validadorServicio.validarFechasInicioFin('fechaInicio','fechaFinalizacion')]
      })
    if (this.accion === 'delete') {
      // this.formularioOrganizacionRUCE.controls['cue'].disable();
      // this.formularioOrganizacionRUCE.controls['organizacionDesc'].disable();
      // this.formularioOrganizacionRUCE.controls['anexo'].disable();
      // this.formularioOrganizacionRUCE.controls['nivel'].disable();
      // this.formularioOrganizacionRUCE.controls['region'].disable();
      // this.formularioOrganizacionRUCE.controls['departamento'].disable();
      // this.formularioOrganizacionRUCE.controls['domicilio'].disable();
      // this.formularioOrganizacionRUCE.controls['localidad'].disable();
      // this.formularioOrganizacionRUCE.controls['email'].disable();
      // this.formularioOrganizacionRUCE.controls['telefono'].disable();
    }
  }

  save() {
    if (this.formularioOrganizacionRUCE.invalid) {
      this.formularioOrganizacionRUCE.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioOrganizacionRUCE.removeControl('id');
      this.autoridadOrganizacionRUCEService.create(this.formularioOrganizacionRUCE.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "OrganizacionRUCE Creado", false)
        this.router.navigate(['/pages/establecimientos']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    } else {
      this.autoridadOrganizacionRUCEService.update(this.formularioOrganizacionRUCE.value.id, this.formularioOrganizacionRUCE.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "OrganizacionRUCE Modificado", false)
        this.router.navigate(['/pages/establecimientos']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
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
        this.autoridadOrganizacionRUCEService.delete(this.formularioOrganizacionRUCE.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "OrganizacionRUCE Eliminado", false)
          this.router.navigate(['/pages/establecimientos']);
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
