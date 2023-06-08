import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadesFormListComponent } from './autoridades-form-list.component';

describe('AutoridadesFormListComponent', () => {
  let component: AutoridadesFormListComponent;
  let fixture: ComponentFixture<AutoridadesFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoridadesFormListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoridadesFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
