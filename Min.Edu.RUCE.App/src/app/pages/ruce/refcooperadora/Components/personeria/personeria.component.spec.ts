import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneriaComponent } from './personeria.component';

describe('PersoneriaComponent', () => {
  let component: PersoneriaComponent;
  let fixture: ComponentFixture<PersoneriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersoneriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
