import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargofuncionalInsupdComponent } from './cargofuncional-insupd.component';

describe('CargofuncionalInsupdComponent', () => {
  let component: CargofuncionalInsupdComponent;
  let fixture: ComponentFixture<CargofuncionalInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargofuncionalInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargofuncionalInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
