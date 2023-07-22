import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReftipocomisionModel } from '@app/pages/ruce/ref-ruce/Model/reftipocomision-model';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { ReftipocomisionService } from '@app/pages/ruce/ref-ruce/Services/reftipocomision.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ComisionService } from '../../../Services/comision.service';

@Component({
  selector: 'vex-insupd-comision',
  templateUrl: './comision-insupd.component.html',
  styleUrls: ['./comision-insupd.component.scss']
})
export class ComisionInsupdComponent implements OnInit {
  formularioComision!: FormGroup;
  id: number = 0;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};
  tipoComision = new Array<ReftipocomisionModel>;

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private comisionService: ComisionService,
    private refTipoComisionService: ReftipocomisionService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private matDialog: MatDialog
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

    this.loadRefs();
    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){this.accion = 'edit'}
        this.comisionService.findOne(this.id).subscribe((resp: any) => {
          this.formularioComision.patchValue(resp.entities);
          this.formularioComision.controls.fkRefTipoComision.patchValue(resp.entities.fkRefTipoComision.id);
          this.formularioComision.controls.organizacionDesc.patchValue(resp.entities.fkOrganizacionRUCE.organizacionDesc);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  loadRefs() {
    this.refTipoComisionService.filter(this.filtro).subscribe((data: DataPage<ReftipocomisionModel>) => {
      this.tipoComision = Object.assign([],data.entities,this.tipoComision);
    })
  }

  createForm() {
    this.formularioComision = this.fb.group({
      id: null,
      fkRefTipoComision:[null, {validators: [Validators.required]}],
      fkCooperadora: null,
      periodoInicio: [null, {validators: [Validators.required]}],
      periodoFin: [null, { validators: [Validators.required]}],
      nroSocios: [null, {validators: [Validators.required, this.validadorServicio.validarEspaciosInicioFin() ]}],
      estadoResolucion: [null, { validators: [ Validators.required, ]}],
      estaActivo: true,
    },
      {
        validators: [ this.validadorServicio.validarFechasInicioFin('periodoInicio','periodoFin')]
      })
    if (this.accion === 'delete' || this.accion === "view") {
      this.formularioComision.disable();
    }
  }

  save() {
    console.log(this.formularioComision);
    if (this.formularioComision.invalid) {
      this.formularioComision.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioComision.removeControl('id');
      this.comisionService.create(this.formularioComision.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Comision Creada", false)
        this.router.navigate(['/pages/cooperadoras']);
      }, err => {
        this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
      }
      );
    } else {
      this.comisionService.update(this.formularioComision.value.id, this.formularioComision.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "COmision Modificada", false)
        this.router.navigate(['/pages/cooperadoras']);
      }, err => {
        this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
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
        this.comisionService.delete(this.formularioComision.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Comision Eliminado", false)
          this.router.navigate(['/pages/cooperadoras']);
        }, err => {
          this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
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
