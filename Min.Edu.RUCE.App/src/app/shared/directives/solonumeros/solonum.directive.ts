import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[solonum]'
})
export class SolonumDirective {

  constructor(private readonly elemRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onChangeInput(event: Event): void {
    const numeros = /[^0-9]*/g
    const initValue = this.elemRef.nativeElement.value;    
    this.elemRef.nativeElement.value = initValue.replace(numeros,'');
    if (initValue !== this.elemRef.nativeElement.value){
      event.stopPropagation();
    }
  }
}

