import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsupdComponent } from './insupd.component';

describe('InsupdComponent', () => {
  let component: InsupdComponent;
  let fixture: ComponentFixture<InsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
