import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargoInsupdComponent } from './cargo-insupd.component';

describe('CargoInsupdComponent', () => {
  let component: CargoInsupdComponent;
  let fixture: ComponentFixture<CargoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
