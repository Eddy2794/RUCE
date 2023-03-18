import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ver-error',
  templateUrl: './ver-error.component.html',
  styleUrls: ['./ver-error.component.css']
})
export class VerErrorComponent implements OnInit {

  @Input("control") control: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
