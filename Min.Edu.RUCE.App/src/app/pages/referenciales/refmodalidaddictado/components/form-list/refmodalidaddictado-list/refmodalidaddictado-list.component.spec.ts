import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefmodalidaddictadoListComponent } from './refmodalidaddictado-list.component';

describe('RefmodalidaddictadoListComponent', () => {
  let component: RefmodalidaddictadoListComponent;
  let fixture: ComponentFixture<RefmodalidaddictadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefmodalidaddictadoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefmodalidaddictadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
