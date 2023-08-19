import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionRUCEInsupdComponent } from './organizacionruce-insupd.component';

describe('OrganizacionRUCEInsupdComponent', () => {
  let component: OrganizacionRUCEInsupdComponent;
  let fixture: ComponentFixture<OrganizacionRUCEInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizacionRUCEInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizacionRUCEInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
