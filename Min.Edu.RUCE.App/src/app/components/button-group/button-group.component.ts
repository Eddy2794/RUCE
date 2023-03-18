import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.css']
})
export class ButtonGroupComponent implements OnInit {
@Input() accion! :string;
@Output() cancel = new EventEmitter();
@Output() submit = new EventEmitter();
@Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  cancelando() {
    this.cancel.emit();
  }
  eliminando() {
    this.delete.emit();
  }
  aceptando() {
    this.submit.emit();
  }

}
