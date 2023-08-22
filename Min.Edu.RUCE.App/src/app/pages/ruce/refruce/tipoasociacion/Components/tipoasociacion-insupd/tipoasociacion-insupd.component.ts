import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { RefTipoAsociacionModel } from '../../../Model/reftipoasociacion-model';
import { RefTipoAsociacionService } from '../../../Services/reftipoasociacion.service';

@Component({
  selector: 'vex-tipoasociacion-insupd',
  templateUrl: './tipoasociacion-insupd.component.html',
  styleUrls: ['./tipoasociacion-insupd.component.scss']
})
export class TipoasociacionInsupdComponent implements OnInit {

  formularioTipoAsociacion!: FormGroup;
  id: number = 0;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  tipoAsociacion = new Array<RefTipoAsociacionModel>;

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private instanciaTipoDocumentoService: RefTipoAsociacionService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
    private matDialog: MatDialog,
  ) {
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
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.instanciaTipoDocumentoService.findOne(this.id).subscribe((resp: any) => {
          this.formularioTipoAsociacion.patchValue(resp.entities);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioTipoAsociacion = this.fb.group({
      id: null,
      tipoAsociacionDesc: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras ]}],
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('fechaRecibido','fechaRendicion')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioTipoAsociacion.disable();
    }
  }

  save() {
    if (this.formularioTipoAsociacion.invalid) {
      this.formularioTipoAsociacion.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioTipoAsociacion.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioTipoAsociacion.removeControl('id');
      this.instanciaTipoDocumentoService.create(this.formularioTipoAsociacion.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Tipo de Asocacion Creado", false)
        this.router.navigate(['/pages/tipo-asociacion/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.formularioTipoAsociacion.value.fkTipoFondo = this.formularioTipoAsociacion.value.fkTipoFondo?.id;
      
      this.instanciaTipoDocumentoService.update(this.formularioTipoAsociacion.value.id, this.formularioTipoAsociacion.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Tipo de Asociacion Modificado", false)
        this.router.navigate(['/pages/tipo-asociacion/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/tipo-asociacion/listar/']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.instanciaTipoDocumentoService.delete(this.formularioTipoAsociacion.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Tipo de Asociacion Eliminado", false)
          this.router.navigate(['/pages/tipo-asociacion/listar/']);
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
