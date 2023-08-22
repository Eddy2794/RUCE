import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { RefCargoModel } from '../../../Model/refcargo-model';
import { RefcargoService } from '../../../Services/refcargo-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';

@Component({
  selector: 'vex-cargo-insupd',
  templateUrl: './cargo-insupd.component.html',
  styleUrls: ['./cargo-insupd.component.scss']
})
export class CargoInsupdComponent implements OnInit {

  formularioCargo!: FormGroup;
  id: number = 0;
  idCooperadora!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  tipoFondo = new Array<RefCargoModel>;

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private cargoService: RefcargoService,
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
        this.cargoService.findOne(this.id).subscribe((resp: any) => {
          this.formularioCargo.patchValue(resp.entities);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioCargo = this.fb.group({
      id: null,
      cargoDesc: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras ]}],
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('fechaRecibido','fechaRendicion')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioCargo.disable();
    }
  }

  save() {
    if (this.formularioCargo.invalid) {
      this.formularioCargo.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioCargo.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioCargo.removeControl('id');
      this.cargoService.create(this.formularioCargo.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Cargo Creado", false)
        this.router.navigate(['/pages/cargos/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.formularioCargo.value.fkTipoFondo = this.formularioCargo.value.fkTipoFondo?.id;
      
      this.cargoService.update(this.formularioCargo.value.id, this.formularioCargo.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Cargo Modificado", false)
        this.router.navigate(['/pages/cargos/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/cargos/listar/']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.cargoService.delete(this.formularioCargo.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Fondo Eliminado", false)
          this.router.navigate(['/pages/cargos/listar/']);
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
