class ColumnOptions {
    static TYPE_TEXT = 'text';
    static TYPE_INTEGER = 'integer';
    static TYPE_DECIMAL = 'decimal';
    static TYPE_CURRENCY = 'currency';
    static TYPE_PERCENT = 'percent';
    static TYPE_DATE = 'date';
    static TYPE_OBJECT = 'object';
    static TYPE_BOOLEAN = 'boolean';

    property: string;
    name: string;
    type: string;
    width?: number;
    visible: boolean;

    constructor(property: string, name: string, type: string, width?: number, visible:boolean=true ) {
        this.property = property;
        this.name = name;
        this.type = type;
        this.width = width;
        this.visible = visible;
    }
}

let hola: string[] = ['va', 'a', 'suceder'];

let valor = Object.entries(hola);




let columns = [
    new ColumnOptions('id', 'CÓDIGO', ColumnOptions.TYPE_INTEGER, undefined),
    new ColumnOptions('nivelEducativoDesc', 'NIVEL EDUCATIVO', ColumnOptions.TYPE_TEXT, undefined),
    new ColumnOptions('refGrupoNivel.grupoDesc', 'GRUPO NIVEL EDUCATIVO', ColumnOptions.TYPE_OBJECT, undefined),
    new ColumnOptions('action', 'ACCIONES', ColumnOptions.TYPE_TEXT, undefined)
  ]
  columns.find(x=> x.property === 'nivelEducativoDesc').visible = false;
console.log("COLUMNAS",columns)

let va = Object.entries(columns);

console.log(va);