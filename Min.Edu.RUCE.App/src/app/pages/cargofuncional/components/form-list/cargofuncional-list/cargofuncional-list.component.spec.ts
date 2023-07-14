import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargofuncionalListComponent } from './cargofuncional-list.component';

describe('CargofuncionalListComponent', () => {
  let component: CargofuncionalListComponent;
  let fixture: ComponentFixture<CargofuncionalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargofuncionalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargofuncionalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
