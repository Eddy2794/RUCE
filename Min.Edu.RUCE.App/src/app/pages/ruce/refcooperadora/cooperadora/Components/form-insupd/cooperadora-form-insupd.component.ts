import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { CooperadoraService } from '../../Services/Cooperadora/cooperadora.service';

@Component({
  selector: 'cooperadora-form-insupd',
  templateUrl: './cooperadora-form-insupd.component.html',
  styleUrls: ['./cooperadora-form-insupd.component.scss']
})
export class CooperadoraFormInsupdComponent implements OnInit {
  formularioCooperadora!: FormGroup;
  id: number = 0;
  public accion: string = '';

  regiones: string[]= ['I','II','III','IV',"V",'VI','VII'];
  niveles: string[]= ['INICIAL','PRIMARIO','SECUNDARIO','SUPERIOR'];

  constructor(
    private fb: FormBuilder,
    private cooperadoraService: CooperadoraService,
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
          this.cooperadoraService.findOne(this.id).subscribe((resp: any) => {
            this.formularioCooperadora.patchValue(resp.entities[0]);
          });
        }
      });
    }

  ngOnInit(): void {
    
  }

  createForm() {
    this.formularioCooperadora = this.fb.group({
      id: null,
      cue: [
        null, { 
          validators: [ Validators.required, ] 
        }
      ],
      organizacionDesc: [
        null, { 
          validators: [ Validators.required, ] 
        }
      ],
      anexo: [
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
      this.formularioCooperadora.controls['cue'].disable();
      this.formularioCooperadora.controls['organizacionDesc'].disable();
      this.formularioCooperadora.controls['anexo'].disable();
      this.formularioCooperadora.controls['nivel'].disable();
      this.formularioCooperadora.controls['region'].disable();
      this.formularioCooperadora.controls['departamento'].disable();
      this.formularioCooperadora.controls['domicilio'].disable();
      this.formularioCooperadora.controls['localidad'].disable();
      this.formularioCooperadora.controls['email'].disable();
      this.formularioCooperadora.controls['telefono'].disable();
    }
  }

  save() {
    if (this.formularioCooperadora.invalid) {
      this.formularioCooperadora.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioCooperadora.removeControl('id');
      this.cooperadoraService.create(this.formularioCooperadora.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Cooperadora Creado", false)
        this.router.navigate(['/pages/refcooperadora']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    } else {
      this.cooperadoraService.update(this.formularioCooperadora.value.id, this.formularioCooperadora.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Cooperadora Modificado", false)
        this.router.navigate(['/pages/refcooperadora']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/refcooperadora']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.cooperadoraService.delete(this.formularioCooperadora.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Cooperadora Eliminado", false)
          this.router.navigate(['/pages/refcooperadora']);
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
