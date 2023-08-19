import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizacionRUCEListComponent } from './organizacionruce-list.component';

describe('OrganizacionRUCEListComponent', () => {
  let component: OrganizacionRUCEListComponent;
  let fixture: ComponentFixture<OrganizacionRUCEListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizacionRUCEListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizacionRUCEListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
