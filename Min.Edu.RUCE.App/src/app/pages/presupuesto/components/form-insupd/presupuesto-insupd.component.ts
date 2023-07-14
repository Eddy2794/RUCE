import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ModalSelectOrganizacionComponent } from '@app/components/modal-select-organizacion/modal-select-organizacion.component';
import { CargosalarialService } from '@app/pages/cargosalarial/services/cargosalarial.service';
import { RefAdicionalModel } from '@app/pages/referenciales/refadicional/model/refadicional.model';
import { RefAdicionalService } from '@app/pages/referenciales/refadicional/services/refadicional.service';
import { RefEjercicioService } from '@app/pages/referenciales/refejercicio/services/refejercicio.service';
import { RefEscalafonModel } from '@app/pages/referenciales/refescalafon/model/refescalafon.model';
import { RefEscalafonService } from '@app/pages/referenciales/refescalafon/services/refescalafon.service';
import { RefFinalidadxejerModel } from '@app/pages/referenciales/reffinalidadxejer/model/reffinalidadxejer.model';
import { RefFinalidadxejerService } from '@app/pages/referenciales/reffinalidadxejer/services/reffinalidadxejer.service';
import { RefFuncionxejerModel } from '@app/pages/referenciales/reffuncionxejer/model/reffuncionxejer.model';
import { RefFuncionxejerService } from '@app/pages/referenciales/reffuncionxejer/services/reffuncionxejer.service';
import { RefUdeOxEjerModel } from '@app/pages/referenciales/refudeoxejer/model/refudeoxejer.model';
import { RefUdeOxEjerService } from '@app/pages/referenciales/refudeoxejer/services/refudeoxejer.service';
import { IBaseService } from '@app/shared/services/interface/i-base.service';
import { FilterOptions } from '@app/shared/utils';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { PresupuestoService } from '../../services/presupuesto.service';

