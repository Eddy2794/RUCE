import { Paged } from "@app/_models/Page";

export class DataPage<T> {
    entities: T[];
    succeeded: boolean;
    errors: any[];
    paged: Paged;

    constructor() {
        this.entities = new Array<T>();
        this.succeeded = false;
        this.errors = [];
        this.paged = { 
            entityCount: 0, 
            pageSize: 0,
            pageNumber: 0 
        }
    }
}