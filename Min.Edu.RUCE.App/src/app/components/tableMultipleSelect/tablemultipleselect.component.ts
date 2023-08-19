import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IBaseService } from '@app/shared/services/interface/i-base.service';
import { SearchService } from '@app/shared/services/search.service';
import { SelectService } from '@app/shared/services/select.service';
import { ColumnOptions, DataPage, FilterOptions, PaginateOptions } from '@app/shared/utils';
import { Subject, takeUntil } from 'rxjs';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { Constants } from '../table/table.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'vex-tablemultipleselect',
  templateUrl: './tablemultipleselect.component.html',
  styleUrls: ['./tablemultipleselect.component.scss'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
})
export class TableMultipleSelectComponent implements OnInit, OnDestroy {
  displayedColumns: any;
  listIdsOrigen: any[] = [];
  listIdsElim: number[] = [];
  listChecked: number[] = [];
  @Input() sourceService!: IBaseService<any>;
  @Input() listaIdsSelect!: any[];
  @Input() columns!: ColumnOptions[];
  @Input() filter!: FilterOptions;
  @Input() routerLink!: string;
  @Input() buscarpor!: string;
  @Input() searchOptions!: any[];
  dataPage!: DataPage<any>;
  paginate!: PaginateOptions;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() dataSource = new MatTableDataSource<any>([]);
  @Input() columnHeader!: string[];

  @Input() columnDefinition: any = {};
  readonly objectKeys = Object.keys;
  isUnchanged = true;
  pageSize = Constants.pageSettings().pageSize;
  pageSizeOptions: number[] = [10];
  pageProperties: PageEvent = Constants.pageSettings();
  actionColumnName = 'Actions';

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private parar$: Subject<boolean> = new Subject();


  constructor(public router: Router,
    private cd: ChangeDetectorRef,
    public searchService: SearchService,
    public selectService: SelectService) {

    this.dataPage = new DataPage<any>();
    this.paginate = new PaginateOptions(1, 10);

  }
  ngOnDestroy(): void {
    this.parar$.next(true);
    this.parar$.complete();

  }

  ngOnInit(): void {
    this.searchService.setSearch = this.filter;
    this.observableSearch();
  }
  observableSearch() {
    this.searchService.obsSearch.pipe(takeUntil(this.parar$)).subscribe((search) => {
      localStorage.setItem('filtroList', JSON.stringify(search));
      const unFiltro = JSON.parse(localStorage.getItem('filtroList'));
      let filter: FilterOptions = unFiltro;
      this.searchOption(filter);
    })
  }
  searchOption(value: FilterOptions) {
    if (value.estaActivo === undefined) {
      value.estaActivo = true;
    }
    if (value) {
      if (this.filter !== value) {
        if (this.paginate.pageNumber != 1) {
          this.paginator.pageIndex = 0;
          this.paginate = new PaginateOptions(this.paginator.pageIndex === 0 ? 1 : (this.paginator.pageIndex + 1), this.paginator.pageSize = 10);

        }
        this.filter = value;
        this.loadPage(this.filter);

      }
    }
  }
  loadPage(filter: FilterOptions) {
    // if (this.paginator) {
    //   this.paginator.pageIndex = 0;
    //   this.paginate.pageNumber = 1;
    // }
    this.sourceService.filter(filter, this.paginate).subscribe((resp: any) => {
      this.dataSource.data = resp.entities || [];
      this.dataPage = resp.entities;
      this.dataSource.sort = this.sort;
      this.pageProperties.length = resp.paged.entityCount;
    });

  }
  pageChanged(pageEvent: PageEvent) {
    this.paginate = new PaginateOptions(this.paginator.pageIndex == 0 ? 1 : (this.paginator.pageIndex + 1), this.paginator.pageSize);
    this.sourceService.filter(this.filter, this.paginate).subscribe((resp: any) => {
      this.dataSource.data = resp.entities || [];
      this.dataSource.sort = this.sort;
      this.pageProperties.length = resp.paged.entityCount;
    });
  }
  canbeChecked(id): boolean {
    for (let elemento of this.listaIdsSelect) {
      var cadena = new String(elemento);
      var index = cadena.indexOf("&")

      this.listChecked.push(+cadena.substring(0, index));

    }
    return this.listChecked.includes(id);
  }
  onChange(event: any, row: any) {
    if (event.checked) {
      let columna = 'row.' + this.columns[1].property
      this.listaIdsSelect.push(row.id + '&' + eval(columna));
      this.listIdsOrigen.push(row.id + '&' + eval(columna));
    }
    else {
      let columna = 'row.' + this.columns[1].property;
      const index = this.listaIdsSelect.indexOf(row.id + '&' + eval(columna));
      this.listIdsElim.push(row.id);
      this.listaIdsSelect.splice(index, 1);
    }
  }

  aceptar() {
    this.selectService.setMultipleSelect = this.listaIdsSelect;
  }
  cerrarPopUp() {
    for (let index = 0; index < this.listIdsOrigen.length; index++) {
      const element = this.listIdsOrigen[index];
      const indice = this.listaIdsSelect.indexOf(element);
      this.listaIdsSelect.splice(indice, 1);
    }
    for (let index = 0; index < this.listIdsElim.length; index++) {
      const element = this.listIdsElim[index];
      this.listaIdsSelect.push(element);
    }

    this.selectService.setMultipleSelect = this.listaIdsSelect;
  }
}
