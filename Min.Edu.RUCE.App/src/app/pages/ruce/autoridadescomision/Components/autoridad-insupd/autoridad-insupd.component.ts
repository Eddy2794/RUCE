import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefCargoModel } from '@app/pages/ruce/refruce/Model/refcargo-model';
import { RefTipoDocumentoModel } from '@app/pages/ruce/refruce/Model/reftipodocumento-model';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { PersonaruceService } from '@app/pages/ruce/refruce/Services/personaruce-service';
import { AutoridadComisionService } from '../../Service/autoridad-comision.service';
import { RefTipoDocumentoService } from '@app/pages/ruce/refruce/Services/reftipodocumento.service';
import { RefcargoService } from '@app/pages/ruce/refruce/Services/refcargo-service';
import { ObserverComisionService } from '@app/pages/ruce/comision/Services/observer-comision.service';

@Component({
  selector: 'vex-autoridad-insupd',
  templateUrl: './autoridad-insupd.component.html',
  styleUrls: ['./autoridad-insupd.component.scss']
})
export class AutoridadComisionInsupdComponent implements OnInit, OnDestroy {

  formularioAutoridad!: FormGroup;
  id: number = 0;
  idCooperadora!: number;
  idComision!:number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10 };
  tiposDocumentos = new Array<RefTipoDocumentoModel>;
  cargos = new Array<RefCargoModel>;


  public accion: string = '';

  suscriptionIdComision: Subscription;

  constructor(
    private fb: FormBuilder,
    private personaRUCEService: PersonaruceService,
    private autoridadComisionService: AutoridadComisionService,
    private refTipoDocumentoService: RefTipoDocumentoService,
    private refCargoService: RefcargoService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
    private matDialog: MatDialog,
    private observerIdComision: ObserverComisionService
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
    this.idCooperadora = this.route.snapshot.params['id'];
    this.suscriptionIdComision = this.observerIdComision.castIdIdComision.subscribe((value)=>{
      this.idComision = value;
    });
    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.idAutoridad);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.autoridadComisionService.findOne(this.id).subscribe((resp: any) => {
          this.formularioAutoridad.patchValue(resp.entities);
          this.formularioAutoridad.controls.documento.patchValue(resp.entities.persona_r_u_c_e[0].documento);
          this.formularioAutoridad.controls.cuil.patchValue(resp.entities.persona_r_u_c_e[0].cuil);
          this.formularioAutoridad.controls.nombre.patchValue(resp.entities.persona_r_u_c_e[0].nombre);
          this.formularioAutoridad.controls.apellido.patchValue(resp.entities.persona_r_u_c_e[0].apellido);
          this.formularioAutoridad.controls.telefono.patchValue(resp.entities.persona_r_u_c_e[0].telefono);
          this.formularioAutoridad.controls.email.patchValue(resp.entities.persona_r_u_c_e[0].email);
          this.formularioAutoridad.controls.fkRefCargo.patchValue(resp.entities.ref_cargo[0].id);
          this.formularioAutoridad.controls.fkRefTipoDocumentoRUCE.patchValue(Number(resp.entities.persona_r_u_c_e[0].fkRefTipoDocumentoRUCE));
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.suscriptionIdComision.unsubscribe();
  }

  ngOnInit(): void {
  }

  loadRefs() {
    this.refTipoDocumentoService.filter(this.filtro).subscribe((data: DataPage<RefTipoDocumentoModel>) => {
      this.tiposDocumentos = Object.assign([],data.entities,this.tiposDocumentos);
    })
    this.refCargoService.filter(this.filtro).subscribe((data: DataPage<RefCargoModel>) => {
      this.cargos = Object.assign([],data.entities,this.cargos);
    })
  }

  createForm() {
    this.formularioAutoridad = this.fb.group({
      id: null,
      fkComision: this.idComision,
      fkRefCargo: [null, {validators: [ Validators.required, ]}],
      fkPersonaRUCE: null,
      fkRefTipoDocumentoRUCE: [null, {validators: [ Validators.required, ]}],
      documento: [null, {validators: [ Validators.required, Validators.minLength(7), Validators.maxLength(8), this.validadorServicio.validarEspaciosInicioFin() ]}],
      cuil: [null, {validators: [ Validators.required, Validators.minLength(11), Validators.maxLength(12), this.validadorServicio.validarEspaciosInicioFin() ]}],
      nombre: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras(), this.validadorServicio.validarEspaciosInicioFin() ]}],
      apellido: [null, {validators: [ Validators.required,  this.validadorServicio.validarSoloLetras(), this.validadorServicio.validarEspaciosInicioFin() ]}],
      telefono: [null, {validators: [ Validators.required, this.validadorServicio.validarEspaciosInicioFin() ]}],
      email: [null, {validators: [ Validators.required, Validators.email, this.validadorServicio.validarEspaciosInicioFin() ]}],
      inicioCargo: [null, {validators: [ Validators.required]}],
      finCargo: [null, {validators: [ Validators.required]} ],
      idUsuarioAlta: null,
      idUsuarioModificacion: null,
      estaActivo: true,
    },
    {
      validators: [ this.validadorServicio.validarFechasInicioFin('inicioCargo','finCargo')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioAutoridad.disable();
    }
  }

  save() {
    if (this.formularioAutoridad.invalid) {
      this.formularioAutoridad.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioAutoridad.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioAutoridad.removeControl('id');
      this.formularioAutoridad.value['inicioCargo'] = this.formularioAutoridad.value['inicioCargo']?.toString()
      this.formularioAutoridad.value['finCargo'] = this.formularioAutoridad.value['finCargo']?.toString()
      this.autoridadComisionService.create(this.formularioAutoridad.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Autoridad Creada", false)
        this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      // console.log(this.formularioAutoridad.value.fkRefTipoDocumentoRUCE)
      this.formularioAutoridad.value.fkComision = this.formularioAutoridad.value.fkComision;
      // this.formularioAutoridad.value.fkRefTipoDocumentoRUCE = this.formularioAutoridad.value.fkRefTipoDocumentoRUCE;
      this.formularioAutoridad.value.fkPersonaRUCE = this.formularioAutoridad.value.fkPersonaRUCE;
      
      this.autoridadComisionService.update(this.formularioAutoridad.value.id, this.formularioAutoridad.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Autoridad Modificado", false)
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
        this.autoridadComisionService.delete(this.formularioAutoridad.value.id).subscribe((resp: any) => {
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
