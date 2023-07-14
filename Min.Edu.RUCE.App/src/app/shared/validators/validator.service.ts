import { Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { getDate } from "date-fns";

@Injectable({
  providedIn: "root",
})
export class ValidatorService {
  constructor() {}

  validarFechasInicioFin(fechaInicio: string, fechaFin: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fechaI = formGroup.get(fechaInicio)?.value;
      const fechaF = formGroup.get(fechaFin)?.value;
      if (fechaI > fechaF) {
        return {
          errorFechas: "La fecha de inicio es mayor a la fecha de finalizacion",
        };
      }

      return null;
    };
  }

  validarFechaMenorAFechaActual() {
    return (control: AbstractControl) => {
      const f = <Date>control.value;
      const CurrentDate = new Date();
      if (f > CurrentDate) {
        return {
          errorFechaMenorAFechaActual:
            "No puede ser mayor que la fecha actual.",
        };
      }

      return null;
    };
  }

  validarDuracion(valorA: number, valorB: number) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      if (valorB > valorA) {
        return {
          errorValidarAmayorB: "No puede ser mayor (hs. cátedras).",
        };
      }
      return null;
    };
  }
  validarCaracteresDescripcion() {
    return (control: AbstractControl) => {
      const valor = <string>control.value;
      //const exp = new RegExp(/^[^\s]+[A-Za-z0-9 áéíóúÁÉÍÓÚÑñ . , % " () \- º \s /]+[^\s]$/g);
      const exp = new RegExp(
        /^[A-Za-z0-9 áéíóúÁÉÍÓÚÑñ . , % " () \- º \s /]+$/g
      );
      const respuesta = exp.test(valor);
      if (!respuesta) {
        return {
          errorCaracteres: "Caracteres no válidos.",
        };
      }
      return null;
    };
  }
  validarEspaciosInicioFin() {
    return (control: AbstractControl) => {
      const valor = <string>control.value;
      const exp = new RegExp(
        /^[^\s]+[A-Za-z0-9 áéíóúÁÉÍÓÚÑñ . , % " () \- º \s /]+[^\s]$/g
      );
      const respuesta = exp.test(valor);
      if (!respuesta) {
        return {
          errorEspacios: "Caracteres no válidos.",
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
          nemotec: "Nemotécnico no válidos.",
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
          errorCaracteresSoloL: "Solo ingresar Letras.",
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
          errorCaracteresAlfaN: "Caracteres no válidos.",
        };
      }
      return null;
    };
  }
}

function newRegExp(arg0: RegExp) {
  throw new Error("Function not implemented.");
}
