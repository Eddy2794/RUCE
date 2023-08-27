import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KioscoListComponent } from './kiosco-list.component';

describe('KioscoListComponent', () => {
  let component: KioscoListComponent;
  let fixture: ComponentFixture<KioscoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KioscoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KioscoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
