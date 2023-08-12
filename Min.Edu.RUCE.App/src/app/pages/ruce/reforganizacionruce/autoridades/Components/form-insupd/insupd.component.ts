import { RefcargoService } from '@app/pages/ruce/ref-ruce/Services/refcargo-service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { AutoridadOrganizacionRUCEService } from './../../Services/AutoridadOrganizacionRUCE/autoridad-organizacionruce.service';
import { RefTipoDocumentoService } from '@app/pages/ruce/ref-ruce/Services/reftipodocumento.service';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { filter } from 'rxjs';
import { RefTipoDocumentoModel } from '@app/pages/ruce/ref-ruce/Model/reftipodocumento-model';
import { RefCargoModel } from '@app/pages/ruce/ref-ruce/Model/refcargo-model';
import { PersonaruceService } from '@app/pages/ruce/ref-ruce/Services/personaruce-service';
@Component({
  selector: 'app-autoridades-form',
  templateUrl: './insupd.component.html',
  styleUrls: ['./insupd.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class AutoridadInsupdComponent implements OnInit {

  formularioAutoridad!: FormGroup;
  id: number = 0;
  idOrganizacion!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};
  tiposDocumentos = new Array<RefTipoDocumentoModel>;
  cargos = new Array<RefCargoModel>;


  public accion: string = '';

/*   regiones: string[]= ['I','II','III','IV',"V",'VI','VII'];
  niveles: string[]= ['INICIAL','PRIMARIO','SECUNDARIO','SUPERIOR']; */

  constructor(
    private fb: FormBuilder,
    private personaRUCEService: PersonaruceService,
    private autoridadOrganizacionRUCEService: AutoridadOrganizacionRUCEService,
    private refTipoDocumentoService: RefTipoDocumentoService,
    private refCargoService: RefcargoService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
    private matDialog: MatDialog)
    {
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
      this.idOrganizacion = this.route.snapshot.params['id'];
      this.createForm();
      this.activatedRoute.params.subscribe((param: any) => {
        this.id = parseInt(param.idAutoridad);
        if (this.id !== 0) {
          if (this.accion !== 'delete'){
            this.accion = 'edit'
          }
          this.autoridadOrganizacionRUCEService.findOne(this.id).subscribe((resp: any) => {
            this.formularioAutoridad.patchValue(resp.entities);
            this.formularioAutoridad.controls.documento.patchValue(resp.entities.fkPersonaRUCE.documento);
            this.formularioAutoridad.controls.cuil.patchValue(resp.entities.fkPersonaRUCE.cuil);
            this.formularioAutoridad.controls.nombre.patchValue(resp.entities.fkPersonaRUCE.nombre);
            this.formularioAutoridad.controls.apellido.patchValue(resp.entities.fkPersonaRUCE.apellido);
            this.formularioAutoridad.controls.telefono.patchValue(resp.entities.fkPersonaRUCE.telefono);
            this.formularioAutoridad.controls.email.patchValue(resp.entities.fkPersonaRUCE.email);
            this.formularioAutoridad.controls.fkRefCargo.patchValue(resp.entities.fkRefCargo.id);
            this.formularioAutoridad.controls.fkRefTipoDocumentoRUCE.patchValue(resp.entities.fkPersonaRUCE.fkRefTipoDocumentoRUCE.id);
          });
        }
      });
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
      fkOrganizacionRUCE: this.idOrganizacion,
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
      this.autoridadOrganizacionRUCEService.create(this.formularioAutoridad.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Autoridad Creada", false)
        this.router.navigate(['/pages/establecimientos/view/'+this.idOrganizacion]);
      }, err => {
        this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
      }
      );
    } else {
      this.formularioAutoridad.value.fkOrganizacionRUCE = this.formularioAutoridad.value.fkOrganizacionRUCE?.id;
      this.formularioAutoridad.value.fkRefTipoDocumentoRUCE = this.formularioAutoridad.value.fkPersonaRUCE.fkRefTipoDocumentoRUCE?.id;
      this.formularioAutoridad.value.fkPersonaRUCE = this.formularioAutoridad.value.fkPersonaRUCE?.id;
      
      this.autoridadOrganizacionRUCEService.update(this.formularioAutoridad.value.id, this.formularioAutoridad.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Autoridad Modificado", false)
        this.router.navigate(['/pages/establecimientos/view/'+this.idOrganizacion]);
      }, err => {
        this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/establecimientos/view/'+this.idOrganizacion]);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.autoridadOrganizacionRUCEService.delete(this.formularioAutoridad.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Autoridad Eliminado", false)
          this.router.navigate(['/pages/establecimientos/view/'+this.idOrganizacion]);
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
