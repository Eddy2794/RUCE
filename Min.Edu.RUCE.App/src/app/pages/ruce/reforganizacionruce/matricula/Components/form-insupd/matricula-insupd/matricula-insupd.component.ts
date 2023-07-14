import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils';
import { MatriculaService } from '../../../Services/matricula-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

@Component({
  selector: 'vex-matricula-insupd',
  templateUrl: './matricula-insupd.component.html',
  styleUrls: ['./matricula-insupd.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class MatriculaInsupdComponent implements OnInit {

  formularioMatricula!: FormGroup;
  id: number = 0;
  idOrganizacion!: number;
  filtro: FilterOptions = { estaActivo: true, PageSize: 10,};

  public accion: string = '';

  constructor(
    private fb: FormBuilder,
    private matriculaService: MatriculaService,
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
    this.idOrganizacion = this.route.snapshot.params['id'];
    console.log(this.idOrganizacion);
    this.createForm();
    this.activatedRoute.params.subscribe((param: any) => {
      this.id = parseInt(param.idMatricula);
      if (this.id !== 0) {
        if (this.accion !== 'delete'){
          this.accion = 'edit'
        }
        this.matriculaService.findOne(this.id).subscribe((resp: any) => {
          this.formularioMatricula.patchValue(resp.entities);
          this.formularioMatricula.controls.periodoLectivo.patchValue(resp.entities.periodoLectivo);
          this.formularioMatricula.controls.matricula.patchValue(resp.entities.matricula);
        });
      }
    });
  }

  ngOnInit(): void {
  }

  createForm() {
    this.formularioMatricula = this.fb.group({
      id: null,
      fkOrganizacionRUCE: this.idOrganizacion,
      periodoLectivo: [null, {validators: [ Validators.required, Validators.min(1900) ]}],
      matricula: [null, {validators: [ Validators.required, ]}],
      estaActivo: true,
    },)
    if (this.accion === 'delete'|| this.accion === 'view') {
      this.formularioMatricula.disable();
    }
    console.log(this.formularioMatricula);
  }

  save() {
    if (this.formularioMatricula.invalid) {
      this.formularioMatricula.markAllAsTouched();
      return;
    }
    if (this.id == 0) {
      this.formularioMatricula.removeControl('id');
      this.formularioMatricula.value['periodoLectivo'] = this.formularioMatricula.value['periodoLectivo']?.toString()
      this.formularioMatricula.value['matricula'] = this.formularioMatricula.value['matricula']?.toString()
      this.matriculaService.create(this.formularioMatricula.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Matricula Creada", false)
        this.router.navigate(['/pages/establecimientos/view/'+this.idOrganizacion]);
      }, err => {
        this.mostrarDialogMsj("Atención", JSON.stringify(err.error.errors), false)
      }
      );
    } else {
      this.formularioMatricula.value.fkOrganizacionRUCE = this.formularioMatricula.value.fkOrganizacionRUCE?.id;
      
      this.matriculaService.update(this.formularioMatricula.value.id, this.formularioMatricula.value).subscribe((resp: any) => {
        this.mostrarDialogMsj("Mensaje", "Matricula Modificada", false)
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
        this.matriculaService.delete(this.formularioMatricula.value.id).subscribe((resp: any) => {
          this.mostrarDialogMsj("Mensaje", "Matricula Eliminado", false)
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
