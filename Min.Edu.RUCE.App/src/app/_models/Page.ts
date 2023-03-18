export interface Paged {
    entityCount: number;
    pageSize: number;
    pageNumber: number;
}

export interface Page {
    entities: any[];
    succeeded: boolean;
    errors: any[];
    paged: Paged;
}