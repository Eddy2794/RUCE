import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'dropdown',
    template: `
      <div [formGroup]="form">
        <select class="form-control" [id]="field.name" [formControlName]="field.name">
          <option *ngFor="let opt of objectKeys(field.options); index as i" [value]="field.options[i].key">{{field.options[i].label}}</option>
        </select>
      </div> 
    `
})
export class DropDownComponent {
    @Input() field:any = {};
    @Input() form!:FormGroup;
    readonly objectKeys = Object.keys;

    constructor() {

    }
}