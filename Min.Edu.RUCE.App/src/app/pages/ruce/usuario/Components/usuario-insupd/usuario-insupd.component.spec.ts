import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInsupdComponent } from './usuario-insupd.component';

describe('UsuarioInsupdComponent', () => {
  let component: UsuarioInsupdComponent;
  let fixture: ComponentFixture<UsuarioInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
