import { FilterOptions } from "./filter-options";

export interface TextLabel {
    name: string;

}
export interface TextSearch {
    nombre: string;
    valor: string;


}


export function mostrarCriterios(resp: any, listTextOption: TextSearch[]): TextLabel[] {
    let textSearch: TextLabel[] = [];
    if (resp !== undefined) {
        for (const element of listTextOption) {
            let etiquetaBusqueda: string = '';
            switch (element.nombre) {
                case 'descContains':
                    etiquetaBusqueda = 'Contiene : ' + element.valor.toString().toUpperCase();
                    textSearch.push({ name: etiquetaBusqueda });
                    break;

                // case 'idRefTipoOrganizacion':
                //     etiquetaBusqueda = 'Tipo de Organizacion: ' + resp.refTipoOrganizacion.tipoOrganizacionDesc;
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                case 'desc':
                    etiquetaBusqueda = 'Descripción: ' + element.valor;
                    textSearch.push({ name: etiquetaBusqueda });

                    break;
                case 'descContains':
                    etiquetaBusqueda = 'Contiene : ' + element.valor;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'id':
                    if (element.valor !== '') {
                        etiquetaBusqueda = 'Código : ' + resp.id;
                        textSearch.push({ name: etiquetaBusqueda });
                    }
                    break;
                // case 'idRefGrupoNivel':
                //     etiquetaBusqueda = 'Grupo Nivel: ' + resp.refGrupoNivel.grupoDesc;
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idProvincia':
                //     etiquetaBusqueda = 'Provincia: ' + resp.provincia.provinciaDesc;
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idDepartamento':
                //     etiquetaBusqueda = 'Departamento: ' + resp.departamento.departamentoDesc;
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idPlanEstudio':
                //     etiquetaBusqueda = 'Plan de Estudio: ' + resp.planEstudio.planEstudioDesc;
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idEdificio':
                //     etiquetaBusqueda = 'Edificio: ' + resp.edificio.edificioDesc;
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idEspacioCurricular':
                //     etiquetaBusqueda = 'Espacio Curricular: ' + resp.espacioCurricular.espacioCurricularDesc;
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idOrganizacion':
                //     if (resp.organizacion !== undefined) {
                //         etiquetaBusqueda = 'Organización: ' + resp.organizacion.organizacionDesc;
                //         textSearch.push({ name: etiquetaBusqueda });
                //     }
                //     break;
                case 'estaConfirmado':
                    let estaConfirm: string = resp.estaConfirmado === true ? 'SI' : 'NO';
                    etiquetaBusqueda = 'Esta Confirmado: ' + estaConfirm;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                // case 'esEducativa':
                //     let esEducativ: string = resp.esEducativa === true ? 'SI' : ' NO'
                //     etiquetaBusqueda = 'Es Educativa: ' + esEducativ;
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idRefNivelEducativo':
                //     if (resp.refNivelEducativo !== undefined) {
                //         etiquetaBusqueda = 'Nivel Educativo: ' + resp.refNivelEducativo.nivelEducativoDesc;
                //         textSearch.push({ name: etiquetaBusqueda });
                //     } else {
                //         if (resp.organizacionNivelEducativo !== undefined) {
                //             etiquetaBusqueda = 'Nivel Educativo: ' + resp.organizacionNivelEducativo.refNivelEducativo.nivelEducativoDesc;
                //             textSearch.push({ name: etiquetaBusqueda });
                //         }
                //     }
                //     break;

                // case 'idPlanEspacio':

                //     break;
                // case 'idPlanUnidad':
                //     break;
                // case 'estaActivo':
                //     break;
                // case 'idRefTipoEspacioCurricular':
                //     etiquetaBusqueda = 'Tipo Espacio Curricular: ' + resp.refTipoEspacioCurricular.tipoEspacioCurricularDesc
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idPropuestaFormativa':
                //     if (resp.propuestaFormativa !== undefined) {
                //         etiquetaBusqueda = 'Propuesta Formativa: ' + resp.propuestaFormativa.propuestaFormativaDesc;
                //         textSearch.push({ name: etiquetaBusqueda });
                //     };
                //     break;
                // case 'idRefEspecialidad':
                //     etiquetaBusqueda = 'Especialidad: ' + resp.refEspecialidad.especialidadDesc
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idRefTipoEducacion':
                //     etiquetaBusqueda = 'Tipo Educación: ' + resp.refTipoEducacion.tipoEducacionDesc
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idRefModalidadDictado':
                //     etiquetaBusqueda = 'Modalidad: ' + resp.refModalidadDictado.modalidadDictadoDesc
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                // case 'idRefTipoEdificio':
                //     etiquetaBusqueda = 'Tipo de Edificio: ' + resp.refTipoEdificio.tipoEdificioDesc
                //     textSearch.push({ name: etiquetaBusqueda });
                //     break;
                case 'cargoSalarialDescContains':
                    etiquetaBusqueda = 'Cargo Salarial Contiene: ' + element.valor;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'idRefJornada':
                    etiquetaBusqueda = 'Jornada: ' + resp.refJornada.jornadaDesc;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'equivalenciaHoraria':
                    etiquetaBusqueda = 'Equivalencia Horaria: ' + resp.equivalenciaHoraria;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'cargoFuncionalDescContains':
                    etiquetaBusqueda = 'Cargo Funcional Contiene: ' + element.valor.toUpperCase();
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'idRefTipoFuncion':
                    etiquetaBusqueda = 'Tipo Función: ' + resp.refTipoFuncion.tipoFuncionDesc;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'esJerarquico':
                    let esJerarquico: string = resp.esJerarquico === true ? 'SI' : 'NO';
                    etiquetaBusqueda = 'Es Jerarquico: ' + esJerarquico;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'idRefUdeOxEjer':
                    etiquetaBusqueda = 'U. de O.: ' + resp.refUdeOxEjer.refUdeO.udeoDesc;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'idRefFinalidadxEjer':
                    etiquetaBusqueda = 'Finalidad: ' + resp.refFinalidadxEjer.refFinalidad.finalidadDesc;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'idRefFuncionxEjer':
                    etiquetaBusqueda = 'Función: ' + resp.refFuncionxEjer.refFuncion.funcionDesc;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'idRefAdicional':
                    etiquetaBusqueda = 'Adicional: ' + resp.refAdicional.adicionalDesc;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'idRefEscalafon':
                    etiquetaBusqueda = 'Escalafón: ' + resp.refEscalafon.escalafonDesc;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                case 'CargoSalarialDescContains':
                    etiquetaBusqueda = 'Cargo Salarial Contiene: ' + element.valor.toUpperCase();
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
                default:
                    //let contieneDesc = key.includes('Desc');
                    etiquetaBusqueda = 'Agregar : ' + element.nombre + '--' + element.valor;
                    textSearch.push({ name: etiquetaBusqueda });
                    break;
            }
        }
    }
    return textSearch;
}
export function armarListaEtiqueta(value: any, filter: FilterOptions): TextSearch[] {

    let lista: TextSearch[] = [];
    Object.entries(value).forEach(([key, value]) => {
        if (value !== '') {
            let item: TextSearch = { nombre: key, valor: value.toString() }
            lista.push(item);
        }
    });

    Object.entries(filter).forEach(([key]) => {
        lista.forEach(el => {
            if (el["nombre"] === key) {
                const indice = lista.findIndex((elemento, indice) => {
                    if (elemento.nombre === key) {
                        return true;
                    }
                });
                lista.splice(indice, 1);
            }
        });
    });
    return lista;
}

