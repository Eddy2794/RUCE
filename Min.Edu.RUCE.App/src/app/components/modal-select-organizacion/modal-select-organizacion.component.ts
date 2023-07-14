import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { IBaseService } from "@app/shared/services/interface/i-base.service";
import { SelectService } from "@app/shared/services/select.service";
import {
  ColumnOptions,
  FilterOptions,
  PaginateOptions,
} from "@app/shared/utils";
import { SearchOptionsGeneric } from "@app/shared/utils/search-options-generic";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-modal-select-organizacion",
  templateUrl: "./modal-select-organizacion.component.html",
  styleUrls: ["./modal-select-organizacion.component.css"],
})
export class ModalSelectOrganizacionComponent implements OnInit, OnDestroy {
  displayedColumns: any;
  @Input() entitieService!: IBaseService<any>;
  @Input() searchOptions!: SearchOptionsGeneric[];
  @Input() filter!: FilterOptions;
  columns!: any;
  paginate: PaginateOptions = new PaginateOptions(1, 10);
  private parar$: Subject<boolean> = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ModalSelectOrganizacionComponent>,
    public selectService: SelectService,
    public cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectService.setSelect = null;
    this.displayedColumns = ["id", this.data.nombreColumnaDesc, "accion"];
    this.setColumns(this.data.nombreColumnaDesc, this.data.label);
    this.observableSelect();
    this.entitieService = this.data.dataSource;
    this.filter = this.data.filter;
  }
  // ngAfterInit() {
  //   this.cd.detectChanges();
  // }
  ngOnDestroy(): void {
    this.parar$.next(true);
    this.parar$.complete();
  }

  ngOnInit(): void {
    this.selectService.setSelect = null;
    this.displayedColumns = ["id", this.data.nombreColumnaDesc, "accion"];
    this.setColumns(this.data.nombreColumnaDesc, this.data.label);
    this.observableSelect();
    this.entitieService = this.data.dataSource;
    this.filter = this.data.filter;
  }

  observableSelect() {
    this.selectService.obsSelect
      .pipe(takeUntil(this.parar$))
      .subscribe((search) => {
        let value = search;
        if (value != null) {
          this.dialogRef.close(value);
        }
      });
  }

  cerrarPopUp() {
    this.dialogRef.close(false);
  }
  private setColumns(nombreColumna: string, nombreEntidad: string) {
    let type = "";
    nombreColumna.includes(".") ? (type = "object") : (type = "text");

    this.columns = [
      new ColumnOptions("id", "Código", ColumnOptions.TYPE_INTEGER),
      new ColumnOptions(nombreColumna, nombreEntidad, `${type}`),
      new ColumnOptions("action", "SELECCIÓN", ColumnOptions.TYPE_TEXT),
    ];
  }
}
