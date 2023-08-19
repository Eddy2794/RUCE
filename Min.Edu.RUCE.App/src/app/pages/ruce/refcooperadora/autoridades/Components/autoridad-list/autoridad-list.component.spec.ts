import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadListComponent } from './autoridad-list.component';

describe('AutoridadListComponent', () => {
  let component: AutoridadListComponent;
  let fixture: ComponentFixture<AutoridadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoridadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoridadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
