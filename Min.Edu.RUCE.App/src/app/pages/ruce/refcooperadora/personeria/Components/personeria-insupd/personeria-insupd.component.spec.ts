import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneriaInsupdComponent } from './personeria-insupd.component';

describe('PersoneriaInsupdComponent', () => {
  let component: PersoneriaInsupdComponent;
  let fixture: ComponentFixture<PersoneriaInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneriaInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersoneriaInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
