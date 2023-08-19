import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { AtencionSeguimientoService } from '../../Service/atencion-seguimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';

@Component({
  selector: 'vex-atencion-seguimiento-insupd',
  templateUrl: './atencion-seguimiento-insupd.component.html',
  styleUrls: ['./atencion-seguimiento-insupd.component.scss']
})
export class AtencionSeguimientoInsupdComponent implements OnInit {

  formularioAtencionSeguimiento!: FormGroup;
  id: number = 0;
  idCooperadora!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private atencionSeguimientoService: AtencionSeguimientoService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
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
    this.idCooperadora = this.route.snapshot.params['id'];
    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.idAtencionSeguimiento);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.atencionSeguimientoService.findOne(this.id).subscribe((resp: any) => {
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioAtencionSeguimiento = this.fb.group({
      id: null,
      fkCooperadora: this.idCooperadora,
      fkPersonaRUCE: null,
      llamadas: [null, {validators: [ Validators.required, ]}],
      mesajes: [null, {validators: [ Validators.required,  ]}],
      emailEnviados: [null, {validators: [ Validators.required, ]}],
      atencionOficina: [null, {validators: [ Validators.required, ]}],
      atencionTerritorial: [null, {validators: [ Validators.required, ]}],
      observacion: [null, {validators: [ Validators.required, ]}],
      fecha: [null, {validators: [ Validators.required,]}],
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('inicioCargo','finCargo')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioAtencionSeguimiento.disable();
    }
    console.log(this.formularioAtencionSeguimiento);
  }

  save() {
    if (this.formularioAtencionSeguimiento.invalid) {
      this.formularioAtencionSeguimiento.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioAtencionSeguimiento.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioAtencionSeguimiento.removeControl('id');
      this.formularioAtencionSeguimiento.value['fecha'] = this.formularioAtencionSeguimiento.value['fecha']?.toString()
      this.atencionSeguimientoService.create(this.formularioAtencionSeguimiento.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Atención Creada", false)
        this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.formularioAtencionSeguimiento.value.fkPersonaRUCE = this.formularioAtencionSeguimiento.value.fkPersonaRUCE?.id;
      
      this.atencionSeguimientoService.update(this.formularioAtencionSeguimiento.value.id, this.formularioAtencionSeguimiento.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Atención Modificado", false)
        this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.atencionSeguimientoService.delete(this.formularioAtencionSeguimiento.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Atención Eliminado", false)
          this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
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
