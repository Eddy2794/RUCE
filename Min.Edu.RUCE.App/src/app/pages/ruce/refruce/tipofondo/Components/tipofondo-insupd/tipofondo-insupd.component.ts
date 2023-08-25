import { Component, OnInit } from '@angular/core';
import { FilterOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';
import { RefTipoFondoModel } from '../../../Model/reftipofondo-model';
import { RefTipoFondoService } from '../../../Services/reftipofondo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';

@Component({
  selector: 'vex-tipofondo-insupd',
  templateUrl: './tipofondo-insupd.component.html',
  styleUrls: ['./tipofondo-insupd.component.scss']
})
export class TipofondoInsupdComponent implements OnInit {

  formularioTipoFondo!: FormGroup;
  id: number = 0;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  tipoFondo = new Array<RefTipoFondoModel>;

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private refTipoFondoService: RefTipoFondoService,
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
        this.refTipoFondoService.findOne(this.id).subscribe((resp: any) => {
          this.formularioTipoFondo.patchValue(resp.entities);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioTipoFondo = this.fb.group({
      id: null,
      tipoFondoDesc: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras ]}],
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('fechaRecibido','fechaRendicion')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioTipoFondo.disable();
    }
  }

  save() {
    if (this.formularioTipoFondo.invalid) {
      this.formularioTipoFondo.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioTipoFondo.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioTipoFondo.removeControl('id');
      this.refTipoFondoService.create(this.formularioTipoFondo.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Tipo de Fondo Creado", false)
        this.router.navigate(['/pages/tipo-fondo/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.formularioTipoFondo.value.fkTipoFondo = this.formularioTipoFondo.value.fkTipoFondo?.id;
      
      this.refTipoFondoService.update(this.formularioTipoFondo.value.id, this.formularioTipoFondo.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Tipo Fondo Modificado", false)
        this.router.navigate(['/pages/tipo-fondo/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/tipo-fondo/listar/']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.refTipoFondoService.delete(this.formularioTipoFondo.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Tipo de Fondo Eliminado", false)
          this.router.navigate(['/pages/tipo-fondo/listar/']);
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
