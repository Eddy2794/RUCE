import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { Subscription } from 'rxjs';
import { PersoneriaService } from '../../Services/personeria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ObserverCooperadoraService } from '@app/pages/ruce/cooperadora/Services/observer-cooperadora.service';

@Component({
  selector: 'vex-insupd-personeria',
  templateUrl: './insupd-personeria.component.html',
  styleUrls: ['./insupd-personeria.component.scss']
})
export class InsupdPersoneriaComponent implements OnInit, OnDestroy {

  formularioPersoneria!: FormGroup;
  id: number = 0;
  idCooperadora!: number;
  idExpediente!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  //tipoFondo = new Array<RefTipoFondoModel>;

  @Input() view!: string;
  public accion: string = '';

  suscriptionId: Subscription;

  constructor(
    private fb: FormBuilder,
    private personeriaService: PersoneriaService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
    private matDialog: MatDialog,
    protected observerCooperadora: ObserverCooperadoraService
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

    this.suscriptionId = this.observerCooperadora.castIdCooperadora.subscribe((value) => {
      if (value) this.idCooperadora= value;
    });
    
    this.suscriptionId = this.observerCooperadora.castIdExpediente.subscribe((value) => {
      if (value) this.idExpediente= value;
    });

    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.personeriaService.findOne(this.idCooperadora).subscribe((resp: any) => {
          this.formularioPersoneria.patchValue(resp.entities);
        });
      }
    });
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.suscriptionId.unsubscribe();
  }


  createForm() {
    this.formularioPersoneria = this.fb.group({
      id: null,
      fkCooperadora: this.idCooperadora,
      fkExpediente: this.idExpediente,
      fecha: [null, {validators: [ Validators.required, ]}],
      decreto: [null, {validators: [ Validators.required, ]}],
      nroResolucion: [null, {validators: [ Validators.required,  ]}],
      estaActivo: true,
    });
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioPersoneria.disable();
    }
  }

  save() {
    if (this.formularioPersoneria.invalid) {
      this.formularioPersoneria.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioPersoneria.removeControl('id');
      this.personeriaService.create(this.formularioPersoneria.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Personeria Creada", false)
        this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
      }, err => {
        this.mostrarDialogMsj("Atención", err.error.message, false)
      }
      );
    } else {
      this.personeriaService.update(this.formularioPersoneria.value.id, this.formularioPersoneria.value).subscribe(
        (resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Personeria Modificada", false)
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
        this.personeriaService.delete(this.formularioPersoneria.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Personeria Eliminada", false)
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
