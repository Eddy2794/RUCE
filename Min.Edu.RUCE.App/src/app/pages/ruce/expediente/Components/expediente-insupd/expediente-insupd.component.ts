import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ObserverCooperadoraService } from '@app/pages/ruce/cooperadora/Services/observer-cooperadora.service';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { Subscription } from 'rxjs';
import { ExpedienteService } from '../../Services/expediente.service';
import { RefinstanciaInstrumentoService } from '@app/pages/ruce/refruce/Services/refinstanciainstrumento.service';
import { RefInstanciaInstrumentoModel } from '@app/pages/ruce/refruce/Model/refinstanciainstrumento-model';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';

@Component({
  selector: 'vex-expediente-insupd',
  templateUrl: './expediente-insupd.component.html',
  styleUrls: ['./expediente-insupd.component.scss']
})
export class ExpedienteInsupdComponent implements OnInit {

  formularioExpediente!: FormGroup;
  id: number = 0;
  idCooperadora!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10 };
  instanciaInstrumento = new Array<RefInstanciaInstrumentoModel>;


  public accion: string = '';

  suscriptionIdCooperadora: Subscription;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
    private matDialog: MatDialog,
    private observerIdCooperadora: ObserverCooperadoraService,
    private expedienteService: ExpedienteService,
    private instrumentoService: RefinstanciaInstrumentoService
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
    this.suscriptionIdCooperadora = this.observerIdCooperadora.castIdCooperadora.subscribe((value)=>{
      this.idCooperadora = value;
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
        this.expedienteService.findOne(this.id).subscribe((resp: any) => {
          this.formularioExpediente.patchValue(resp.entities);
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.suscriptionIdCooperadora.unsubscribe();
  }

  ngOnInit(): void {
  }

  loadRefs() {
    this.instrumentoService.filter(this.filtro).subscribe((data: DataPage<RefInstanciaInstrumentoModel>) => {
      this.instanciaInstrumento = Object.assign([],data.entities,this.instanciaInstrumento);
    })
    // this.refCargoService.filter(this.filtro).subscribe((data: DataPage<RefCargoModel>) => {
    //   this.cargos = Object.assign([],data.entities,this.cargos);
    // })
  }

  createForm() {
    this.formularioExpediente = this.fb.group({
      id: null,
      fkRefInstanciaInstrumento: [null, {validators: [ Validators.required, ]}],
      fkCooperadora: this.idCooperadora,
      nroExpediente: [null, {validators: [ Validators.required, this.validadorServicio.validarEspaciosInicioFin ]}],
      cantObservaciones: [null, {validators: [ Validators.required ]}],
      observacionesDesc: [null, {validators: [ Validators.required, this.validadorServicio.validarEspaciosInicioFin(), this.validadorServicio.validarCaracteresDescripcion ]}],
      observacionesRespondidas: false,
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('inicioCargo','finCargo')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioExpediente.disable();
    }
  }

  save() {
    if (this.formularioExpediente.invalid) {
      this.formularioExpediente.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioExpediente.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioExpediente.removeControl('id');
      this.expedienteService.create(this.formularioExpediente.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Expediente Creado", false)
        this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      // console.log(this.formularioExpediente.value.fkRefTipoDocumentoRUCE)
      this.formularioExpediente.value.fkComision = this.formularioExpediente.value.fkComision;
      // this.formularioExpediente.value.fkRefTipoDocumentoRUCE = this.formularioExpediente.value.fkRefTipoDocumentoRUCE;
      this.formularioExpediente.value.fkPersonaRUCE = this.formularioExpediente.value.fkPersonaRUCE;
      
      this.expedienteService.update(this.formularioExpediente.value.id, this.formularioExpediente.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Expediente Modificado", false)
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
        this.expedienteService.delete(this.formularioExpediente.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Autoridad Eliminado", false)
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
