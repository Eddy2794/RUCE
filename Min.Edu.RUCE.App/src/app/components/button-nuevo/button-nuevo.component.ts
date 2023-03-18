import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-nuevo',
  templateUrl: './button-nuevo.component.html',
  styleUrls: ['./button-nuevo.component.css']
})
export class ButtonNuevoComponent implements OnInit {

  @Input() routerLink!: string;
  @Input() addRowText!: string;
  
  constructor(  public router: Router, ) { }

  ngOnInit(): void {
  }

  add(action: any, obj: any) {
    this.router.navigate(['/pages/' + this.routerLink + '/add-edit', '0']);
  }


}
