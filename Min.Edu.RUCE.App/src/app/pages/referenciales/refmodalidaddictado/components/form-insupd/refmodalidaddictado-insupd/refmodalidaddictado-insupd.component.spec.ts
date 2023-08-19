import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefmodalidaddictadoInsupdComponent } from './refmodalidaddictado-insupd.component';

describe('RefmodalidaddictadoInsupdComponent', () => {
  let component: RefmodalidaddictadoInsupdComponent;
  let fixture: ComponentFixture<RefmodalidaddictadoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefmodalidaddictadoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefmodalidaddictadoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
