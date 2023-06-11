import { ValidatorFn } from "@angular/forms";

export enum TypeControl { 
    SELECT = 'select',
    INPUT = 'input',
    CHECKBOX = 'checkbox',
    RADIO = 'radio',
    DATEPICKER = 'datepicker',
    RANGEDATEPICKER = 'rangedatepicker',
    MODAL_SINGLE_SELECTION = 'modal-single-selection',
    MODAL_MULTIPLE_SELECTION = 'modal-multiple-selection'
}
export enum TypeData{
    TEXT = 'text',
    NUMBER = 'number',    
    INTEGER = 'integer',
    DECIMAL = 'decimal',
    CURRENCY = 'currency',
    PERCENT = 'percent',
    DATE = 'date',
    OBJECT = 'object',
}
export class SearchOptionsGeneric {    

    typeControl: string;
    typeData: string;
    name: string;
    label: string;
    value: any | [];
    options: { key: string; value: string; }[];
    property: string;
    validators: ValidatorFn[] | null;
    readonly: boolean;
    order: number;

    constructor( options: {
                typeControl?: TypeControl, 
                typeData?: TypeData,
                name?: string, 
                label?: string, 
                value?: any | any[], 
                options?: { key: string; value: string }[],
                property?: string, 
                validators?: ValidatorFn[] | null, 
                readonly?: boolean,
                order?: number
        } = {}
        ) {
        this.typeControl = options.typeControl || '';
        this.typeData = options.typeData || ';'
        this.label = options.label || '';
        this.name = options.name || '';
        this.value = options.value;
        this.options = options.options || [];
        this.property = options.property || '';
        this.validators = options.validators || [];
        this.readonly = !!options.readonly;
        this.order = options.order === undefined ? 1 : options.order;
    }
}