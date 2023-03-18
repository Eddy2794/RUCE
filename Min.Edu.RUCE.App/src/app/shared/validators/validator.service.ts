import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() { }

  validarFechasInicioFin(fechaInicio: string, fechaFin: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fechaI = formGroup.get(fechaInicio)?.value;
      const fechaF = formGroup.get(fechaFin)?.value;
      if (fechaI > fechaF) {
        return {
          errorFechas: 'La fecha de inicio es mayor a la fecha de finalizacion',
        };
      }

      return null;
    };
  }
  validarCaracteresDescripcion() {
    return (control: AbstractControl) => {
      const valor = <string>control.value;
      //const exp = new RegExp(/^[^\s]+[A-Za-z0-9 áéíóúÁÉÍÓÚÑñ . , % " () \- º \s /]+[^\s]$/g);
      const exp = new RegExp(/^[A-Za-z0-9 áéíóúÁÉÍÓÚÑñ . , % " () - º \s /]+$/g);
      const respuesta = exp.test(valor);
      if (!respuesta) {
        return {
          errorCaracteres: 'Caracteres no válidos.'
        };
      }
      return null;
    };
  }
  validarEspaciosInicioFin() {
    return (control: AbstractControl) => {
      const valor = <string>control.value;
      const exp = new RegExp(/^[^\s]+[A-Za-z0-9 áéíóúÁÉÍÓÚÑñ . , % " () \- º \s /]+[^\s]$/g);
      const respuesta = exp.test(valor);
      if (!respuesta) {
        return {
          errorEspacios: 'Caracteres no válidos.'
        };
      }
      return null;
    };
  }
  nemotecnico() {
    return (control: AbstractControl) => {
      const valor = <string>control.value;
      const exp = new RegExp(/^[A-Za-z0-9/]+$/g);
      const respuesta = exp.test(valor);
      if (!respuesta) {
        return {
          nemotec: 'Nemotécnico no válidos.'
        };
      }
      return null;
    };
  }
  validarSoloLetras() {
    return (control: AbstractControl) => {
      const valor = <string>control.value;
      const exp = new RegExp(/^[A-Za-z áéíóúÁÉÍÓÚÑñ \s]+$/g);
      const respuesta = exp.test(valor);
      if (!respuesta) {
        return {
          errorCaracteresSoloL: 'Solo ingresar Letras.'
        };
      }
      return null;
    };
  }
  //Comentario
  validarAlfaNumerico() {
    return (control: AbstractControl) => {
      const valor = <string>control.value;
      const exp = new RegExp(/^[A-Za-z0-9Ññ]+$/g);
      const respuesta = exp.test(valor);
      if (!respuesta) {
        return {
          errorCaracteresAlfaN: 'Caracteres no válidos.'
        };
      }
      return null;
    };
  }
}

