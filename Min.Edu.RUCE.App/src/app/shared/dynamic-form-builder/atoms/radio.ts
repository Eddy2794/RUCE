import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'radio',
    template: `
      <div [formGroup]="form">
        <div class="form-check" *ngFor="let opt of objectKeys(field.options); index as i;">
          <input class="form-check-input" type="radio" [value]="field.options[i].key" >
          <label class="form-check-label">
            {{field.options[i].label}}
          </label>
        </div>
      </div> 
    `
})
export class RadioComponent {
    @Input() field:any = {};
    @Input() form!:FormGroup;
    readonly objectKeys = Object.keys;
}