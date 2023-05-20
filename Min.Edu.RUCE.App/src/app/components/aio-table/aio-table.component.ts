import { AfterViewInit, Component, Input, OnInit, Pipe, PipeTransform, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import { SelectionModel } from '@angular/cdk/collections';
import { fadeInUp400ms } from '../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../@vex/animations/stagger.animation';
import { UntypedFormControl } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IBaseService } from '@app/pages/organismos/shared/services/interface/i-base.service';
import { DataPage, FilterOptions, PaginateOptions } from '@app/pages/organismos/shared/utils';
import { SearchService } from '@app/pages/organismos/shared/services/search.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';


@UntilDestroy()
@Component({
  selector: 'vex-aio-table',
  templateUrl: './aio-table.component.html',
  styleUrls:['./aio-table.component.css'],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})


export class AioTableComponent implements OnInit, AfterViewInit, OnDestroy {

  layoutCtrl = new UntypedFormControl('boxed');

  @Input()
  columns: TableColumn<any>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'Image', property: 'image', type: 'image', visible: true },
    { label: 'Name', property: 'name', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'First Name', property: 'firstName', type: 'text', visible: false },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: false },
    { label: 'Contact', property: 'contact', type: 'button', visible: true },
    { label: 'Address', property: 'address', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Street', property: 'street', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Zipcode', property: 'zipcode', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'City', property: 'city', type: 'text', visible: false, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Phone', property: 'phoneNumber', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Labels', property: 'labels', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];

  @Input() datosTabla: any;
  @Input() sourceService!: IBaseService<any>;
  @Input() filter!: FilterOptions;
  @Input() ruta!: string;
  @Input() public nombreTabla: string;
  @ViewChild('etiqueta') etiquetaname: any;
  etiquetaShow: boolean = false;
  pageSize = Constants.pageSettings().pageSize; // default page size for the Table.
  pageSizeOptions: number[] = [10];
  pageProperties: PageEvent = Constants.pageSettings();

  dataPage!: DataPage<any>;
  paginate!: PaginateOptions;
 
  dataSource: MatTableDataSource<any> | null;

  selection = new SelectionModel<any>(true, []);
  searchCtrl = new UntypedFormControl();
  filtroActual: any;
  
  etiquetaBusqueda: string = '';
  path: string[] = [];
  private parar$ = new Subject();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(  private dialog: MatDialog,
                public searchService: SearchService,
                public router: Router) {
    this.dataPage = new DataPage<any>();
    this.paginate = new PaginateOptions(1, 10);
  }
  
  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }
  
  ngOnInit() {   
    this.path.push(this.nombreTabla);
    this.searchService.setSearch = {estaActivo:true};
    this.filtroActual = this.filter;
    this.dataSource = new MatTableDataSource();
    //this.loadPage();
    this.observableSearch();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.parar$.next(true);
    this.parar$.complete();
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  observableSearch(){
    this.searchService.obsSearch.pipe(takeUntil(this.parar$)).subscribe((search)=>{
      //if (Object.entries(search).length > 0) {
        this.searchOption(search);  
        //}
      })
  }

  searchOption(value: any) {
    if (value) {
      this.filter = value;
      if (this.filtroActual != this.filter) {        
        this.filter.estaActivo = true;
        Object.assign(this.filter, { PageNumber: this.paginator === undefined ? 1 : this.paginator.firstPage() });
      }else{        
        this.filter.estaActivo = true;
        Object.assign(this.filter, { PageNumber: this.paginator.pageIndex });
      }
      
      this.loadPage(this.filter);
      this.mostrarCriterios();
    }else{
      this.loadPage();
    }
  }

  loadPage(filter: any = undefined) {
    let filterSearch: any;
    filterSearch = filter ?? this.filter;
    this.sourceService.filter(this.filter, this.paginate).subscribe((resp: any) => {
      this.dataSource.data = resp.entities || [];
      this.dataPage = resp.entities;
      this.dataSource.sort = this.sort;
      this.pageProperties.length = resp.paged.entityCount;      
    });

  }

   confirmar(data: any) {
     this.router.navigate(['/pages/' + this.ruta + '/confirm', data.id]);
   }
   
  modificar(data: any) {
    this.router.navigate(['/pages/' + this.ruta + '/add-edit', data.id]);

  }

  eliminar(data: any) {
    this.router.navigate(['/pages/' + this.ruta + '/delete', data.id]);

  }
  pageChanged(pageEvent: PageEvent) {
  
    if (this.filter == this.filtroActual) {
      //va a la pagina siguiente:
      Object.assign(this.filter, { PageNumber: this.paginator.pageIndex +1});
      if (this.paginator.pageIndex<1){
        Object.assign(this.filter, { PageNumber: 1 });
      }
    }else{
      //actualiza filtro actual
      this.filtroActual = this.filter;
    }

    this.paginate = new PaginateOptions(this.paginator.pageIndex == 0 ? 1 : (this.paginator.pageIndex + 1), this.paginator.pageSize);
    this.sourceService.filter(this.filter, this.paginate).subscribe((resp: any) => {
      this.dataSource.data = resp.entities || [];
      this.dataSource.sort = this.sort;
      this.pageProperties.length = resp.paged.entityCount;
    });
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  mostrarCriterios(){
    let st: string = '';
    let arrayform: any[] = new Array;
    for (let a in this.filter) {
      var i = Object.keys(this.filter).indexOf(a);
      if (!(a === 'estaActivo' || a === 'PageNumber')){
        arrayform[i] = a;
      }
    }
    Object.entries(arrayform).forEach(([keyarr, valuearr]) => {
      Object.entries(this.filter).forEach(([keyfilt, valuefilt]) => {
        if(valuearr === keyfilt){
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

@Pipe({ name: 'mapingObject' })
export class TableMapObject implements PipeTransform {

  transform(value: any, path: string) {
    path.split('.').forEach((p) => value = value[p]);
    return value;
  }

}