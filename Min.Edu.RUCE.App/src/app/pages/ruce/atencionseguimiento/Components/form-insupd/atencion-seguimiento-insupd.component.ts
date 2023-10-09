import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { AtencionSeguimientoService } from '../../Service/atencion-seguimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { ObserverCooperadoraService } from '@app/pages/ruce/cooperadora/Services/observer-cooperadora.service';

@Component({
  selector: 'vex-atencion-seguimiento-insupd',
  templateUrl: './atencion-seguimiento-insupd.component.html',
  styleUrls: ['./atencion-seguimiento-insupd.component.scss']
})
export class AtencionSeguimientoInsupdComponent implements OnInit, OnDestroy {

  formularioAtencionSeguimiento!: FormGroup;
  id: number = 0;
  idCooperadora!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  public accion: string = '';

  suscriptionIdCooperadora: Subscription;

  constructor(
    private fb: FormBuilder,
    private atencionSeguimientoService: AtencionSeguimientoService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
    private matDialog: MatDialog,
    protected observerIdCooperadora: ObserverCooperadoraService
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
    this.suscriptionIdCooperadora = this.observerIdCooperadora.castIdCooperadora.subscribe((value)=>{
      this.idCooperadora = value;
    });
    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.atencionSeguimientoService.findOne(this.id).subscribe((resp: any) => {
          this.formularioAtencionSeguimiento.patchValue(resp.entities);
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.suscriptionIdCooperadora.unsubscribe();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioAtencionSeguimiento = this.fb.group({
      fkCooperadora: this.idCooperadora,
      llamadas: null,
      mesajes: null,
      emailEnviados: null,
      atencionOficina: null,
      atencionTerritorial: null,
      observacion: null,
      fecha: [null, {validators: [ Validators.required,]}],
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('inicioCargo','finCargo')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioAtencionSeguimiento.disable();
    }
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
