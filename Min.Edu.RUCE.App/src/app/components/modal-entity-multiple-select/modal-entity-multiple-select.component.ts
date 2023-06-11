import { Component, Inject,  OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-modal-entity-multiple-select',
  templateUrl: './modal-entity-multiple-select.component.html',
  styleUrls: ['./modal-entity-multiple-select.component.css']
})
export class ModalEntityMultipleSelectComponent implements OnInit {

  displayedColumns:any;
  selectedRows: any[] = [];
  dataSource: MatTableDataSource<any>[] = [];

  constructor(  public dialogRef: MatDialogRef<ModalEntityMultipleSelectComponent>, 
                @Inject(MAT_DIALOG_DATA) public data: any) { 
                  this.dataSource = data.dataSource;
                }


  ngOnInit(): void {
    this.displayedColumns = [ 'select', 'id', this.data.nombreColumnaDesc];

    if (this.data.selectedRows != undefined) {
      let respArray = this.data.selectedRows as Array<any>;
      respArray = respArray.map(x => x.id);
      this.dataSource.forEach((element:any )=> {
        if (respArray.includes(element.id)) {
          this.selectedRows.push(element);
          element.position = true;
        } else{
          element.position = false;
        }         
      });
    }
  }

  seleccionar(event: any, row: any){  
    if (event.checked) {
      this.selectedRows.push(row);
    }else{
      this.selectedRows =  this.selectedRows.filter(i=> i !== row); //elimina
    }     
  }

  volver(){       
    this.dialogRef.close( this.selectedRows );
  }
}
