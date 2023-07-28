import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersoneriaListComponent } from './personeria-list.component';

describe('PersoneriaListComponent', () => {
  let component: PersoneriaListComponent;
  let fixture: ComponentFixture<PersoneriaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersoneriaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersoneriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
