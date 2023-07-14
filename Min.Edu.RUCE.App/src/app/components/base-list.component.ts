import { PaginateOptions } from '@app/shared/utils';
import { ColumnOptions } from '@app/shared/utils/column-options';
import { FilterOptions } from '@app/shared/utils/filter-options';

export class BaseListComponent {
    filter: FilterOptions;
    paginate: PaginateOptions;
    columns: ColumnOptions[] = [];

    constructor() { 
        this.filter = new FilterOptions();
        this.paginate = new PaginateOptions();
    }
}