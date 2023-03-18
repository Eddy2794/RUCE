import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefNivelEducativoInsupdComponent } from './refniveleducativo-insupd.component';

describe('RefniveleducativoInsupdComponent', () => {
  let component: RefNivelEducativoInsupdComponent;
  let fixture: ComponentFixture<RefNivelEducativoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefNivelEducativoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefNivelEducativoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
