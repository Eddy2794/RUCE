import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { CooperadoraService } from '../../Services/cooperadora.service';
import { ModalSelectOrganizacionComponent } from '@app/components/modal-select-organizacion/modal-select-organizacion.component';
import { IBaseService } from '@app/shared/services/interface/i-base.service';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { RefTipoAsociacionModel } from '@app/pages/ruce/refruce/Model/reftipoasociacion-model';
import { RefTipoAsociacionService } from '@app/pages/ruce/refruce/Services/reftipoasociacion.service';
import { OrganizacionRUCEModel } from '@app/pages/ruce/organizacionruce/Models/organizacionruce-model';
import { OrganizacionRUCEService } from '@app/pages/ruce/organizacionruce/Services/organizacionruce-service.service';

@Component({
  selector: 'cooperadora-form-insupd',
  templateUrl: './cooperadora-form-insupd.component.html',
  styleUrls: ['./cooperadora-form-insupd.component.scss']
})
export class CooperadoraFormInsupdComponent implements OnInit {
  formularioCooperadora!: FormGroup;
  id: number = 0;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};
  tiposAsociaciones = new Array<RefTipoAsociacionModel>;

  public accion: string = '';

  organizaciones: Array<OrganizacionRUCEModel>;

  constructor(
    private fb: FormBuilder,
    private cooperadoraService: CooperadoraService,
    protected organizacionService: OrganizacionRUCEService,
    private refTipoAsociacionService: RefTipoAsociacionService,
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
      
      this.loadRefs();
      this.createForm();
      this.activatedRoute.params.subscribe((param: any) => {
        this.id = parseInt(param.id);
        if (this.id !== 0) {
          if (this.accion !== 'delete'){this.accion = 'edit'}
          this.cooperadoraService.findOne(this.id).subscribe((resp: any) => {
            this.formularioCooperadora.patchValue(resp.entities);
            this.formularioCooperadora.controls.fkRefTipoAsociacion.patchValue(resp.entities.fkRefTipoAsociacion.id);
            this.formularioCooperadora.controls.organizacionDesc.patchValue(resp.entities.fkOrganizacionRUCE.organizacionDesc);
          });
        }
      });
      this.organizaciones = new Array<OrganizacionRUCEModel>();
      this.obtenerOrganizaciones();
    }

  ngOnInit(): void {

    
  }

  loadRefs() {
    this.refTipoAsociacionService.filter(this.filtro).subscribe((data: DataPage<RefTipoAsociacionModel>) => {
      this.tiposAsociaciones = Object.assign([],data.entities,this.tiposAsociaciones);
    })
  }

  obtenerOrganizaciones(){
    this.organizacionService.filter().subscribe((res: any) => {
      res.entities.forEach((org: any) => this.organizaciones.push(Object.assign({}, org, this)));
    });
  }

  createForm() {
    this.formularioCooperadora = this.fb.group({
      id: null,
      fkRefTipoAsociacion:[null, {validators: [Validators.required]}],
      fkOrganizacionRUCE: null,
      cuit: [null, {validators: [Validators.required, Validators.minLength(9), Validators.maxLength(11), this.validadorServicio.validarEspaciosInicioFin() ]}],
      legajo: [null, { validators: [Validators.required, Validators.minLength(3), this.validadorServicio.validarEspaciosInicioFin(), Validators.maxLength(100),] }],
      denominacion: [null, {validators: [Validators.required, Validators.minLength(3), this.validadorServicio.validarCaracteresDescripcion(), this.validadorServicio.validarEspaciosInicioFin(), Validators.max(255), ]}],
      estado: [null, { validators: [ Validators.required, ]}],
      convenioCsEconomicas: false,
      estadoAfip: false,
      estadoRentas: false,
      inscripcionRenacopes: false,
      organizacionDesc: "",
      estaActivo: true,
    },
      {
        //validators: [ this.validadorServicio.validarFechasInicioFin('fechaInicio','fechaFinalizacion')]
      })
    if (this.accion === 'delete' || this.accion === "view") {
      this.formularioCooperadora.disable();
    }
  }

  save() {
    console.log(this.formularioCooperadora);
    if (this.formularioCooperadora.invalid) {
      this.formularioCooperadora.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioCooperadora.removeControl('id');
      this.cooperadoraService.create(this.formularioCooperadora.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Cooperadora Creada", false)
        this.router.navigate(['/pages/cooperadoras']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.cooperadoraService.update(this.formularioCooperadora.value.id, this.formularioCooperadora.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Cooperadora Modificada", false)
        this.router.navigate(['/pages/cooperadoras']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/cooperadoras']);
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
          this.router.navigate(['/pages/cooperadoras']);
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

  openDialogSingle(dataSource: IBaseService<any>, nombreColumnaDesc: string, nombreEntidad: string, label: string) {
    let resp!: any;
    const dialogConfig = new MatDialogConfig();
    const filter: FilterOptions = { estaActivo: true };
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '75em';

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
              organizacionDesc: resp.organizacionDesc != null ? resp.organizacionDesc : '',
              fkOrganizacionRUCE: resp.organizacionDesc != null ? resp.id : 0,
            });
            break;
          default:
            break;
        }
      }
    });

  }

  eliminarOrgPadre() {
    this.formularioCooperadora.controls["organizacionDesc"].setValue(null);
    this.formularioCooperadora.controls["fkOrganizacionRUCE"].setValue(null);
  }
}
