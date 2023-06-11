import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../shared/services/spinner.service';

@Component({
  selector: 'app-spinner', 
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css'],
})

export class SpinnerComponent implements OnInit {

  isLoading$ = this.spinnerService.isLoading$;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit(): void {
  }

}
