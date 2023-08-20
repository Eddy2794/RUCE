import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceInsupdComponent } from './balance-insupd.component';

describe('BalanceInsupdComponent', () => {
  let component: BalanceInsupdComponent;
  let fixture: ComponentFixture<BalanceInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
