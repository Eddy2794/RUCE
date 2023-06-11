
export class FilterOptions {
    desc?: string;
    descContains?: string;
    includeIds?: number[];
    excludeIds?: number[];
    id?: number;
    idRefGrupoNivel?: number;
    idProvincia?: number;
    idDepartamento?: number;
    idPlanEstudio?: number;
    idEdificio?: number;
    idEspacioCurricular?: number;
    estaActivo?: boolean;
    SortProperties?: string;
    PageSize?: number;
    idOrganizacion?: number;
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
        this.id = 0;
        this.idRefGrupoNivel = 0;
        this.idProvincia = 0;
        this.idDepartamento = 0;
        this.idEdificio = 0;
        this.idEspacioCurricular = 0;
        this.idOrganizacion = 0;
        this.idRefNivelEducativo = 0;
        this.idPlanEstudioDesarrollo = 0;
        this.idPlanEspacio = 0;
        this.idPlanUnidad = 0;
        this.idPlanUnidad = 0;
        this.idRefEjercicio=0;
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
    idOrganizacion?: number;
    idDepartamento?: number;
    idEdificio?: number;
    idEspacioCurricular?: number;
    estaActivo?: boolean;
    esEducativa?: boolean;
    idPlanEstudio?: number;
    estaConfirmado?: boolean;
    idRefNivelEducativo?: number;
    idPlanEstudioDesarrollo?: number;
    idPlanEspacio?: number;
    idPlanUidad?: number;
    estadosSiguientesAlId?: number;
    SortProperties?: string;
}
