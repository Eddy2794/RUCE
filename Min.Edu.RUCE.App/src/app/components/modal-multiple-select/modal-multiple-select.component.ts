import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBaseService } from '@app/shared/services/interface/i-base.service';
import { SelectService } from '@app/shared/services/select.service';
import { ColumnOptions, FilterOptions, PaginateOptions } from '@app/shared/utils';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'vex-modal-multiple-select',
  templateUrl: './modal-multiple-select.component.html',
  styleUrls: ['./modal-multiple-select.component.scss']
})
export class ModalMultipleSelectComponent implements OnInit, OnDestroy {
  displayedColumns: any;
  @Input() entitieService!: IBaseService<any>;
  @Input() listIds!: number[];
  @Input() searchOptions!: SearchOptionsGeneric[];
  columns!: any;
  paginate: PaginateOptions = new PaginateOptions(1, 10);
  private parar$: Subject<boolean> = new Subject();
  filtroAux: FilterOptions = {estaActivo: true};

  constructor(public dialogRef: MatDialogRef<ModalMultipleSelectComponent>,
    public selectService: SelectService,
    public cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectService.setMultipleSelect = null;;
    this.displayedColumns = ['id', this.data.nombreColumnaDesc,this.data.nombreCol2,this.data.nombreCol3,this.data.nombreCol4,this.data.nombreCol5, 'accion'];
    this.setColumns(this.data.nombreColumnaDesc, this.data.label, this.data.nombreCol2, this.data.label2, this.data.nombreCol3, this.data.label3,
      this.data.nombreCol4, this.data.label4,this.data.nombreCol5, this.data.label5);
    this.observableSelect();
    this.entitieService = this.data.dataSource;

    Object.assign(this.filtroAux, this.data.filtro)
  }
  ngOnDestroy(): void {
    this.parar$.next(true);
    this.parar$.complete();
  }

  ngOnInit(): void {
    this.selectService.setMultipleSelect = null;;
    this.displayedColumns = ['id', this.data.nombreColumnaDesc,this.data.nombreCol2,this.data.nombreCol3,
    this.data.nombreCol4,this.data.nombreCol5, 'accion'];
    this.setColumns(this.data.nombreColumnaDesc, this.data.label, this.data.nombreCol2,this.data.label2, this.data.nombreCol3, this.data.label3,
      this.data.nombreCol4, this.data.label4,this.data.nombreCol5, this.data.label5);
    this.observableSelect();
    this.entitieService = this.data.dataSource;
    this.listIds = this.data.listIds;

  }
  observableSelect() {
    this.selectService.obsSelectMultiple.pipe(takeUntil(this.parar$)).subscribe((search) => {
      let value = search;
      if (value != null) {
        this.dialogRef.close(value);
      }
    })
  }
  private setColumns(nombreColumna: string, nombreEntidad: string,nombreColumna2: string, nombreEntidad2: string,nombreColumna3: string, nombreEntidad3: string,
    nombreColumna4: string, nombreEntidad4: string,nombreColumna5: string, nombreEntidad5: string, ) {
    this.columns = [
      new ColumnOptions('id', 'Código', ColumnOptions.TYPE_INTEGER),
      new ColumnOptions(nombreColumna, nombreEntidad, ColumnOptions.TYPE_TEXT),
      new ColumnOptions(nombreColumna2, nombreEntidad2, ColumnOptions.TYPE_OBJECT),
      new ColumnOptions(nombreColumna3, nombreEntidad3, ColumnOptions.TYPE_TEXT),
      new ColumnOptions(nombreColumna4, nombreEntidad4, ColumnOptions.TYPE_TEXT),
      new ColumnOptions(nombreColumna5, nombreEntidad5, ColumnOptions.TYPE_OBJECT),
      new ColumnOptions('action', 'Selección', ColumnOptions.TYPE_TEXT)
    ]
  }

}
