import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterOptions } from '@app/shared/utils/filter-options';
import { SearchOptionsGeneric } from '@app/shared/utils/search-options-generic';
import { Subscription } from 'rxjs';
import { SearchFiltersMarktouchedService } from './search-filters-marktouched.service';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchFiltersComponent),
      multi: true
    }
  ]
})

export class SearchFiltersComponent implements OnInit, ControlValueAccessor, OnDestroy {
  opBuscar: boolean = false;
  desc: FormControl = null;
  id: number;
  private onChangeFn!: Function;
  formulario: FormGroup;
  subscription: Subscription;

  @Input() columnasVex!: any;
  @Input() filtro: FilterOptions;
  @Input() searchOptions!: SearchOptionsGeneric[];
  @Input() sourceService!: any;
  @Input() nombreTabla!: string;
  @Input() campoDesc!: string;
  @Input() requerido!: boolean;

  @Output() datos = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private marktouchedService: SearchFiltersMarktouchedService) {
    this.subscription = this.marktouchedService.castValue.subscribe((value) => {
      if (value) {
        this.formulario.markAllAsTouched();
      }
    })
  }

  ngOnInit(): void {
    if (this.requerido === true) {
      this.createFormRequerido();
    } else {
      this.createForm();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  createFormRequerido() {
    this.formulario = this.fb.group({
      desc: [null, { validators: [Validators.required] }],
    });
  }

  createForm() {
    this.formulario = this.fb.group({
      desc: null,
    });
  }

  buscar() {
    this.opBuscar = true;
  }

  limpiar() {
    this.formulario.controls.desc.setValue('');
    this.opBuscar = false;
    this.id = null;
    this.onChangeFn(null);
    this.datos.emit(null);
  }

  cancelar() {
    this.opBuscar = false;
  }

  changeId($event: any) {
    this.formulario.controls.desc.setValue(eval(`$event.${this.campoDesc}`));
    this.opBuscar = false;
    this.onChangeFn($event);
    this.datos.emit($event);
  }

  writeValue(value: number): void {
    this.id = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }
}
