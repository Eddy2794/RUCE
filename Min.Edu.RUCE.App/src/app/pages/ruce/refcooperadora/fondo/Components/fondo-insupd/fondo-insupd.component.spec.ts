import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoInsupdComponent } from './fondo-insupd.component';

describe('FondoInsupdComponent', () => {
  let component: FondoInsupdComponent;
  let fixture: ComponentFixture<FondoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FondoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
