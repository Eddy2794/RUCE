import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadFormListComponent } from './form-list.component';

describe('AutoridadFormListComponent', () => {
  let component: AutoridadFormListComponent;
  let fixture: ComponentFixture<AutoridadFormListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoridadFormListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoridadFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
