export class ColumnOptions {
    static TYPE_TEXT = 'text';
    static TYPE_INTEGER = 'integer';
    static TYPE_DECIMAL = 'decimal';
    static TYPE_CURRENCY = 'currency';
    static TYPE_PERCENT = 'percent';
    static TYPE_DATE = 'date';
    static TYPE_OBJECT = 'object';
    static TYPE_BOOLEAN = 'boolean';
    static TYPE_ACTIONS = 'actions';
    
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