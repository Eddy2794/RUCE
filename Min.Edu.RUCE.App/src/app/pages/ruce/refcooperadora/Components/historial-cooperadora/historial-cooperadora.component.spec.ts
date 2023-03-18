import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCooperadoraComponent } from './historial-cooperadora.component';

describe('HistorialCooperadoraComponent', () => {
  let component: HistorialCooperadoraComponent;
  let fixture: ComponentFixture<HistorialCooperadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialCooperadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialCooperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
