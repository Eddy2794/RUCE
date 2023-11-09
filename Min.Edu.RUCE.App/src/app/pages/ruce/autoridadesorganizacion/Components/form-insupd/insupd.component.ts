import { environment } from '@environments/environment';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { Subscription, filter } from 'rxjs';
import { RefTipoDocumentoModel } from '@app/pages/ruce/refruce/Model/reftipodocumento-model';
import { RefCargoModel } from '@app/pages/ruce/refruce/Model/refcargo-model';
import { PersonaruceService } from '@app/pages/ruce/refruce/Services/personaruce-service';
import { AutoridadOrganizacionRUCEService } from '../../Services/autoridad-organizacionruce.service';
import { RefTipoDocumentoService } from '@app/pages/ruce/refruce/Services/reftipodocumento.service';
import { RefcargoService } from '@app/pages/ruce/refruce/Services/refcargo-service';
import { ObserverOrganizacionService } from '@app/pages/ruce/organizacionruce/Services/observer-organizacion.service';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-autoridades-form',
  templateUrl: './insupd.component.html',
  styleUrls: ['./insupd.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class AutoridadOrganizacionInsupdComponent implements OnInit, OnDestroy {

  formularioAutoridad!: FormGroup;
  id: number = 0;
  idOrganizacion: number = 0;
  filtro: FilterOptions = { estaActivo: true};
  tiposDocumentos = new Array<RefTipoDocumentoModel>;
  cargos = new Array<RefCargoModel>;


  public accion: string = '';

  suscriptionIdOrganizacion: Subscription;
  searchOptions: SearchOptionsGeneric[];
  httpClient: HttpClient;

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
    private matDialog: MatDialog,
    private observerIdOrganizacion: ObserverOrganizacionService,
    private http: HttpClient
    )
    {
      this.suscriptionIdOrganizacion = this.observerIdOrganizacion.castIdIdOrganizacion.subscribe((value)=>{
        this.idOrganizacion = value;
      });
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
      this.createForm();
      this.activatedRoute.params.subscribe((param: any) => {
        this.id = parseInt(param.id);
        if (this.id !== 0) {
          if (this.accion !== 'delete'){
            this.accion = 'edit'
          }
          this.autoridadOrganizacionRUCEService.findOne(this.id).subscribe((resp: any) => {
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
    this.suscriptionIdOrganizacion.unsubscribe();
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
      fkRefTipoDocumentoRUCE: [1, {validators: [ Validators.required, ]}],
      documento: [null, {validators: [ Validators.required, Validators.minLength(7), Validators.maxLength(8), this.validadorServicio.validarEspaciosInicioFin() ]}],
      cuil: [null, {validators: [ Validators.required, Validators.minLength(10), Validators.maxLength(11), this.validadorServicio.validarEspaciosInicioFin() ]}],
      nombre: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras(), this.validadorServicio.validarEspaciosInicioFin() ]}],
      apellido: [null, {validators: [ Validators.required,  this.validadorServicio.validarSoloLetras(), this.validadorServicio.validarEspaciosInicioFin() ]}],
      telefono: [null, {validators: [ Validators.required, this.validadorServicio.validarEspaciosInicioFin() ]}],
      email: [null, {validators: [ Validators.email ]}],
      inicioCargo: [null, {validators: [ Validators.required]}],
      finCargo: null,
      idUsuarioAlta: null,
      idUsuarioModificacion: null,
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('inicioCargo','finCargo')]
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
    if (this.id === 0) {
      this.formularioAutoridad.removeControl('id');
      this.formularioAutoridad.value['inicioCargo'] = this.formularioAutoridad.value['inicioCargo']?.toString()
      this.formularioAutoridad.value['finCargo'] = this.formularioAutoridad.value['finCargo']?.toString()
      this.autoridadOrganizacionRUCEService.create(this.formularioAutoridad.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Autoridad Creada", false)
        this.router.navigate(['/pages/establecimientos/view/'+this.idOrganizacion]);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      // console.log(this.formularioAutoridad.value.fkRefTipoDocumentoRUCE)
      this.formularioAutoridad.value.fkOrganizacionRUCE = this.formularioAutoridad.value.fkOrganizacionRUCE;
      // this.formularioAutoridad.value.fkRefTipoDocumentoRUCE = this.formularioAutoridad.value.fkRefTipoDocumentoRUCE;
      this.formularioAutoridad.value.fkPersonaRUCE = this.formularioAutoridad.value.fkPersonaRUCE;
      
      this.autoridadOrganizacionRUCEService.update(this.formularioAutoridad.value.id, this.formularioAutoridad.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Autoridad Modificado", false)
        this.router.navigate(['/pages/establecimientos/view/'+this.idOrganizacion]);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
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
          this.mostrarDialogMsj("Atención", err.error.message, false)
        }
        );
      }
    })
  }

  async getUser(dni: number){
    try{
      const data: any = await this.http.get(`${environment.apiRuceUrl}/persona_ruce/persona/${dni}`).toPromise();
      console.log(data);
      if(data.entities){
          const titulo="Persona Existente", msj="Desea cargar los datos de la persona existente?" , cancelVisible=true;
          const datos: DialogData = {titulo,msj,cancelVisible};
          const dialog = this.matDialog.open(DialogComponent, {
            width: '400px',
            data: datos
          });
          const result = await dialog.afterClosed().toPromise();
          if(result == "Aceptar"){
            this.formularioAutoridad.patchValue({
              fkPersonaRUCE: data.entities.id,
              documento: data.entities.documento,
              email: data.entities.email,
              cuil: data.entities.cuil,
              nombre: data.entities.nombre,
              apellido: data.entities.apellido,
              telefono: data.entities.telefono,
              fkRefTipoDocumentoRUCE:data.entities.ref_tipo_documento_r_u_c_e[0].id
            });
            // this.formularioAutoridad.controls.fkPersonaRUCE.patchValue(data.entities.id);
            // this.formularioAutoridad.controls.email.patchValue(data.entities.email);
            // this.formularioAutoridad.controls.documento.patchValue(data.entities.documento);
            // this.formularioAutoridad.controls.cuil.patchValue(data.entities.cuil);
            // this.formularioAutoridad.controls.nombre.patchValue(data.entities.nombre);
            // this.formularioAutoridad.controls.apellido.patchValue(data.entities.apellido);
            // this.formularioAutoridad.controls.telefono.patchValue(data.entities.telefono);
            // this.formularioAutoridad.controls.fkRefTipoDocumentoRUCE.patchValue(data.entities.ref_tipo_documento_r_u_c_e[0].id);
            this.formularioAutoridad.controls.fkRefTipoDocumentoRUCE.disable();
            this.formularioAutoridad.controls.documento.disable();
            this.formularioAutoridad.controls.cuil.disable();
            this.formularioAutoridad.controls.nombre.disable();
            this.formularioAutoridad.controls.apellido.disable();
            this.formularioAutoridad.controls.telefono.disable();
            this.formularioAutoridad.controls.email.disable();
          }
        }

    } catch{}{
      //console.log('Error al buscar el usuario');
    }
    }

  mostrarDialogMsj(titulo: string, msj: string, cancelVisible: boolean) {
    let datos: DialogData = { titulo, msj, cancelVisible }
    this.matDialog.open(DialogComponent, {
      width: '200px',
      data: datos
    });
  }

}
