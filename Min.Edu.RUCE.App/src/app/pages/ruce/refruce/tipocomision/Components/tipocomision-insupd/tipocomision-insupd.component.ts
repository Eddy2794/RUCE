import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ReftipocomisionModel } from '../../../Model/reftipocomision-model';
import { ReftipocomisionService } from '../../../Services/reftipocomision.service';

@Component({
  selector: 'vex-tipocomision-insupd',
  templateUrl: './tipocomision-insupd.component.html',
  styleUrls: ['./tipocomision-insupd.component.scss']
})
export class TipocomisionInsupdComponent implements OnInit {

  formularioTipoComision!: FormGroup;
  id: number = 0;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  tipoComision = new Array<ReftipocomisionModel>;

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private tipocomisionService: ReftipocomisionService,
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
        this.tipocomisionService.findOne(this.id).subscribe((resp: any) => {
          this.formularioTipoComision.patchValue(resp.entities);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioTipoComision = this.fb.group({
      id: null,
      tipoComisionDesc: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras ]}],
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('fechaRecibido','fechaRendicion')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioTipoComision.disable();
    }
  }

  save() {
    if (this.formularioTipoComision.invalid) {
      this.formularioTipoComision.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioTipoComision.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioTipoComision.removeControl('id');
      this.tipocomisionService.create(this.formularioTipoComision.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Tipo Comision Creado", false)
        this.router.navigate(['/pages/tipo-comision/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.formularioTipoComision.value.fkTipoFondo = this.formularioTipoComision.value.fkTipoFondo?.id;
      
      this.tipocomisionService.update(this.formularioTipoComision.value.id, this.formularioTipoComision.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Tipo Comision Modificado", false)
        this.router.navigate(['/pages/tipo-comision/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/tipo-comision/listar/']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.tipocomisionService.delete(this.formularioTipoComision.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Tipo Comision Eliminado", false)
          this.router.navigate(['/pages/tipo-comision/listar/']);
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
