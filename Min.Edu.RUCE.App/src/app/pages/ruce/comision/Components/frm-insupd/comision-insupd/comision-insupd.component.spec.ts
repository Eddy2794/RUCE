import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionInsupdComponent } from '../frm-insupd/comision-insupd.component';

describe('InsupdComponent', () => {
  let component: ComisionInsupdComponent;
  let fixture: ComponentFixture<ComisionInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComisionInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComisionInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
