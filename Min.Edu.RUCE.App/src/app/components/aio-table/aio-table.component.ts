import { AfterViewInit, Component, Input, OnInit, Pipe, PipeTransform, ViewChild, OnDestroy, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
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
import { IBaseService } from '@app/shared/services/interface/i-base.service';
import { DataPage, FilterOptions, PaginateOptions } from '@app/shared/utils';
import { SearchService } from '@app/shared/services/search.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DialogComponent, DialogData } from '../dialog/dialog.component';
import { armarListaEtiqueta, mostrarCriterios, TextLabel, TextSearch } from '@app/shared/utils/etiqueta';


@UntilDestroy()
@Component({
  selector: 'vex-aio-table',
  templateUrl: './aio-table.component.html',
  styleUrls: ['./aio-table.component.css'],
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

  layoutCtrl = new UntypedFormControl('fullwidth');

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

  @Output() seleccion = new EventEmitter<any>();

  @Input() datosTabla!: any;
  @Input() sourceService!: IBaseService<any>;
  @Input() filter!: FilterOptions;
  @Input() ruta!: string;
  @Input() nombreTabla!: string;
  @Input() cabecera!: boolean;
  @Input() specialButton!: string[];
  @ViewChild('etiqueta') etiquetaname: any;
  etiquetaShow: boolean = false;
  pageSize = Constants.pageSettings().pageSize; // default page size for the Table.
  pageSizeOptions: number[] = [10];
  pageProperties: PageEvent = Constants.pageSettings();

  dataPage!: DataPage<any>;
  filterAio!: FilterOptions;
  paginate!: PaginateOptions;

  dataSource: MatTableDataSource<any> | null;

  selection = new SelectionModel<any>(true, []);
  searchCtrl = new UntypedFormControl();
  textSearchList: TextLabel[] = [];
  listTextOption: TextSearch[];
  filtroActual: any;

  etiquetaBusqueda: string = '';
  path: string[] = [];
  private parar$ = new Subject();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  isLoadingResults = false;

  constructor(private dialog: MatDialog,
    public searchService: SearchService,
    private changeDetectorRef: ChangeDetectorRef,
    public router: Router) {
    this.dataPage = new DataPage<any>();
    this.paginate = new PaginateOptions(1, 10);
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
    this.path.push(this.nombreTabla);
    this.searchService.setSearch = this.filter;
    this.dataSource = new MatTableDataSource();
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

  observableSearch() {
    this.searchService.obsSearch.pipe(takeUntil(this.parar$)).subscribe((search) => {
      this.searchOption(search);
    })
  }

  searchOption(value: any) {
    this.listTextOption = armarListaEtiqueta(value, this.filter);
    this.filterAio = Object.assign(value, this.filter)
    this.paginator.pageIndex = 0;
    this.paginate = new PaginateOptions(this.paginator.pageIndex != 0 ? 1 : (this.paginator.pageIndex + 1), this.paginator.pageSize = 10);
    this.loadPage(this.filterAio);
  }

  loadPage(filter: FilterOptions) {
    // let filterSearch: any;
    // filterSearch = filter ?? this.filter;
    this.sourceService.filter(filter, this.paginate).subscribe((resp: any) => {
      this.dataSource.data = resp.entities || [];
      this.dataPage = resp.entities;
      this.dataSource.sort = this.sort;
      this.pageProperties.length = resp.paged.entityCount;
      this.isLoadingResults = false;
      this.textSearchList = mostrarCriterios(resp.entities[0], this.listTextOption);
    });
  }

  modificar(data: any) {
    this.router.navigate(['/pages/' + this.ruta + '/add-edit', data.id]);
  }

  ver(data: any) {
    this.router.navigate(['/pages/' + this.ruta + '/view', data.id]);
  }

  eliminar(data: any) {
    this.router.navigate(['/pages/' + this.ruta + '/delete', data.id]);
  }

  confirmar(data: any) {
    if (data.estaConfirmado) {
      this.mostrarDialogMsj("Mensaje", "El Plan de Estudio seleccionado ya se encuentra Confirmado", false)
      return
    }
    this.router.navigate(['/pages/' + this.ruta + '/confirm', data.id]);
  }

  seleccionar(data: any) {
    this.seleccion.emit(data);
  }

  mostrarDialogMsj(titulo: string, msj: string, cancelVisible: boolean) {
    let datos: DialogData = { titulo, msj, cancelVisible }
    this.dialog.open(DialogComponent, {
      width: '200px',
      data: datos
    });
  }

  pageChanged(pageEvent: PageEvent) {
    this.paginate = new PaginateOptions(this.paginator.pageIndex == 0 ? 1 : (this.paginator.pageIndex + 1), this.paginator.pageSize);
    this.sourceService.filter(this.filterAio, this.paginate).subscribe((resp: any) => {
      this.dataSource.data = resp.entities || [];
      this.dataSource.sort = this.sort;
      this.pageProperties.length = resp.paged.entityCount;
      this.pageProperties.pageSize = this.paginate.pageSize;
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
  removeBusqueda() {
    this.searchService.setSearch = this.filter;

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
      this.changeDetectorRef.detectChanges();
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