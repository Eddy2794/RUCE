import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteInsupdComponent } from './expediente-insupd.component';

describe('ExpedienteInsupdComponent', () => {
  let component: ExpedienteInsupdComponent;
  let fixture: ComponentFixture<ExpedienteInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedienteInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
