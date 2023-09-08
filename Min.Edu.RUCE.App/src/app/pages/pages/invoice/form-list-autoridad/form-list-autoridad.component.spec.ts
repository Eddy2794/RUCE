import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListAutoridadComponent } from './form-list-autoridad.component';

describe('FormListAutoridadComponent', () => {
  let component: FormListAutoridadComponent;
  let fixture: ComponentFixture<FormListAutoridadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormListAutoridadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormListAutoridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
