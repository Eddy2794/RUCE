import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipofondoListComponent } from './tipofondo-list.component';

describe('TipofondoListComponent', () => {
  let component: TipofondoListComponent;
  let fixture: ComponentFixture<TipofondoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipofondoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipofondoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
