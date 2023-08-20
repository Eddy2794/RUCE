import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsupdPersoneriaComponent } from './insupd-personeria.component';

describe('InsupdPersoneriaComponent', () => {
  let component: InsupdPersoneriaComponent;
  let fixture: ComponentFixture<InsupdPersoneriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsupdPersoneriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsupdPersoneriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
