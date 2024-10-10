import { RoleService } from './../../../../../_services/role.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { RefTipoDocumentoService } from '@app/pages/ruce/refruce/Services/reftipodocumento.service';
import { RefTipoDocumentoModel } from '@app/pages/ruce/refruce/Model/reftipodocumento-model';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { Role } from '@app/_models/role.model';
import { UserService } from '@app/_services/user.service';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'vex-usuario-insupd',
  templateUrl: './usuario-insupd.component.html',
  styleUrls: ['./usuario-insupd.component.scss']
})
export class UsuarioInsupdComponent implements OnInit {

  formularioUsuario!: FormGroup;
  id: number = 0;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  tiposDocumentos = new Array<RefTipoDocumentoModel>;
  roles = new Array<Role>;

  inputType = 'password';
  visible = false;

  public accion: string = '';
  httpClient: HttpClient;


  constructor(
    private fb: FormBuilder,
    private usuarioService: UserService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
    private matDialog: MatDialog,
    private refTipoDocumentoService: RefTipoDocumentoService,
    private roleService: RoleService,
    private cd: ChangeDetectorRef,
    private http: HttpClient
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
    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.usuarioService.findOne(this.id).subscribe((resp: any) => {
          this.formularioUsuario.patchValue(resp.entities);
          this.formularioUsuario.controls.documento.patchValue(resp.entities.persona_r_u_c_e.documento);
          this.formularioUsuario.controls.cuil.patchValue(resp.entities.persona_r_u_c_e.cuil);
          this.formularioUsuario.controls.nombre.patchValue(resp.entities.persona_r_u_c_e.nombre);
          this.formularioUsuario.controls.apellido.patchValue(resp.entities.persona_r_u_c_e.apellido);
          this.formularioUsuario.controls.telefono.patchValue(resp.entities.persona_r_u_c_e.telefono);
          this.formularioUsuario.controls.email.patchValue(resp.entities.persona_r_u_c_e.email);
          this.formularioUsuario.controls.fkRefTipoDocumentoRUCE.patchValue(Number(resp.entities.persona_r_u_c_e.fkRefTipoDocumentoRUCE));
          this.formularioUsuario.controls.role.patchValue(Number(resp.entities.roles[0].id));
        });
      }
    });
  }

  ngOnInit(): void {
  }

  togglePassword() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  loadRefs() {
    this.refTipoDocumentoService.filter(this.filtro).subscribe((data: DataPage<RefTipoDocumentoModel>) => {
      this.tiposDocumentos = Object.assign([],data.entities,this.tiposDocumentos);
    })
    this.roleService.filter(this.filtro).subscribe((data: DataPage<Role>) => {
      this.roles = Object.assign([],data.entities,this.roles);
    })
  }

  createForm() {
    this.formularioUsuario = this.fb.group({
      id: null,
      username: [null, {validators: [ Validators.required ]}],
      password: [null, {validators: [ Validators.required, Validators.minLength(8), this.validadorServicio.nemotecnico ]}],
      c_password: [null, {validators: [ Validators.required, Validators.minLength(8) ]}],
      // role: [null, {validators: [ Validators.required]}],
      fkPersonaRUCE: null,
      fkRefTipoDocumentoRUCE: [1, {validators: [ Validators.required, ]}],
      documento: [null, {validators: [ Validators.required, Validators.minLength(7), Validators.maxLength(8), this.validadorServicio.validarEspaciosInicioFin() ]}],
      cuil: [null, {validators: [ Validators.required, Validators.minLength(10), Validators.maxLength(11), this.validadorServicio.validarEspaciosInicioFin() ]}],
      nombre: [null, {validators: [ Validators.required, this.validadorServicio.validarSoloLetras(), this.validadorServicio.validarEspaciosInicioFin() ]}],
      apellido: [null, {validators: [ Validators.required,  this.validadorServicio.validarSoloLetras(), this.validadorServicio.validarEspaciosInicioFin() ]}],
      telefono: [null, {validators: [ Validators.required, this.validadorServicio.validarEspaciosInicioFin() ]}],
      email: [null, {validators: [ Validators.email ]}],
      role: [null,{validators:[ Validators.required]}],
      idUsuarioAlta: null,
      idUsuarioModificacion: null,
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('fechaRecibido','fechaRendicion')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioUsuario.disable();
    }
  }


  save() {
    if (this.formularioUsuario.invalid) {
      this.formularioUsuario.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioUsuario.markAllAsTouched();
    //   return;
    // }

    if (this.id == 0) {
      this.formularioUsuario.removeControl('id');
      this.usuarioService.create(this.formularioUsuario.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Usuario Creado", false)
        this.router.navigate(['/pages/usuarios/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.message, false)
      }
      );
    } else {
      
      this.usuarioService.update(this.formularioUsuario.value.id, this.formularioUsuario.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Usuario Modificado", false)
        this.router.navigate(['/pages/usuarios/listar/']);
      }, err => {
        this.mostrarDialogMsj("Atención", err.message, false)
      }
      );
    }
  }
  cancel() {
    this.router.navigate(['/pages/usuarios/listar/']);
  }
  eliminar() {
    let datos: DialogData = { titulo: "Confirmacion", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true }
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe(result => {
      if (result === "Aceptar") {
        this.usuarioService.delete(this.formularioUsuario.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Usuario Eliminado", false)
          this.router.navigate(['/pages/usuarios/listar/']);
        }, err => {
          this.mostrarDialogMsj("Atención", err.message, false)
        }
        );
      }
    })
  }

  async getUser(dni: number){
    try{
      const data: any = await this.http.get(`${environment.apiRuceUrl}/persona_ruce/persona/${dni}`).toPromise();
      if(data.entities.length !== 0){
          const titulo="Persona Existente", msj="Desea cargar los datos de la persona existente?" , cancelVisible=true;
          const datos: DialogData = {titulo,msj,cancelVisible};
          const dialog = this.matDialog.open(DialogComponent, {
            width: '400px',
            data: datos
          });
          const result = await dialog.afterClosed().toPromise();
          if(result == "Aceptar"){
            this.formularioUsuario.patchValue({
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
            this.formularioUsuario.controls.fkRefTipoDocumentoRUCE.disable();
            this.formularioUsuario.controls.documento.disable();
            this.formularioUsuario.controls.cuil.disable();
            this.formularioUsuario.controls.nombre.disable();
            this.formularioUsuario.controls.apellido.disable();
            this.formularioUsuario.controls.telefono.disable();
            this.formularioUsuario.controls.email.disable();
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
