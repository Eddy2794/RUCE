import { Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IBaseService } from '@app/pages/organismos/shared/services/interface/i-base.service';
import { SearchService } from '@app/pages/organismos/shared/services/search.service';
import { ColumnOptions, DataPage, FilterOptions, PaginateOptions } from '@app/pages/organismos/shared/utils';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],

})
export class TableComponent implements OnInit, OnDestroy {

  @Input() sourceService!: IBaseService<any>;
  @Input() columns!: ColumnOptions[];
  @Input() filter!: FilterOptions;
  @Input() routerLink!: string;
  @Input() searchOptions!: any[];//SearchOptions[];
  @Input() searchOptionsList!: any[];//SearchOptions[];
  @Input() buscarpor!: string;
  //@ViewChild('buscar') inputName: any;
  @ViewChild('etiqueta') etiquetaname: any;
  @Input() nameEntity!: string;

  bandera: boolean = false;
  valorbusq: any = this.filter;
  valorPrevio!: any;
  cambiaFiltro: boolean = false;

  dataPage!: DataPage<any>;
  paginate!: PaginateOptions;


  @ViewChild(MatPaginator) paginator!: MatPaginator;


  @Input() dataSource = new MatTableDataSource<any>([]);
  @Input() columnHeader!: string[];

  @Input() columnDefinition: string[];
  readonly objectKeys = Object.keys;
  isUnchanged = true;
  pageSize = Constants.pageSettings().pageSize; // default page size for the Table.
  pageSizeOptions: number[] = [10];
  pageProperties: PageEvent = Constants.pageSettings();
  // Column definition for the CRUD operations.
  actionColumnName = 'Actions';
  // since, its a crud table, therefore an enum has been defined representing those actions.
  readonly userActions: typeof UserActions = UserActions;

  // If this is set to true, then each time the user click the next page, an API call will be made to fetch the data.
  @Input() enableBackendPagination = false;
  // If this is set to true, then each time the user types something in the search text, an API call will be made to fetch the data.
  @Input() enableBackendSearch = false;

  // Tool Tips for the respective CRUD Operations. [define the absolute values from the parent]
  @Input() addRowText!: string;
  // @Input() readonly editRowText!: string;
  // @Input() readonly deleteRowText!: string;
  // @Input() readonly viewDetailRowText!: string;

  // Actions to be displayed for respective Table. [dnt forget to actionCalled event if any of them is enabled]
  @Input() readonly displayEditAction: boolean = true;
  @Input() readonly displayDeleteAction: boolean = true;
  @Input() readonly displayDetailAction: boolean = true;
  @Input() readonly displayCreateAction: boolean = true;

  // This is called to notify the parent which CRUD operation is called, along with the current row object.
  @Output() readonly actionCalled = new EventEmitter();
  // This is called to notify the parent when the next, previous or items per page is clicked.
  // If enableBackendPagination is set to true, a call is made to the Parent component, which in turn calls the API.
  @Output() readonly pageEventCalled = new EventEmitter();
  // This is called to notify the parent when the user types in something in the search field.
  // If enableBackendSearch is set to true, a call is made to the Parent component, which in turn calls the API.
  @Output() readonly searchCalled = new EventEmitter();

  // Respective components as per Angular Material Design Guidelines.
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  etiquetaShow: boolean = false;
  private parar$ = new Subject();

  constructor(public router: Router,
    private dialog: MatDialog,
    public searchService: SearchService) {
    // this.dataPage = new DataPage<any>();
    this.paginate = new PaginateOptions(1, 10);
  }

  ngOnInit(): void {
    this.searchService.setSearch = {estaActivo:true};
    this.valorbusq = JSON.parse(JSON.stringify(this.filter));

    this.observableSearch();
  }

  ngOnDestroy(): void {
    this.parar$.next(true);
    this.parar$.complete();
  }

  observableSearch() {
    this.searchService.obsSearch.pipe(takeUntil(this.parar$)).subscribe((search) => {
      console.log("Subcription SEARCH comp table");
      this.searchOptions = search;
      this.searchOption(this.searchOptions);
    })
  }

  searchOption(value: any) {
    this.filter = value;
    this.loadPage(this.filter);
    this.mostrarCriterios();
  }

  loadPage(filter: any = undefined) {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
      this.paginate.pageNumber = 1;
    }
    this.sourceService.filter(this.filter, this.paginate).subscribe((resp: any) => {
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

  edit(data: any) {
    this.router.navigate(['/pages/' + this.routerLink + '/add-edit', data.id]);
  }

  delete(data: any) {
    this.router.navigate(['/pages/' + this.routerLink + '/delete', data.id]);
  }

  closeDialog(): void {
    this.dialog.afterAllClosed.subscribe(() => {
    });
  }

  mostrarCriterios() {
    let st: string = '';
    let arrayform: any[] = new Array;
    for (let a in this.filter) {
      var i = Object.keys(this.filter).indexOf(a);
      if (!(a === 'estaActivo' || a === 'PageNumber')) {
        arrayform[i] = a;
      }
    }
    Object.entries(arrayform).forEach(([keyarr, valuearr]) => {
      Object.entries(this.filter).forEach(([keyfilt, valuefilt]) => {
        if (valuearr === keyfilt) {
          st = st + ' - ' + valuefilt;
        }

      });
    });
    if (this.etiquetaname) {
      if (st.substring(3) != '') {
        this.etiquetaname.nativeElement.value = 'Criterio de Búsqueda: "' + st.substring(3).toUpperCase() + '"';
        this.etiquetaShow = true;
      }
      else {
        this.etiquetaname.nativeElement.value = '';
        this.etiquetaShow = false;
      }
    }
  }
}

@Pipe({ name: 'mapingObject' })
export class TableMapObject implements PipeTransform {
  transform(value: any, path: string) {
    path.split('.').forEach((p) => value = value[p] == null? '' : value[p]);
    return value;
  }
}

export enum UserActions {
  Add = 'ADD',
  Details = 'DETAILS',
  Update = 'UPDATE',
  Delete = 'DELETE',
  Cancel = 'CANCEL',
}

export class Constants {
  public static apiRoot = '/api';
  public static API_VERSIONS = {
    Version1: 'version1',
  };
  public static pageSettings(): PageEvent {
    return {
      length: 0,
      pageIndex: 0,
      pageSize: 10,
    };
  }
  public static pageSizeOptions: number[] = [10];
}

