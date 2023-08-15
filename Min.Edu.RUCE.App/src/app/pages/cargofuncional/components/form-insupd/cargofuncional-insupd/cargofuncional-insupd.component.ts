import { FilterOptions } from './../../../../../shared/utils/filter-options';
import { RefTipoFuncionModel } from './../../../../referenciales/reftipofuncion/model/reftipofuncion.model';
import { ReftipofuncionService } from './../../../../referenciales/reftipofuncion/services/reftipofuncion.service';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CargofuncionalService } from "@app/pages/cargofuncional/services/cargofuncional.service";
import { ValidatorService } from "@app/shared/validators/validator.service";
import { DialogComponent, DialogData } from "@app/components/dialog/dialog.component";
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

@Component({
  selector: "vex-cargofuncional-insupd",
  templateUrl: "./cargofuncional-insupd.component.html",
  styleUrls: ["./cargofuncional-insupd.component.scss"],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class CargofuncionalInsupdComponent implements OnInit {
  formCargoFuncional!: FormGroup;
  accion: string = "";
  id: number = 0;
  refTipo: RefTipoFuncionModel[] = [];

  constructor(
    private fb: FormBuilder,
    private cargoFuncionalService: CargofuncionalService,
    private refTipoFuncionService: ReftipofuncionService,
    private validadorService: ValidatorService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.activatedRoute.url.subscribe((parameter: any) => {
      this.accion = parameter[0].path;
      switch (parameter[0].path) {
        case "delete": {
          this.accion = "delete";
          break;
        }
        case "add-edit": {
          this.accion = "add";
          break;
        }
        case "view": {
          this.accion = "view";
          break;
        }
      }
    });
    this.createForm();
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = parseInt(params.id);
      if (this.id !== 0) {
        if (this.accion !== "delete" && this.accion !== "view") {
          this.accion = "edit";
        }
        this.cargoFuncionalService.findOne(this.id).subscribe((resp: any) => {
          this.formCargoFuncional.patchValue(resp.entities[0])
        });
      }
    });
  }

  ngOnInit(): void {
    this.cargarTipoFuncion()
  }

  createForm() {
    this.formCargoFuncional = this.fb.group({
      id: null,
      cargoFuncionalDesc: [
        null,
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            this.validadorService.validarCaracteresDescripcion(),
            this.validadorService.validarEspaciosInicioFin(),
            Validators.max(100),
          ],
        },
      ],
      idRefTipoFuncion: [null, { validators: [Validators.required] }],
      ordenVisual: [null],
      esJerarquico: false,
      estaActivo: true,
    });
    if (this.accion === "delete" || this.accion === "view") this.formCargoFuncional.disable();
  }

  save() {
    if (this.formCargoFuncional.invalid) {
      this.formCargoFuncional.markAllAsTouched();
      return;
    }

    if (this.id == 0) {
      this.formCargoFuncional.removeControl('id');
      this.cargoFuncionalService.create(this.formCargoFuncional.value).subscribe((resp: any) => {
        this.mensaje("Mensaje", "Cargo Funcional Creado", false)
        this.router.navigate(['/pages/cargofuncional'])
      }, error => {
        this.mensaje("Atención", error.error.errors, false)
      })
    }
    else {
      this.cargoFuncionalService.update(this.formCargoFuncional.value.id, this.formCargoFuncional.value).subscribe((resp: any) => {
        this.mensaje("Mensaje", "Cargo Funcional Modificado", false)
        this.router.navigate(['/pages/cargofuncional'])
      }, error => {
        this.mensaje("Atención", error.error.errors, false)
      })
    }
  }

  cancelar() {
    this.router.navigate(['/pages/cargofuncional'])
  }

  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Está seguro de que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });
    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.cargoFuncionalService.delete(this.formCargoFuncional.value.id).subscribe((resp: any) => {
          this.mensaje("Mensaje", "Cargo Funcional Eliminado", false)
          this.router.navigate(['/pages/cargofuncional']);
        }, err => {
          this.mensaje("Atención", err.error.message, false)
        });
      }
    })
  }

  mensaje(titulo: string, msj: string, cancelVisible: boolean) {
    let datos: DialogData = { titulo, msj, cancelVisible }
    this.matDialog.open(DialogComponent, {
      width: '200px',
      data: datos
    });
  }

  cargarTipoFuncion() {
    let filtroTipoFuncion: FilterOptions = { estaActivo: true, SortProperties: 'tipoFuncionDesc', PageSize: 1000 }
    this.refTipoFuncionService.filter(filtroTipoFuncion).subscribe((resp: any) => {
      this.refTipo = resp.entities || [];
    })
  }
}
