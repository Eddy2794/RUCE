import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'textbox',
    template: `
      <div [formGroup]="form">
        <mat-label> {{ field.name }}</mat-label>  
        <mat-form-field>
          <input *ngIf="!field.multiline" [attr.type]="field.type" class="form-control"  [id]="field.name" [name]="field.name" [formControlName]="field.name">
          <textarea *ngIf="field.multiline" [class.is-invalid]="isDirty && !isValid" [formControlName]="field.name" [id]="field.name"
          rows="9" class="form-control" [placeholder]="field.placeholder"></textarea>
        </mat-form-field>
      </div> 
    `
})
export class TextBoxComponent {
    @Input() field:any = {};
    @Input() form!:FormGroup;
    readonly objectKeys = Object.keys;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }
  
    constructor() {

    }
}