export class SearchOptions {
    static TYPE_TEXT = 'text';
    static TYPE_INTEGER = 'integer';
    static TYPE_DECIMAL = 'decimal';
    static TYPE_CURRENCY = 'currency';
    static TYPE_PERCENT = 'percent';
    static TYPE_DATE = 'date';
    static TYPE_OBJECT = 'object';

    static TYPE_CONTROL_SELECT = 'select'
    static TYPE_CONTROL_INPUT = 'input'
    static TYPE_CONTROL_CHECKBOX = 'checkbox'

    type: string;
    name: string;
    label: string;
    required: boolean;
    property?: string;
    value?: any | [];



    constructor(type: string, name: string, label: string, required: boolean = false, value?: any | any[], property?: string) {
        this.name = name;
        this.type = type;
        this.label = label;
        this.required = required;
        this.property = property;
        this.value = value;
    }
}