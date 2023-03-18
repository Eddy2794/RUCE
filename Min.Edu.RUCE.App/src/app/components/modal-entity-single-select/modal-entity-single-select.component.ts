import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-entity-single-select',
  templateUrl: './modal-entity-single-select.component.html',
  styleUrls: ['./modal-entity-single-select.component.css']
})
export class ModalEntitySingleSelectComponent implements OnInit {

  displayedColumns:any;
  
  constructor( public dialogRef: MatDialogRef<ModalEntitySingleSelectComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {    
    
    this.displayedColumns = [ 'id', this.data.nombreColumnaDesc];
  }

  seleccionar(row: any){   
    this.dialogRef.close(row)
  }

  click(){
    this.dialogRef.close();
  }

  
}
