import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { KioscoService } from '../../Services/kiosco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';

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

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private kioscoService: KioscoService,
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
      this.id = parseInt(param.idkiosco);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.kioscoService.findOne(this.id).subscribe((resp: any) => {
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioKiosco = this.fb.group({
      id: null,
      fkCooperadora: this.idCooperadora,
      fkPersonaRUCE: null,
      accesoLicitacion: [null, {validators: [ Validators.required, ]}],
      documentacionPresentada: [null, {validators: [ Validators.required,  ]}],
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
    console.log(this.formularioKiosco);
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
        this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
      }
      );
    } else {
      //this.formularioKiosco.value.fkTipoFondo = this.formularioKiosco.value.fkTipoFondo?.id;
      
      this.kioscoService.update(this.formularioKiosco.value.id, this.formularioKiosco.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Kiosco Modificado", false)
        this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
      }, err => {
        this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
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
