import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadInsupdComponent } from './autoridad-insupd.component';

describe('InsupdComponent', () => {
  let component: AutoridadInsupdComponent;
  let fixture: ComponentFixture<AutoridadInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoridadInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoridadInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
