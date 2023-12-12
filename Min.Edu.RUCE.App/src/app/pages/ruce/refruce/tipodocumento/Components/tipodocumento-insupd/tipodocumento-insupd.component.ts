import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { RefTipoDocumentoModel } from '../../../Model/reftipodocumento-model';
import { RefTipoDocumentoService } from '../../../Services/reftipodocumento.service';


@Component({
  selector: 'vex-tipodocumento-insupd',
  templateUrl: './tipodocumento-insupd.component.html',
  styleUrls: ['./tipodocumento-insupd.component.scss']
})
export class TipodocumentoInsupdComponent implements OnInit {

  formularioTipoDocumento!: FormGroup;
  id: number = 0;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  tipoDocumento = new Array<RefTipoDocumentoModel>;

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private tipoDocumentoService: RefTipoDocumentoService,
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
        this.tipoDocumentoService.findOne(this.id).subscribe((resp: any) => {
          this.formularioTipoDocumento.patchValue(resp.entities);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioTipoDocumento = this.fb.group({
      id: null,
      tipoDocumentoDesc: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras ]}],
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('fechaRecibido','fechaRendicion')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioTipoDocumento.disable();
    }
  }

  save() {
    if (this.formularioTipoDocumento.invalid) {
      this.formularioTipoDocumento.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioTipoDocumento.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioTipoDocumento.removeControl('id');
      this.tipoDocumentoService.create(this.formularioTipoDocumento.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Tipo de Documento Creado", false)
        this.router.navigate(['/pages/tipo-documento/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.message, false)
      }
      );
    } else {
      this.formularioTipoDocumento.value.fkTipoFondo = this.formularioTipoDocumento.value.fkTipoFondo?.id;
      
      this.tipoDocumentoService.update(this.formularioTipoDocumento.value.id, this.formularioTipoDocumento.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Tipo Documento Modificado", false)
        this.router.navigate(['/pages/tipo-documento/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/tipo-documento/listar/']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.tipoDocumentoService.delete(this.formularioTipoDocumento.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Tipo de Documento Eliminado", false)
          this.router.navigate(['/pages/tipo-documento/listar/']);
        }, err => {
          this.mostrarDialogMsj("Atención", err.message, false)
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
