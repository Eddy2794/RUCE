export class PaginateOptions {
    pageNumber?:number;
    pageSize?:number;
    limit?: number;
    numberPage?: number;
    entities?: any[] = [];
    totalEntities?: number = 0;
    totalPages?: number = 0;
    constructor(pageNumber?:number, pageSize?:number) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
    }
}