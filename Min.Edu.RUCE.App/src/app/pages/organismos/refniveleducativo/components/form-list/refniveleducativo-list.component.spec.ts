import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefNivelEducativoListComponent } from './refniveleducativo-list.component';

describe('RefniveleducativoListComponent', () => {
  let component: RefNivelEducativoListComponent;
  let fixture: ComponentFixture<RefNivelEducativoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefNivelEducativoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefNivelEducativoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
