import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAsociacionComponent } from './tipo-asociacion.component';

describe('TipoAsociacionComponent', () => {
  let component: TipoAsociacionComponent;
  let fixture: ComponentFixture<TipoAsociacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoAsociacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
