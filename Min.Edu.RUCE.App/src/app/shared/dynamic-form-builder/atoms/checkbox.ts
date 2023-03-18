import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'checkbox',
    template: `
      <div [formGroup]="form">
        <div [formGroupName]="field.name" >
          <div *ngFor="let opt of objectKeys(field.options); index as i" class="form-check form-check">
          <label class="form-check-label">
             <input [formControlName]="field.options[i].key" class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
             {{field.options[i].label}}</label>
          </div>
        </div>

      </div> 
    `
})
export class CheckBoxComponent {
    @Input() field:any = {};
    @Input() form!:FormGroup;
    readonly objectKeys = Object.keys;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }
}