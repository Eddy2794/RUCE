import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanestudiobaseListComponent } from './planestudiobase-list.component';

describe('PlanestudiobaseListComponent', () => {
  let component: PlanestudiobaseListComponent;
  let fixture: ComponentFixture<PlanestudiobaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanestudiobaseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanestudiobaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
