import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { RefInstanciaInstrumentoModel } from "../../../Model/refinstanciainstrumento-model";
import { RefinstanciaInstrumentoService } from "../../../Services/refinstanciainstrumento.service";


@Component({
  selector: "vex-instrumento-insupd",
  templateUrl: "./instrumento-insupd.component.html",
  styleUrls: ["./instrumento-insupd.component.scss"],
})
export class InstrumentoInsupdComponent implements OnInit {

  formularioInstrumento!: FormGroup;
  id: number = 0;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  tipoFondo = new Array<RefInstanciaInstrumentoModel>;

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private instanciaInstrumentoService: RefinstanciaInstrumentoService,
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
        this.instanciaInstrumentoService.findOne(this.id).subscribe((resp: any) => {
          this.formularioInstrumento.patchValue(resp.entities);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioInstrumento = this.fb.group({
      id: null,
      instrumentoDesc: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras ]}],
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('fechaRecibido','fechaRendicion')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioInstrumento.disable();
    }
  }

  save() {
    if (this.formularioInstrumento.invalid) {
      this.formularioInstrumento.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioInstrumento.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioInstrumento.removeControl('id');
      this.instanciaInstrumentoService.create(this.formularioInstrumento.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Instancia Instrumento Creado", false)
        this.router.navigate(['/pages/instancia-instrumento/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.formularioInstrumento.value.fkTipoFondo = this.formularioInstrumento.value.fkTipoFondo?.id;
      
      this.instanciaInstrumentoService.update(this.formularioInstrumento.value.id, this.formularioInstrumento.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Instancia Instrumento Modificado", false)
        this.router.navigate(['/pages/instancia-instrumento/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/instancia-instrumento/listar/']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.instanciaInstrumentoService.delete(this.formularioInstrumento.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Instancia Instrumento Eliminado", false)
          this.router.navigate(['/pages/instancia-instrumento/listar/']);
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
