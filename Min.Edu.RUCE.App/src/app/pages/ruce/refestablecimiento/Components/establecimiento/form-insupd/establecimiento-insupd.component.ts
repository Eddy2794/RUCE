import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/pages/organismos/shared/validators/validator.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { EstablecimientoService } from '../../../Services/Establecimiento/establecimiento-service.service';

@Component({
  selector: 'app-establecimiento',
  templateUrl: './establecimiento-insupd.component.html',
  styleUrls: ['./establecimiento-insupd.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class EstablecimientoInsupdComponent implements OnInit {

  formularioEstablecimiento!: FormGroup;
  id: number = 0;
  public accion: string = '';

  regiones: string[]= ['I','II','III','IV',"V",'VI','VII'];
  niveles: string[]= ['INICIAL','PRIMARIO','SECUNDARIO','SUPERIOR'];

  constructor(
    private fb: FormBuilder,
    private establecimientoService: EstablecimientoService,
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
          this.establecimientoService.findOne(this.id).subscribe((resp: any) => {
            this.formularioEstablecimiento.patchValue(resp.entities[0]);
          });
        }
      });
    }

  ngOnInit(): void {
    
  }

  createForm() {
    this.formularioEstablecimiento = this.fb.group({
      id: null,
      cue: [
        null, { 
          validators: [ Validators.required, ] 
        }
      ],
      matricula: [
        null, { 
          validators: [ Validators.required, ] 
        }
      ],
      nivel: [
        null, {
          validators: [ Validators.required, ]
        }
      ],
      region: [
        null, { 
          validators: [ Validators.required, ] 
        }
      ],
      departamento: [
        null, {
          validators: [
            Validators.required,
            this.validadorServicio.validarSoloLetras(),
            this.validadorServicio.validarEspaciosInicioFin()
          ]
        }
      ],
      domicilio: [
        null, {
          validators: [
            Validators.required,
            this.validadorServicio.validarCaracteresDescripcion(),
            this.validadorServicio.validarEspaciosInicioFin()
          ]
        }
      ],
      localidad: [
        null, {
          validators: [
            Validators.required,
            this.validadorServicio.validarSoloLetras(),
            this.validadorServicio.validarEspaciosInicioFin()
          ]
        }
      ],
      email: [
        null, {
          validators: [
            // Validators.required,
            this.validadorServicio.validarEspaciosInicioFin()
          ]
        }
      ],
      telefono: [
        null, { 
          validators: [ 
            Validators.required,
          ] 
        }
      ],
      estaActivo: true,
    },
      {
        //validators: [ this.validadorServicio.validarFechasInicioFin('fechaInicio','fechaFinalizacion')]
      })
    if (this.accion === 'delete') {
      this.formularioEstablecimiento.controls['cue'].disable();
      this.formularioEstablecimiento.controls['matricula'].disable();
      this.formularioEstablecimiento.controls['nivel'].disable();
      this.formularioEstablecimiento.controls['region'].disable();
      this.formularioEstablecimiento.controls['departamento'].disable();
      this.formularioEstablecimiento.controls['domicilio'].disable();
      this.formularioEstablecimiento.controls['localidad'].disable();
      this.formularioEstablecimiento.controls['email'].disable();
      this.formularioEstablecimiento.controls['telefono'].disable();
    }
  }

  save() {
    if (this.formularioEstablecimiento.invalid) {
      this.formularioEstablecimiento.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioEstablecimiento.removeControl('id');
      this.establecimientoService.create(this.formularioEstablecimiento.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Establecimiento Creado", false)
        this.router.navigate(['/pages/refestablecimiento']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    } else {
      this.establecimientoService.update(this.formularioEstablecimiento.value.id, this.formularioEstablecimiento.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Establecimiento Modificado", false)
        this.router.navigate(['/pages/refestablecimiento']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/refestablecimiento']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.establecimientoService.delete(this.formularioEstablecimiento.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Establecimiento Eliminado", false)
          this.router.navigate(['/pages/refestablecimiento']);
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
