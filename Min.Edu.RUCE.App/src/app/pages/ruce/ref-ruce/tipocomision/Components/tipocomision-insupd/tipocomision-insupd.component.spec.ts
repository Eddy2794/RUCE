import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipocomisionInsupdComponent } from './tipocomision-insupd.component';

describe('TipocomisionInsupdComponent', () => {
  let component: TipocomisionInsupdComponent;
  let fixture: ComponentFixture<TipocomisionInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipocomisionInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipocomisionInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
