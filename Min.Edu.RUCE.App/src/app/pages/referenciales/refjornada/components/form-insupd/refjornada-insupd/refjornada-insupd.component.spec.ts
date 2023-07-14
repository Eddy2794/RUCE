import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefjornadaInsupdComponent } from './refjornada-insupd.component';

describe('RefjornadaInsupdComponent', () => {
  let component: RefjornadaInsupdComponent;
  let fixture: ComponentFixture<RefjornadaInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefjornadaInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefjornadaInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
