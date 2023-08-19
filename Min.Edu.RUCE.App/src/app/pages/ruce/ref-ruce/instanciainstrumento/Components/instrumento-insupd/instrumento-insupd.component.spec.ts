import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentoInsupdComponent } from './instrumento-insupd.component';

describe('InstrumentoInsupdComponent', () => {
  let component: InstrumentoInsupdComponent;
  let fixture: ComponentFixture<InstrumentoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstrumentoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstrumentoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
