import { OrganizacionRUCEService } from '../../../../reforganizacionruce/organizacion/Services/OrganizacionRUCE/organizacionruce-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { CooperadoraService } from '../../Services/Cooperadora/cooperadora.service';
import { OrganizacionRUCEModel } from '@app/pages/ruce/reforganizacionruce/organizacion/Models/OrganizacionRUCE/organizacionruce-model';
import { ModalSelectOrganizacionComponent } from '@app/components/modal-select-organizacion/modal-select-organizacion.component';
import { IBaseService } from '@app/shared/services/interface/i-base.service';
import { FilterOptions } from '@app/shared/utils';

@Component({
  selector: 'cooperadora-form-insupd',
  templateUrl: './cooperadora-form-insupd.component.html',
  styleUrls: ['./cooperadora-form-insupd.component.scss']
})
export class CooperadoraFormInsupdComponent implements OnInit {
  formularioCooperadora!: FormGroup;
  id: number = 0;
  public accion: string = '';

  organizaciones: Array<OrganizacionRUCEModel>;

  constructor(
    private fb: FormBuilder,
    private cooperadoraService: CooperadoraService,
    protected organizacionService: OrganizacionRUCEService,
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
      this.organizaciones = new Array<OrganizacionRUCEModel>();
      this.obtenerOrganizaciones();
    }

  ngOnInit(): void {

    
  }

  obtenerOrganizaciones(){
    this.organizacionService.filter().subscribe((res: any) => {
      res.entities.forEach((org: any) => this.organizaciones.push(Object.assign({}, org, this)));
    });
  }

  createForm() {
    this.formularioCooperadora = this.fb.group({
      id: null,
      denominacion: [
        null, { 
          validators: [
            Validators.required, 
            this.validadorServicio.validarSoloLetras(),
            this.validadorServicio.validarEspaciosInicioFin()
          ] 
        }
      ],
      estado: [
        null, { 
          validators: [ Validators.required, ] 
        }
      ],
      legajo: [
        null, { 
          validators: [
            Validators.required,
            this.validadorServicio.validarEspaciosInicioFin()
          ] 
        }
      ],
      decreto: [
        null, { 
          validators: [
            Validators.required, 
            this.validadorServicio.validarSoloLetras(),
            this.validadorServicio.validarEspaciosInicioFin()
          ] 
        }
      ],
      convenioScEconomicas: [
        null, {
          validators: [ Validators.required, ]
        }
      ],
      inscripcion_afip: [
        null, { 
          validators: [ Validators.required, ] 
        }
      ],
      inscripcion_rentas: [
        null, {
          validators: [ Validators.required, ]
        }
      ],
      inscripcion_renacopes: [
        null, {
          validators: [ Validators.required, ]
        }
      ],
      organizacion_ruce: [
        null, {
          validators: [ Validators.required, ]
        }
      ],
      estaActivo: true,
    },
      {
        //validators: [ this.validadorServicio.validarFechasInicioFin('fechaInicio','fechaFinalizacion')]
      })
    if (this.accion === 'delete') {
      this.formularioCooperadora.controls['denominacion'].disable();
      this.formularioCooperadora.controls['legajo'].disable();
      this.formularioCooperadora.controls['decreto'].disable();
      this.formularioCooperadora.controls['convenioScEconomicas'].disable();
      this.formularioCooperadora.controls['inscripcion_afip'].disable();
      this.formularioCooperadora.controls['inscripcion_rentas'].disable();
      this.formularioCooperadora.controls['inscripcion_renacopes'].disable();
      this.formularioCooperadora.controls['organizacion_ruce'].disable();
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
        this.mostrarDialogMsj("Mensaje", "Cooperadora Creada", false)
        this.router.navigate(['/pages/refcooperadora']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    } else {
      this.cooperadoraService.update(this.formularioCooperadora.value.id, this.formularioCooperadora.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Cooperadora Modificada", false)
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

  openDialogSingle(dataSource: IBaseService<any>, nombreColumnaDesc: string, nombreEntidad: string, label: string) {
    let resp!: any;
    const dialogConfig = new MatDialogConfig();
    const filter: FilterOptions = { estaActivo: true };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '750px';

    dialogConfig.data = {
      dataSource,
      nombreColumnaDesc,
      nombreEntidad,
      label,
      filter
    }
    const dialogRef = this.matDialog.open(ModalSelectOrganizacionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta != undefined) {
        resp = respuesta;
        switch (nombreEntidad) {
          case 'Organizacion':
            this.formularioCooperadora.patchValue({
              organismoPadre: resp.organizacionDesc != null ? resp.organizacionDesc : '',
              idOrganizacionPadre: resp.organizacionDesc != null ? resp.id : 0,
            });
            break;
          case 'RefTipoOrganizacion':
            this.formularioCooperadora.patchValue({
              tipoOrganizacionDesc: resp.tipoOrganizacionDesc != null ? resp.tipoOrganizacionDesc : '',
              idRefTipoOrganizacion: resp.tipoOrganizacionDesc != null ? resp.id : 0,
              esEducativa: resp.esEducativa,
            });
            break;
          default:
            break;
        }
      }
    });

  }

  eliminarTipoOrg() {
    this.formularioCooperadora.controls["tipoOrganizacionDesc"].setValue(null);
    this.formularioCooperadora.controls["idRefTipoOrganizacion"].setValue(null);
  }

  eliminarOrgPadre() {
    this.formularioCooperadora.controls["organismoPadre"].setValue(null);
    this.formularioCooperadora.controls["idOrganizacionPadre"].setValue(null);
  }
}
