import { Component,  Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SearchService } from '@app/shared/services/search.service';
import { IObjetoModalMultiple } from '@app/shared/utils/multiple-modal.interface';
import * as moment from 'moment';
import { ModalEntityMultipleSelectComponent } from '../modal-entity-multiple-select/modal-entity-multiple-select.component';
import { ModalEntitySingleSelectComponent } from '../modal-entity-single-select/modal-entity-single-select.component';

@Component({
  selector: 'app-modal-search-generic',
  templateUrl: './modal-search-generic.component.html',
  styleUrls: ['./modal-search-generic.component.css']
})
export class ModalSearchGenericComponent {

  searchOptions: any;

  readonly objectKeys = Object.keys;
  public form!: FormGroup;
  formuRange!: FormGroup;
  
  valoresActuales: IObjetoModalMultiple[] = [];

  constructor(  public dialogRef: MatDialogRef<ModalSearchGenericComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: any,
                public searchService: SearchService,
                public dialog: MatDialog) {

    let fieldsCtrls: any = {};   
    if (data) {
      this.searchOptions = data.options;      

      let cantForm: number = 0;
      for (let f of this.searchOptions) {
        switch (f.typeControl) {
          case 'modal-multiple-selection':
            fieldsCtrls[f.name] = new FormArray([
              // new FormGroup({
              //   id: new FormControl(''),
              //   valor: new FormControl('')
              // })
            ]);
            break;
          case 'modal-single-selection':
            fieldsCtrls[f.name] = new FormControl('');
            fieldsCtrls[f.property] = new FormControl('');
            break;
          case 'rangedatepicker':   
            this.formuRange = new FormGroup({
              inicio: new FormControl<Date | null>(null),
              fin: new FormControl<Date | null>(null),
            });
            fieldsCtrls[f.name] = this.formuRange;
            cantForm++;
            break;
          case 'checkbox':   
          case 'datepicker':
          case 'radio':
          case 'input':           
          case 'select':
            fieldsCtrls[f.name] = new FormControl(f.value || '', f.validators);
            break;
        }
        
        this.form = new FormGroup(fieldsCtrls);
      }
      this.form.markAsPristine();
    }
  }

  cambioValor(nombreFormControl: string, valor: any){
    if (valor === 'Seleccione'){
      this.form.controls[nombreFormControl].markAsPristine();
    }else{
      this.form.controls[nombreFormControl].markAsDirty();
    }
  }

 

  openDialogSingle(dataSource:any, nombreColumnaDesc: string, nombreEntidad:string, label: string){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '588px';
    dialogConfig.data = {
      dataSource,
      nombreColumnaDesc,
      nombreEntidad,
      label
    }
    const dialogRef = this.dialog.open(ModalEntitySingleSelectComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(resp=>{
      console.log(resp);      
      if (resp != undefined) {        
        this.form.controls[nombreEntidad].setValue(resp['id']);
        this.form.controls[nombreEntidad].markAsTouched();
        this.form.controls[nombreColumnaDesc].setValue( resp[nombreColumnaDesc] );
        this.form.controls[nombreColumnaDesc].markAsDirty();
        this.form.controls[nombreEntidad].markAsDirty();
      }
    });
  }

  openDialogMultiple(dataSource1:any, nombreColumnaDesc: string, nombreEntidad:string, label: string){
    
    //le quito el position, porque cuando viene del modal, toma como referencia la direccion de searchoptions[i].value,
    //entonces cada vez que lo pasa, lo pasa ya con los position de la vez anterior (y no pude sacarle la referencia de ninguna forma, porque al parecer lo toma de 
    //manera dinamica del template), asi que lo hago de esta forma:
    let dataSource = dataSource1.map(({position, ...x}: any)=> x); 

    let valoresModalActual = this.valoresActuales.find(x=> x.nombreModal == nombreEntidad);
    if (valoresModalActual === undefined) {
      this.valoresActuales.push({
        nombreModal: nombreEntidad,
        valores: []
      });
      valoresModalActual = this.valoresActuales.find(x=> x.nombreModal == nombreEntidad);
    }

    let multipleCheckForm = this.arrayMultipleCheck(nombreEntidad);    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '588px';
    dialogConfig.data = {
      dataSource,
      nombreColumnaDesc,
      nombreEntidad,
      label,
      selectedRows: valoresModalActual!.valores
    }
    const dialogRef = this.dialog.open(ModalEntityMultipleSelectComponent, dialogConfig);   
    
    
    dialogRef.afterClosed().subscribe((resp: any[])=>{
      multipleCheckForm.clear();
      if (resp != undefined) {   
        this.valoresActuales.find(x=> x.nombreModal == nombreEntidad)!.valores = resp;      
        
        resp.forEach(element => {
          multipleCheckForm.push(new FormGroup({
            id: new FormControl ([element['id']]),
            valor: new FormControl([element[nombreColumnaDesc]])
          }));
          multipleCheckForm.markAsDirty();
          multipleCheckForm.markAsTouched();
        });        
      }
    });
  }

  close() {
    this.dialogRef.close(false);
  }

  searchEmmit(data: any) {
    let filter: any = { estaActivo: true };
    for (let field in data.controls) { // 'field' is a string      
      const control = data.get(field);
      if (moment.isMoment(control.value)){
        control.value = moment(control.value).format('YYYY-MM-DD')
      }
      if (control?.touched && control?.value != undefined) {       
          filter[field] = control?.value;
      }
    }
    if (filter) {
      this.searchService.setSearch = filter;
    }
    this.dialogRef.close(true);
  }

  arrayMultipleCheck(nombre: string){
    return this.form.get(nombre) as FormArray;
  }
  
  eliminar(nombre: string, indice: number){ 
    let valoresModalActual = this.valoresActuales.find(x=> x.nombreModal == nombre);
    valoresModalActual?.valores.splice(indice, 1);   

    this.arrayMultipleCheck(nombre).removeAt(indice);
  }
  
  verform(){
    console.log(this.form);
  }
  
  deshabilitar() {
    let arrayform: any[] = new Array;
    for (let a in this.form.controls) {
      var i = Object.keys(this.form.controls).indexOf(a);
      arrayform[i] = a;
    }
    if (this.form.controls['id'].value != '') {
      for (var i = 0; i < arrayform.length; i++) {
        if (arrayform[i] != 'id') {
          this.form.controls[arrayform[i]].patchValue('');
          this.form.controls[arrayform[i]].disable();
        }else{
          this.form.controls[arrayform[i]].enable();
        }
      }
    } else {
      for (var i = 0; i < arrayform.length; i++) {
        this.form.controls[arrayform[i]].enable();
      }
    }    
  }
  

}

