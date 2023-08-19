import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInsupdComponent } from './cooperadora-form-insupd.component';

describe('FormInsupdComponent', () => {
  let component: FormInsupdComponent;
  let fixture: ComponentFixture<FormInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
