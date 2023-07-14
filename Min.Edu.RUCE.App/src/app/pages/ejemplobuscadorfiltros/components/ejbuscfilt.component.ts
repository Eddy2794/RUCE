import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchFiltersMarktouchedService } from '@app/components/search-filters/search-filters-marktouched.service';
import { PlanEstudioBaseModel } from '@app/pages/planestudiobase/model/planestudiobase.model';
import { PlanestudiobaseService } from '@app/pages/planestudiobase/service/planestudiobase.service';
import { FilterOptions } from '@app/shared/utils/filter-options';
import { SearchOptionsGeneric, TypeControl, TypeData } from '@app/shared/utils/search-options-generic';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';
import { stagger60ms } from 'src/@vex/animations/stagger.animation';
import { TableColumn } from 'src/@vex/interfaces/table-column.interface';

@Component({
  selector: 'ejbuscfilt',
  templateUrl: './ejbuscfilt.component.html',
  styleUrls: ['./ejbuscfilt.component.scss'],
  animations: [
    stagger60ms,
    fadeInUp400ms
  ]
})
export class EjbuscfiltComponent implements OnInit, OnDestroy {

  columnasBusqueda!: TableColumn<PlanEstudioBaseModel>[];
  filtroBusqueda: FilterOptions = { PageSize: 5, idRefNivelEducativo: 3 };
  searchOptionsBusqueda!: SearchOptionsGeneric[];
  
  frmPlanEstudio!: FormGroup;

  constructor(public sourceServiceBusqueda: PlanestudiobaseService,
    private fb: FormBuilder,
    private marktouchedService: SearchFiltersMarktouchedService) { }

  ngOnInit(): void {
    this.setBusqueda();
    this.createForm();
  }

  ngOnDestroy(): void {
    this.marktouchedService.sendValue(false);
  }

  private setBusqueda() {
    this.columnasBusqueda = [
      { label: 'CÓDIGO', property: 'id', type: 'text', visible: true },
      { label: 'PLAN DE ESTUDIO', property: 'planEstudioDesc', type: 'text', visible: true },
      { label: 'ESPECIALIDAD', property: 'refEspecialidad.especialidadDesc', type: 'object', visible: true },
      { label: '', property: 'selection', type: 'button', visible: true }
    ];

    this.searchOptionsBusqueda = [
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.NUMBER,
        name: 'id',
        label: 'Código',
        readonly: false
      }),
      new SearchOptionsGeneric({
        typeControl: TypeControl.INPUT,
        typeData: TypeData.TEXT,
        name: 'planEstudioDesc',
        label: 'Plan de Estudio',
        readonly: false
      })
    ];
  }

  obtenerBusqueda(resp) {
    if (resp) {
      this.frmPlanEstudio.patchValue(resp);
    }
    else {
      this.frmPlanEstudio.reset();
    }
  }


  createForm() {
    this.frmPlanEstudio = this.fb.group({
      idPlanEstudioBase: [null, { validators: [Validators.required] }],
      duracionAnios: [null, { validators: [Validators.required] }],
      duracionHsCatedra: null,
      duracionHsReloj: null,
    });
  }

  validar() {
    this.marktouchedService.sendValue(true);
    if (this.frmPlanEstudio.invalid) {
      this.frmPlanEstudio.markAllAsTouched();
      return
    }
    
  }

}
