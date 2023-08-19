import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazaListComponent } from './plaza-list.component';

describe('PlazaListComponent', () => {
  let component: PlazaListComponent;
  let fixture: ComponentFixture<PlazaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlazaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlazaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
