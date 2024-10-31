import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vex-widget-assistant',
  templateUrl: './widget-assistant.component.html',
  styleUrls: ['./widget-assistant.component.scss']
})
export class WidgetAssistantComponent implements OnInit {

  usuario? = JSON.parse(localStorage.getItem('currentUser'));

  constructor() { }

  ngOnInit() {
  }

}
