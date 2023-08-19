import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoListComponent } from './fondo-list.component';

describe('FondoListComponent', () => {
  let component: FondoListComponent;
  let fixture: ComponentFixture<FondoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FondoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
