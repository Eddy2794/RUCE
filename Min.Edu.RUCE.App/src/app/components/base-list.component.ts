import { PaginateOptions } from '@app/pages/organismos/shared/utils';
import { ColumnOptions } from '@app/pages/organismos/shared/utils/column-options';
import { FilterOptions } from '@app/pages/organismos/shared/utils/filter-options';

export class BaseListComponent {
    filter: FilterOptions;
    paginate: PaginateOptions;
    columns: ColumnOptions[] = [];

    constructor() { 
        this.filter = new FilterOptions();
        this.paginate = new PaginateOptions();
    }
}