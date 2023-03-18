import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioscoComponent } from './kiosco.component';

describe('KioscoComponent', () => {
  let component: KioscoComponent;
  let fixture: ComponentFixture<KioscoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KioscoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KioscoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
