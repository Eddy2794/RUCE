import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosalarialListComponent } from './cargosalarial-list.component';

describe('CargosalarialListComponent', () => {
  let component: CargosalarialListComponent;
  let fixture: ComponentFixture<CargosalarialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargosalarialListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargosalarialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
