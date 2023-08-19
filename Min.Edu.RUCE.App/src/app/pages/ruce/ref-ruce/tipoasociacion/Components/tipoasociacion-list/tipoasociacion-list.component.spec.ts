import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoasociacionListComponent } from './tipoasociacion-list.component';

describe('TipoasociacionListComponent', () => {
  let component: TipoasociacionListComponent;
  let fixture: ComponentFixture<TipoasociacionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoasociacionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoasociacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
