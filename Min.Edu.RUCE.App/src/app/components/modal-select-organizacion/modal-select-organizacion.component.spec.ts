import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSelectOrganizacionComponent } from './modal-select-organizacion.component';

describe('ModalSelectOrganizacionComponent', () => {
  let component: ModalSelectOrganizacionComponent;
  let fixture: ComponentFixture<ModalSelectOrganizacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSelectOrganizacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSelectOrganizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
