export class WhereOptions {
    property!: string;
    value: any;
    operator!: string;

    constructor(property?: string, value?: any, operator?: string) {
        property ? this.property = property : '';
        value ? this.value = value : '';
        operator ? this.operator = operator : 'eq';
    }
}