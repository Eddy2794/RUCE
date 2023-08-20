import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipofondoInsupdComponent } from './tipofondo-insupd.component';

describe('TipofondoInsupdComponent', () => {
  let component: TipofondoInsupdComponent;
  let fixture: ComponentFixture<TipofondoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipofondoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipofondoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
