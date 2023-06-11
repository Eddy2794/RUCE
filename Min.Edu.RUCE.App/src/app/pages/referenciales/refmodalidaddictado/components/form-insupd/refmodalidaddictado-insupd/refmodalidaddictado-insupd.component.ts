import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent, DialogData } from '@app/components/dialog/dialog.component';
import { ValidatorService } from '@app/shared/validators/validator.service';
import { RefmodalidaddictadoService } from '../../../services/refmodalidaddictado.service';

@Component({
  selector: 'app-refmodalidaddictado-insupd',
  templateUrl: './refmodalidaddictado-insupd.component.html',
  styleUrls: ['./refmodalidaddictado-insupd.component.css']
})
export class RefmodalidaddictadoInsupdComponent implements OnInit {
  formModalidadDictado!: FormGroup;
  id: number = 0;
  accion: string ='';
  
  constructor(private fb: FormBuilder,
    private refmodalidaddictadoService: RefmodalidaddictadoService,
    private activatedRoute: ActivatedRoute,
    private validadorServicio : ValidatorService,
    private router: Router,
    private matDialog: MatDialog) { 
      this.activatedRoute.url.subscribe((parameter:any)=>{
        this.accion = (parameter[0].path); 
      });
     this.createForm();
     this.activatedRoute.params.subscribe( (param: any) => {
       this.id = parseInt(param.id);
       if (this.id !== 0) {
         this.refmodalidaddictadoService.findOne(this.id).subscribe((resp: any) => {
           this.formModalidadDictado.patchValue(resp.entities[0]);
         });
       }
     });
    }

  ngOnInit(): void {
  }

  createForm(){   
    var year = new Date().getFullYear();
    this.formModalidadDictado = this.fb.group({
      id: null,
      modalidadDictadoDesc: [null, {validators: [Validators.required, Validators.minLength(3), this.validadorServicio.validarCaracteresDescripcion(), Validators.maxLength(50),this.validadorServicio.validarEspaciosInicioFin()]}],
      estaActivo:true
    })
    if(this.accion === 'delete' ){
      this.formModalidadDictado.controls['modalidadDictadoDesc'].disable();
    }
  }
  
  save(){
    if (this.formModalidadDictado.invalid) {
      this.formModalidadDictado.markAllAsTouched();
      return;     
    }
    if(this.id==0){
      this.formModalidadDictado.removeControl('id');
      this.refmodalidaddictadoService.create(this.formModalidadDictado.value).subscribe((resp: any)=> {
        this.mostrarDialogMsj("Mensaje", "Modalidad de dictado creada", false)
        this.router.navigate(['/pages/refmodalidaddictado']);
      },err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    } else {
      this.refmodalidaddictadoService.update(this.formModalidadDictado.value.id,this.formModalidadDictado.value).subscribe((resp: any)=> {
        this.mostrarDialogMsj("Mensaje", "Modalidad de dictado modificada", false)
        this.router.navigate(['/pages/refmodalidaddictado']);
      },err => {
        this.mostrarDialogMsj("Atención", err.error.errors, false)
      }
      );
    }
  }
  
  cancel(){
    this.router.navigate(['/pages/refmodalidaddictado']);
  }
  
  eliminar(){
    let datos: DialogData = { titulo: "Confirmación", msj: "¿Esta seguro que desea eliminar?", cancelVisible: true}
    const dialog = this.matDialog.open(DialogComponent, {
      width: '300px',
      data: datos
    });

    dialog.afterClosed().subscribe( result => {
      if (result === "Aceptar") {
        this.refmodalidaddictadoService.delete(this.formModalidadDictado.value.id).subscribe((resp: any)=> {
          this.mostrarDialogMsj("Mensaje","Modalidad de dictado eliminada", false)
          this.router.navigate(['/pages/refmodalidaddictado']);
        },err => {
          this.mostrarDialogMsj("Atención", err.error.errors, false)
        }); 
      }
    })
  }

  mostrarDialogMsj(titulo: string, msj: string, cancelVisible: boolean){
    let datos: DialogData = { titulo, msj, cancelVisible}
    this.matDialog.open(DialogComponent, {
      width: '200px',
      data: datos
    });
  }

}
