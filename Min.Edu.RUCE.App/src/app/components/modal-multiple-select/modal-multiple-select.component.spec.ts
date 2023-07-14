import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMultipleSelectComponent } from './modal-multiple-select.component';

describe('ModalMultipleSelectComponent', () => {
  let component: ModalMultipleSelectComponent;
  let fixture: ComponentFixture<ModalMultipleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMultipleSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMultipleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