@Component({
  selector: 'vex-presupuesto-insupd',
  templateUrl: './presupuesto-insupd.component.html',
  styleUrls: ['./presupuesto-insupd.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class PresupuestoInsUpdComponent implements OnInit {
  accion: string;
  idRefEjercicio: number;
  frmPresupuesto: FormGroup;
  refUdeOxEjercicioList: RefUdeOxEjerModel[];
  refFinalidadxEjerList: RefFinalidadxejerModel[];
  refFuncionxEjerList: RefFuncionxejerModel[];
  refEscalafonList: RefEscalafonModel[];
  refAdicionalList: RefAdicionalModel[];
  id: number = 0;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public ejercicioService: RefEjercicioService,
    public refUdeOxEjercicio: RefUdeOxEjerService,
    public refFinalidadxEjerService: RefFinalidadxejerService,
    public refFuncionxEjerService: RefFuncionxejerService,
    public refEscalafonService: RefEscalafonService,
    public refAdicionalService: RefAdicionalService,
    public cargoSalarialService: CargosalarialService,
    public presupuestoService: PresupuestoService,
    private dialog: MatDialog) {
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


    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      if (this.id !== 0) {
        if (this.accion !== 'delete' && this.accion !== 'view') { this.accion = 'edit' }
        this.presupuestoService.findOne(this.id).subscribe((resp: any) => {
          this.idRefEjercicio = resp.entities[0].refUdeOxEjer.idRefEjercicio;
          this.loadEjercicio(this.idRefEjercicio);
          this.loadReferencialesByEjercicio(this.idRefEjercicio);
          this.frmPresupuesto.patchValue(resp.entities[0]);
          this.frmPresupuesto.controls.cargoSalarialDesc.patchValue(resp.entities[0].cargoSalarial.cargoSalarialDesc);
          this.frmPresupuesto.controls.idCargoSalarial.patchValue(resp.entities[0].idCargoSalarial);
          this.frmPresupuesto.controls.cantDisponible.setValue(resp.entities[0].cantPresupuestada);

        });
      }
    });
  }

  ngOnInit(): void {
    //this.loadEjercicio(this.idRefEjercicio);
    this.loadEscalafon();
    this.loadAdicional();
    this.createForm();
    console.log(this.accion);
    if (this.accion === 'delete' || this.accion === 'view') {
      this.frmPresupuesto.disable();
    }

  }
  loadEjercicio(idEjercicio) {
    this.ejercicioService.findOne(idEjercicio).subscribe((resp: any) => {
      this.frmPresupuesto.controls.ejercicioDesc.patchValue(resp.entities[0].ejercicioDesc);
    });
  }

  createForm() {
    this.frmPresupuesto = this.fb.group({
      id: null,
      ejercicioDesc: [null, { validators: [Validators.required] }],
      idRefUdeOxEjer: [null, { validators: [Validators.required] }],
      idRefFinalidadxEjer: [null, { validators: [Validators.required] }],
      idRefFuncionxEjer: [null, { validators: [Validators.required] }],
      idRefEscalafon: [null, { validators: [Validators.required] }],
      idRefAdicional: [null, { validators: [Validators.required] }],
      cargoSalarialDesc: [null, { validators: [Validators.required] }],
      cantPresupuestada: [null, { validators: [Validators.required] }],
      cantDisponible: [null],
      idCargoSalarial: [],
      estaActivo: [true],
    });

  }
  openDialogSingle(dataSource: IBaseService<any>, nombreColumnaDesc: string, nombreEntidad: string, label: string) {
    const dialogConfig = new MatDialogConfig();
    let filter: FilterOptions = {};

    switch (nombreEntidad) {
      case 'RefEjercicio':
        filter = { estaActivo: true, SortProperties: 'ejercicioDesc desc' };
        break;
      case 'CargoSalarial':
        filter = { estaActivo: true, };
        break;
    }
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
    const dialogRef = this.dialog.open(ModalSelectOrganizacionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta != undefined) {

        switch (nombreEntidad) {
          case 'RefEjercicio':
            this.frmPresupuesto.controls.ejercicioDesc.setValue(respuesta.ejercicioDesc);
            this.loadReferencialesByEjercicio(respuesta.id);
            break;
          case 'CargoSalarial':
            this.frmPresupuesto.controls.cargoSalarialDesc.setValue(respuesta.cargoSalarialDesc);
            this.frmPresupuesto.controls.idCargoSalarial.setValue(respuesta.id);
            break;
        }
      }
    });
  }
  loadReferencialesByEjercicio(id: number) {
    this.loadUdeO(id);
    this.loadFinalidad(id);
    this.loadFuncion(id);
  }
  loadFinalidad(idEjercicioSelect: number) {
    const filtroFinalidad: FilterOptions = { estaActivo: true, idRefEjercicio: idEjercicioSelect };
    this.refFinalidadxEjerService.filter(filtroFinalidad).subscribe((resp: any) => {
      this.refFinalidadxEjerList = resp.entities || [];
    });
  }
  loadFuncion(idEjercicioSelect: number) {
    const filtroFuncion: FilterOptions = { estaActivo: true, idRefEjercicio: idEjercicioSelect };
    this.refFuncionxEjerService.filter(filtroFuncion).subscribe((resp: any) => {
      this.refFuncionxEjerList = resp.entities || [];
    });
  }
  loadEscalafon() {
    const filtroEscalafon: FilterOptions = { estaActivo: true };
    this.refEscalafonService.filter(filtroEscalafon).subscribe((resp: any) => {
      this.refEscalafonList = resp.entities || [];
    });
  }
  loadAdicional() {
    const filtroAdicional: FilterOptions = { estaActivo: true };
    this.refAdicionalService.filter(filtroAdicional).subscribe((resp: any) => {
      this.refAdicionalList = resp.entities || [];
    });
  }
  loadUdeO(idEjercicioSelect: number) {
    const filtroUdeO: FilterOptions = { estaActivo: true, idRefEjercicio: idEjercicioSelect };
    this.refUdeOxEjercicio.filter(filtroUdeO).subscribe((resp: any) => {
      this.refUdeOxEjercicioList = resp.entities || [];
    });
  }
  cancel() {
    this.router.navigate(['/pages/presupuesto']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.dialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });
    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.presupuestoService.delete(this.frmPresupuesto.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Presupuesto Eliminado", false)
          this.router.navigate(['/pages/presupuesto']);
        }, err => {
          this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
        }
        );
      }
    })
  }
  mostrarDialogMsj(titulo: string, msj: string, cancelVisible: boolean) {
    let datos: DialogData = { titulo, msj, cancelVisible }
    this.dialog.open(DialogComponent, {
      width: '200px',
      data: datos
    });
  }
  save() {
    if (this.frmPresupuesto.invalid) {
      this.frmPresupuesto.markAllAsTouched();
      return;
    }
    this.frmPresupuesto.removeControl('ejercicioDesc');
    this.frmPresupuesto.removeControl('cargoSalarialDesc');
    this.frmPresupuesto.addControl("cantDisponible", new FormControl(0));
    this.frmPresupuesto.controls.cantDisponible.setValue(this.frmPresupuesto.controls.cantPresupuestada.value);
    if (this.id == 0) {
      this.frmPresupuesto.removeControl('id');
      this.presupuestoService.create(this.frmPresupuesto.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Presupuesto creado", false)
        this.router.navigate(['/pages/presupuesto']);
      }, err => {
        this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
      }
      );
    } else {
      this.presupuestoService.update(this.frmPresupuesto.value.id, this.frmPresupuesto.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Presupuesto modificado", false)
        this.router.navigate(['/pages/presupuesto']);
      }, err => {
        this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
      });
    }
  }
  limpiarCargosalarial() {
    this.frmPresupuesto.controls["cargoSalarialDesc"].setValue(null);
    this.frmPresupuesto.controls["idCargoSalarial"].setValue(null);
  }
  limpiarEjercicio() {
    this.frmPresupuesto.controls["ejercicioDesc"].setValue(null);
  }

}

