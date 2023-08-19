import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosalarialInsupdComponent } from './cargosalarial-insupd.component';

describe('CargosalarialInsupdComponent', () => {
  let component: CargosalarialInsupdComponent;
  let fixture: ComponentFixture<CargosalarialInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargosalarialInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargosalarialInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
