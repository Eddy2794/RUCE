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
import { Constants } from '../table/table.component';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.css']
})
export class TableSelectComponent implements OnInit, OnDestroy {
  displayedColumns: any;
  @Input() sourceService!: IBaseService<any>;
  @Input() columns!: ColumnOptions[];
  @Input() filter!: FilterOptions;
  @Input() routerLink!: string;
  @Input() buscarpor!: string;
  @Input() searchOptions!: any[];
  //bandera: boolean = false;
  dataPage!: DataPage<any>;
  paginate!: PaginateOptions;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() dataSource = new MatTableDataSource<any>([]);
  @Input() columnHeader!: string[];

  @Input() columnDefinition: any = {};
  readonly objectKeys = Object.keys;
  isUnchanged = true;
  pageSize = Constants.pageSettings().pageSize; // default page size for the Table.
  pageSizeOptions: number[] = [10];
  pageProperties: PageEvent = Constants.pageSettings();
  actionColumnName = 'Actions';
  // readonly userActions: typeof UserActions = UserActions;


  // @Input() readonly editRowText!: string;
  // @Input() readonly deleteRowText!: string;
  // @Input() readonly viewDetailRowText!: string;


  // @Output() readonly actionCalled = new EventEmitter();
  @Output() readonly pageEventCalled = new EventEmitter();
  // @Output() readonly searchCalled = new EventEmitter();

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  private parar$: Subject<boolean> = new Subject();
  constructor(
    public router: Router,
    private cd: ChangeDetectorRef,
    public searchService: SearchService,
    public selectService: SelectService) {

    this.dataPage = new DataPage<any>();
    this.paginate = new PaginateOptions(1, 10);

  }
  ngOnInit(): void {

    this.searchService.setSearch = this.filter;
    this.observableSearch();

  }

  ngOnDestroy(): void {
    this.parar$.next(true);
    this.parar$.complete();
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
    if (!pageEvent || !this.pageEventCalled) {
      return;
    }
    this.paginate = new PaginateOptions(this.paginator.pageIndex == 0 ? 1 : (this.paginator.pageIndex + 1), this.paginator.pageSize);
    this.sourceService.filter(this.filter, this.paginate).subscribe((resp: any) => {
      this.dataSource.data = resp.entities || [];
      this.dataSource.sort = this.sort;
      this.pageProperties.length = resp.paged.entityCount;
    });
  }

  seleccionar(row: any) {
    if (row != null) {
      this.selectService.setSelect = row;
    }
  }

}


