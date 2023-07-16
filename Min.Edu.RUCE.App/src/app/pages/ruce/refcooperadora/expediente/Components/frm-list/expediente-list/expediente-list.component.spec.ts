import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteListComponent } from './expediente-list.component';

describe('ExpedienteListComponent', () => {
  let component: ExpedienteListComponent;
  let fixture: ComponentFixture<ExpedienteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpedienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
