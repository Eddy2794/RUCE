import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazaInsupdComponent } from './plaza-insupd.component';

describe('PlazaInsupdComponent', () => {
  let component: PlazaInsupdComponent;
  let fixture: ComponentFixture<PlazaInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlazaInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlazaInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
