import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoasociacionInsupdComponent } from './tipoasociacion-insupd.component';

describe('TipoasociacionInsupdComponent', () => {
  let component: TipoasociacionInsupdComponent;
  let fixture: ComponentFixture<TipoasociacionInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoasociacionInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoasociacionInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
