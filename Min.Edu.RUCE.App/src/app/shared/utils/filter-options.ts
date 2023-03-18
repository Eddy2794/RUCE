
export class FilterOptions {
    desc?: string;
    descContains?: string;
    includeIds?: number[];
    excludeIds?: number[];
    id?: number;
    idRefGrupoNivel?: number;
    idProvincia?: number;
    estaActivo?: boolean;
    SortProperties?: string;
    PageSize?: number;
    
    constructor() {
        this.desc = '';
        this.descContains = '';
        this.includeIds = new Array<number>();
        this.excludeIds = new Array<number>();
        this.id = 0;
        this.idRefGrupoNivel = 0;
        this.idProvincia = 0;
    }
}
export interface IFilterOptions {
    desc?: string;
    descContains?: string;
    includeIds?: number[];
    excludeIds?: number[];
    id?: number;
    idRefGrupoNivel?: number;
    idProvincia?: number;
    estaActivo?: boolean;
}

