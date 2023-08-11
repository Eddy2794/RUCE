
export class FilterOptions {
    desc?: string;
    descContains?: string;
    includeIds?: number[];
    excludeIds?: number[];
    id?: number;
    idOrganizacion?: number;
    filtros?: string;
    estaActivo?: boolean;
    PageSize?: number;
    SortProperties?: string;




    
    idRefGrupoNivel?: number;
    idProvincia?: number;
    idDepartamento?: number;
    idPlanEstudio?: number;
    idEdificio?: number;
    idEspacioCurricular?: number;
    estaConfirmado?: boolean;
    esEducativa?: boolean;
    idRefNivelEducativo?: number;
    idPlanEstudioDesarrollo?: number;
    idPlanEspacio?: number;
    idPlanUnidad?: number;
    estadosSiguientesAlId?: number;
    idRefEjercicio?: number;

    constructor() {
        this.desc = '';
        this.descContains = '';
        this.includeIds = new Array<number>();
        this.excludeIds = new Array<number>();
        this.filtros = JSON.parse("{}");
        this.id = 0;
        this.idOrganizacion = 0;
    }
}
export interface IFilterOptions {
    id?: number;
    idOrganizacion?: number;
    filtros?: JSON;
    descContains?: string;
    desc?: string;
    includeIds?: number[];
    excludeIds?: number[];
    estaActivo?: boolean;
    SortProperties?: string;
}
