import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipodocumentoListComponent } from './tipodocumento-list.component';

describe('TipodocumentoListComponent', () => {
  let component: TipodocumentoListComponent;
  let fixture: ComponentFixture<TipodocumentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipodocumentoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipodocumentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
