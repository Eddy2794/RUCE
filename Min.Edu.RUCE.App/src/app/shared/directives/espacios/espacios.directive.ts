import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'input[espacios]'
})
export class EspaciosDirective {
  constructor(private readonly elemRef: ElementRef) { }

  @HostListener('input', ['$event'])
  onChangeInput(event: Event): void {
    const esp = /\s+/g;
    const initValue = this.elemRef.nativeElement.value;  
    this.elemRef.nativeElement.value = initValue.replace(esp,' ');
    if (initValue !== this.elemRef.nativeElement.value){
      event.stopPropagation();
    }
  }
}
