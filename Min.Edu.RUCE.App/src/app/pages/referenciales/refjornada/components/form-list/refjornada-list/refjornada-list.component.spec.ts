import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefjornadaListComponent } from './refjornada-list.component';

describe('RefjornadaListComponent', () => {
  let component: RefjornadaListComponent;
  let fixture: ComponentFixture<RefjornadaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefjornadaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefjornadaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
