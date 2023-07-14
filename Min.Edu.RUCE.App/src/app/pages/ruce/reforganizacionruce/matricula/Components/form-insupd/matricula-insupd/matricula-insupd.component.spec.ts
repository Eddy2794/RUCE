import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculaInsupdComponent } from './matricula-insupd.component';

describe('MatriculaInsupdComponent', () => {
  let component: MatriculaInsupdComponent;
  let fixture: ComponentFixture<MatriculaInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatriculaInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculaInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
