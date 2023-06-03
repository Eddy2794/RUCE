import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperadoraListComponent } from './cooperadora-list.component';

describe('CooperadoraListComponent', () => {
  let component: CooperadoraListComponent;
  let fixture: ComponentFixture<CooperadoraListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CooperadoraListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CooperadoraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
