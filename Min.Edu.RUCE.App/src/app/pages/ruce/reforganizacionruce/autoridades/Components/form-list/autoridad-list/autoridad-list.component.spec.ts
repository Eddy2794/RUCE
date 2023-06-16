import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanunidadListComponent } from './planunidad-list.component';

describe('PlanunidadListComponent', () => {
  let component: PlanunidadListComponent;
  let fixture: ComponentFixture<PlanunidadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanunidadListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanunidadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
