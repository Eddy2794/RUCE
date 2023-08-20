
export class FilterOptions {
    modelo?: string;
    event?: string;
    desc?: string;
    descContains?: string;
    includeIds?: number[];
    excludeIds?: number[];
    id?: number;
    fkOrganizacionRUCE?: number;
    fkCooperadora?: number;
    fkComision?: number;
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
        this.modelo = '';
        this.event = '';
        this.descContains = '';
        this.includeIds = new Array<number>();
        this.excludeIds = new Array<number>();
        this.filtros = JSON.parse("{}");
        this.id = 0;
        this.fkOrganizacionRUCE = 0;
        this.fkCooperadora = 0;
        this.fkComision = 0;
    }
}
export interface IFilterOptions {
    id?: number;
    fkOrganizacionRUCE?: number;
    fkCooperadora?: number;
    fkComision?: number;
    filtros?: JSON;
    descContains?: string;
    desc?: string;
    modelo?: string;
    event?: string;
    includeIds?: number[];
    excludeIds?: number[];
    estaActivo?: boolean;
    SortProperties?: string;
}
