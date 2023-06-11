import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RefjornadaService } from '@app/pages/referenciales/refjornada/services/refjornada.service';
import { RefJornadaModel } from '../../../../referenciales/refjornada/model/refjornada.model';
import { CargosalarialService } from '../../../services/cargosalarial.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { FilterOptions } from '@app/shared/utils';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

@Component({
  selector: 'vex-cargosalarial-insupd',
  templateUrl: './cargosalarial-insupd.component.html',
  styleUrls: ['./cargosalarial-insupd.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class CargosalarialInsupdComponent implements OnInit {
  formCargoSalarial!: FormGroup;
  id: number = 0;
  accion: string = '';
  refJornada: RefJornadaModel[] = [];

  constructor(
    private fb: FormBuilder,
    private cargosalarialService: CargosalarialService,
    private refjornadaService: RefjornadaService,
    private validadorServicio: ValidatorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog) {
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
        if (this.accion !== 'delete' && this.accion !== 'view') {
          this.accion = 'edit'
        }
        this.cargosalarialService.findOne(this.id).subscribe((resp: any) => {
          this.formCargoSalarial.patchValue(resp.entities[0]);
        });
      }
    });
  }

  ngOnInit(): void {
    this.loadJornada();
  }

  createForm() {
    this.formCargoSalarial = this.fb.group({
      id: null,
      cargoSalarialDesc: [null, { validators: [Validators.required, Validators.minLength(3), this.validadorServicio.validarCaracteresDescripcion(), this.validadorServicio.validarEspaciosInicioFin(), Validators.max(100)] }],
      idRefJornada: [null, { validators: [Validators.required] }],
      equivalenciaHoraria: [null, { validators: [Validators.required] }],
      ordenVisual: [null],
      estaActivo: true
    });
    if (this.accion === 'delete' || this.accion === 'view') {
      this.formCargoSalarial.disable();
    }
  }
  save() {
    if (this.formCargoSalarial.invalid) {
      this.formCargoSalarial.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formCargoSalarial.removeControl('id');
      this.cargosalarialService.create(this.formCargoSalarial.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Cargo Salarial Creado", false)
        this.router.navigate(['/pages/cargosalarial']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      });
    }
    else {
      this.cargosalarialService.update(this.formCargoSalarial.value.id, this.formCargoSalarial.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Cargo Salarial Modificado", false)
        this.router.navigate(['/pages/cargosalarial']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    }

  }
  cancel() {
    this.router.navigate(['/pages/cargosalarial']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.cargosalarialService.delete(this.formCargoSalarial.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Cargo Salarial Eliminado", false)
          this.router.navigate(['/pages/cargosalarial']);
        }, err => {
          this.mostrarDialogMsj("Atención", err.error.errors, false)
        });
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

  loadJornada() {
    let filtroJornada: FilterOptions = { estaActivo: true, SortProperties: 'jornadaDesc', PageSize: 1000 };
    this.refjornadaService.filter(filtroJornada).subscribe((resp: any) => {
      this.refJornada = resp.entities || [];
    });
  }

}
