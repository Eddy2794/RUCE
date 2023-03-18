import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadCooperadoraComponent } from './autoridad-cooperadora.component';

describe('AutoridadCooperadoraComponent', () => {
  let component: AutoridadCooperadoraComponent;
  let fixture: ComponentFixture<AutoridadCooperadoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoridadCooperadoraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoridadCooperadoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
