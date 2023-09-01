import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { KioscoService } from '../../Services/kiosco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { ObserverCooperadoraService } from '@app/pages/ruce/cooperadora/Services/observer-cooperadora.service';
import { RefTipoDocumentoModel } from '@app/pages/ruce/refruce/Model/reftipodocumento-model';
import { RefTipoDocumentoService } from '@app/pages/ruce/refruce/Services/reftipodocumento.service';

@Component({
  selector: 'vex-kiosco-insupd',
  templateUrl: './kiosco-insupd.component.html',
  styleUrls: ['./kiosco-insupd.component.scss']
})
export class KioscoInsupdComponent implements OnInit {

  formularioKiosco!: FormGroup;
  id: number = 0;
  idCooperadora!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};
  tiposDocumentos = new Array<RefTipoDocumentoModel>;

  public accion: string = '';

  suscriptionId: Subscription;

  constructor(
    private fb: FormBuilder,
    private kioscoService: KioscoService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
    private matDialog: MatDialog,
    protected observerCooperadora: ObserverCooperadoraService,
    private refTipoDocumentoService: RefTipoDocumentoService,
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
    this.suscriptionId = this.observerCooperadora.castIdCooperadora.subscribe((value) => {
      if (value) this.idCooperadora= value;
    });

    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.kioscoService.findOne(this.id).subscribe((resp: any) => {
          this.formularioKiosco.patchValue(resp.entities);
          this.formularioKiosco.controls.documento.patchValue(resp.entities.persona_r_u_c_e.documento);
          this.formularioKiosco.controls.cuil.patchValue(resp.entities.persona_r_u_c_e.cuil);
          this.formularioKiosco.controls.nombre.patchValue(resp.entities.persona_r_u_c_e.nombre);
          this.formularioKiosco.controls.apellido.patchValue(resp.entities.persona_r_u_c_e.apellido);
          this.formularioKiosco.controls.telefono.patchValue(resp.entities.persona_r_u_c_e.telefono);
          this.formularioKiosco.controls.email.patchValue(resp.entities.persona_r_u_c_e.email);
          this.formularioKiosco.controls.fkRefTipoDocumentoRUCE.patchValue(Number(resp.entities.persona_r_u_c_e.fkRefTipoDocumentoRUCE));
        });
      }
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.suscriptionId.unsubscribe();
  }

  loadRefs() {
    this.refTipoDocumentoService.filter(this.filtro).subscribe((data: DataPage<RefTipoDocumentoModel>) => {
      this.tiposDocumentos = Object.assign([],data.entities,this.tiposDocumentos);
    });
  }

  createForm() {
    this.formularioKiosco = this.fb.group({
      id: null,
      fkCooperadora: this.idCooperadora,
      fkPersonaRUCE: null,
      fkRefTipoDocumentoRUCE: [null, {validators: [ Validators.required, ]}],
      documento: [null, {validators: [ Validators.required, Validators.minLength(7), Validators.maxLength(8), this.validadorServicio.validarEspaciosInicioFin() ]}],
      cuil: [null, {validators: [ Validators.required, Validators.minLength(11), Validators.maxLength(12), this.validadorServicio.validarEspaciosInicioFin() ]}],
      nombre: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras(), this.validadorServicio.validarEspaciosInicioFin() ]}],
      apellido: [null, {validators: [ Validators.required,  this.validadorServicio.validarSoloLetras(), this.validadorServicio.validarEspaciosInicioFin() ]}],
      telefono: [null, {validators: [ Validators.required, this.validadorServicio.validarEspaciosInicioFin() ]}],
      email: [null, {validators: [ Validators.required, Validators.email, this.validadorServicio.validarEspaciosInicioFin() ]}],
      accesoLicitacion: [false, {validators: [ Validators.required, ]}],
      documentacionPresentada: [false, {validators: [ Validators.required,  ]}],
      periodoInicio: [null, {validators: [ Validators.required, ]}],
      periodoFin: [null, {validators: [ Validators.required, ]}],
      estaActivo: true,
    },
    {
      validators: [ this.validadorServicio.validarFechasInicioFin('periodoInicio','periodoFin')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioKiosco.disable();
    }
  }

  save() {
    if (this.formularioKiosco.invalid) {
      this.formularioKiosco.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioKiosco.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioKiosco.removeControl('id');
      this.formularioKiosco.value['periodoInicio'] = this.formularioKiosco.value['periodoInicio']?.toString()
      this.formularioKiosco.value['periodoFin'] = this.formularioKiosco.value['periodoFin']?.toString()
      this.kioscoService.create(this.formularioKiosco.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Kiosco Creado", false)
        this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      //this.formularioKiosco.value.fkTipoFondo = this.formularioKiosco.value.fkTipoFondo?.id;
      
      this.kioscoService.update(this.formularioKiosco.value.id, this.formularioKiosco.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Kiosco Modificado", false)
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
        this.kioscoService.delete(this.formularioKiosco.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Fondo Eliminado", false)
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
