import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioscoInsupdComponent } from './kiosco-insupd.component';

describe('KioscoInsupdComponent', () => {
  let component: KioscoInsupdComponent;
  let fixture: ComponentFixture<KioscoInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KioscoInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KioscoInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
