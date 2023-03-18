import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondosCooperarComponent } from './fondos-cooperar.component';

describe('FondosCooperarComponent', () => {
  let component: FondosCooperarComponent;
  let fixture: ComponentFixture<FondosCooperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FondosCooperarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondosCooperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
