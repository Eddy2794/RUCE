import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmplazacreateComponent } from './fmplazacreate.component';

describe('FmplazacreateComponent', () => {
  let component: FmplazacreateComponent;
  let fixture: ComponentFixture<FmplazacreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmplazacreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FmplazacreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
