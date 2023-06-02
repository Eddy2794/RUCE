import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperadoraInsupdComponent } from './cooperadora-insupd.component';

describe('CooperadoraInsupdComponent', () => {
  let component: CooperadoraInsupdComponent;
  let fixture: ComponentFixture<CooperadoraInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooperadoraInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooperadoraInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
