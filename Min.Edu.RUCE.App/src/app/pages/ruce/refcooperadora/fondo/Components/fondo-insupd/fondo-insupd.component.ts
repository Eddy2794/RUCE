import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataPage, FilterOptions } from '@app/shared/utils';
import { FondoService } from '../../Services/fondo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { RefTipoFondoService } from '@app/pages/ruce/ref-ruce/Services/reftipofondo.service';
import { RefTipoFondoModel } from '@app/pages/ruce/ref-ruce/Model/reftipofondo-model';

@Component({
  selector: 'vex-fondo-insupd',
  templateUrl: './fondo-insupd.component.html',
  styleUrls: ['./fondo-insupd.component.scss']
})
export class FondoInsupdComponent implements OnInit {

  formularioFondo!: FormGroup;
  id: number = 0;
  idCooperadora!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  tipoFondo = new Array<RefTipoFondoModel>;

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private fondoService: FondoService,
    private refTipoFondoService: RefTipoFondoService,
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
    this.loadRefs();
    this.idCooperadora = this.route.snapshot.params['id'];
    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.idAtencionSeguimiento);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.fondoService.findOne(this.id).subscribe((resp: any) => {
        });
      }
    });
  }

  ngOnInit(): void {
  }

  loadRefs() {
    this.refTipoFondoService.filter(this.filtro).subscribe((data: DataPage<RefTipoFondoModel>) => {
      this.tipoFondo = Object.assign([],data.entities,this.tipoFondo);
    })
  }

  createForm() {
    this.formularioFondo = this.fb.group({
      id: null,
      fkCooperadora: this.idCooperadora,
      fkTipoFondo: [null, {validators: [ Validators.required, ]}],
      fondoRecibido: [null, {validators: [ Validators.required, ]}],
      fondoRendido: [null, {validators: [ Validators.required,  ]}],
      monto: [null, {validators: [ Validators.required, ]}],
      fechaRecibido: [null, {validators: [ Validators.required, ]}],
      fechaRendicion: [null, {validators: [ Validators.required, ]}],
      anioOtorgado: [null, {validators: [ Validators.required, ]}],
      estaActivo: true,
    },
    {
      validators: [ this.validadorServicio.validarFechasInicioFin('fechaRecibido','fechaRendicion')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioFondo.disable();
    }
    console.log(this.formularioFondo);
  }

  save() {
    if (this.formularioFondo.invalid) {
      this.formularioFondo.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioFondo.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioFondo.removeControl('id');
      this.formularioFondo.value['fondoRecibido'] = this.formularioFondo.value['fondoRecibido']?.toString()
      this.formularioFondo.value['fondoRendido'] = this.formularioFondo.value['fondoRendido']?.toString()
      this.fondoService.create(this.formularioFondo.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Fondo Creado", false)
        this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.formularioFondo.value.fkTipoFondo = this.formularioFondo.value.fkTipoFondo?.id;
      
      this.fondoService.update(this.formularioFondo.value.id, this.formularioFondo.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Fondo Modificado", false)
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
        this.fondoService.delete(this.formularioFondo.value.id).subscribe((resp: any) => {
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
