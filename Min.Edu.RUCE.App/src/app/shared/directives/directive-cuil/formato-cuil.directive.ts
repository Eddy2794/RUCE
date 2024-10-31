import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[vexFormatoCuil]'
})
export class FormatoCuilDirective {
  @Input('vexFormatoCuil') sourceControlName: string;

  constructor(
    private el: ElementRef,
    private control: NgControl
  ) { }

  @HostListener('input', ['$event.target']) onInput(input: HTMLInputElement) {
    const form = this.control.control.parent;  // Obtener el FormGroup
    if (!form) return;

    const documento = form.get(this.sourceControlName).value;

    if (documento) {
      var cuit = input.value;

      var bandera:boolean;
    if (event instanceof InputEvent && event.inputType === 'deleteContentBackward'){
      bandera = false;
    }else{
      bandera = true;
    }

      if (cuit.length == 2 && bandera) {
        cuit += documento;
      }

      // Modifica el valor del campo de entrada con el cuit formateado
      (event.target as HTMLInputElement).value = cuit;
    }
  }

}
