import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipodocumentoInsupdComponent } from './tipodocumento-insupd.component';

describe('TipodocumentoInsupdComponent', () => {
  let component: TipodocumentoInsupdComponent;
  let fixture: ComponentFixture<TipodocumentoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipodocumentoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipodocumentoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
