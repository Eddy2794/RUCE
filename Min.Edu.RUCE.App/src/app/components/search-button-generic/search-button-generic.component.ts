import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchService } from '@app/pages/organismos/shared/services/search.service';
import { ColumnOptions } from '@app/pages/organismos/shared/utils';
import { SearchOptionsGeneric } from '@app/pages/organismos/shared/utils/search-options-generic';
import { ModalSearchGenericComponent } from '../modal-search-generic/modal-search-generic.component';

@Component({
    selector: 'app-search-button-generic',
    template: `<button mat-icon-button  matTooltip="Búsqueda Avanzada" (click)="openDialog();" color="primary" ><mat-icon svgIcon="mat:tune"></mat-icon></button>`,
})
//

export class SearchButtonGenericComponent implements OnInit {

    @Input() searchOptions!: SearchOptionsGeneric[];
    constructor( public dialog: MatDialog) {
    }

    ngOnInit(): void {
    }
    openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '588px';
    dialogConfig.data = { options: this.searchOptions, }
    this.dialog.open(ModalSearchGenericComponent, dialogConfig);
    
    }
}

