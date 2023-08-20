import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocomisionListComponent } from './tipocomision-list.component';

describe('TipocomisionListComponent', () => {
  let component: TipocomisionListComponent;
  let fixture: ComponentFixture<TipocomisionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipocomisionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipocomisionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
