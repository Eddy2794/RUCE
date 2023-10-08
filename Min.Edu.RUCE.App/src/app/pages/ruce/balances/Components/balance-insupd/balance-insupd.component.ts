import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { BalanceService } from '../../Service/balance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { Subscription } from 'rxjs';
import { ObserverCooperadoraService } from '@app/pages/ruce/cooperadora/Services/observer-cooperadora.service';

@Component({
  selector: 'vex-balance-insupd',
  templateUrl: './balance-insupd.component.html',
  styleUrls: ['./balance-insupd.component.scss']
})
export class BalanceInsupdComponent implements OnInit {

  formularioBalance!: FormGroup;
  id: number = 0;
  idCooperadora!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  public accion: string = '';

  suscriptionIdCooperadora: Subscription;

  constructor(
    private fb: FormBuilder,
    private balanceService: BalanceService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio: ValidatorService,
    private router: Router,
    private route:ActivatedRoute,
    private matDialog: MatDialog,
    protected observerIdCooperadora: ObserverCooperadoraService,
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

    this.suscriptionIdCooperadora= this.observerIdCooperadora.castIdCooperadora.subscribe((value)=>{
      this.idCooperadora = value;
    });

    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.id);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.balanceService.findOne(this.id).subscribe((resp: any) => {
          this.formularioBalance.patchValue(resp.entities);
          //this.formularioBalance.controls.anio.patchValue(resp.entities.anio);
          //this.formularioBalance.controls.estadoBalance.patchValue(resp.entities.estadoBalance);

        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioBalance = this.fb.group({
      id: null,
      fkCooperadora: this.idCooperadora,
      estadoBalance: false,
      anio: [null, {validators: [ Validators.required, Validators.minLength(4), Validators.maxLength(4) ]}],
      fecha: [null, {validators: [Validators.required]}],
      estaActivo: true,
    },
    {
      //validators: [ this.validadorServicio.validarFechasInicioFin('inicioCargo','finCargo')]
    })
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioBalance.disable();
    }
  }

  save() {
    if (this.formularioBalance.invalid) {
      this.formularioBalance.markAllAsTouched();
      return;
    }
    // if (this.id == 0) {
    //   this.formularioBalance.markAllAsTouched();
    //   return;
    // }
    if (this.id == 0) {
      this.formularioBalance.removeControl('id');
      this.balanceService.create(this.formularioBalance.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Balance Creada", false)
        this.router.navigate(['/pages/cooperadoras/view/'+this.idCooperadora]);
      }, err => {
        this.mostrarDialogMsj("Balance", err.error.message, false)
      }
      );
    } else {
      //this.formularioBalance.value.anio = this.formularioBalance.value.anio;
      //this.formularioBalance.value.estadoBalance = this.formularioBalance.value.estadoBalance;
      this.balanceService.update(this.formularioBalance.value.id, this.formularioBalance.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Balance Modificado", false)
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
        this.balanceService.delete(this.formularioBalance.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Balance Eliminado", false)
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
