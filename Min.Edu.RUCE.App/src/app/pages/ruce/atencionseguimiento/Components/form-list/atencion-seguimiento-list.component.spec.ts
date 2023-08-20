import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionSeguimientoListComponent } from './atencion-seguimiento-list.component';

describe('AtencionSeguimientoListComponent', () => {
  let component: AtencionSeguimientoListComponent;
  let fixture: ComponentFixture<AtencionSeguimientoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionSeguimientoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionSeguimientoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
