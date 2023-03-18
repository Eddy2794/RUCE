import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefgruponivelInsupdComponent } from './refgruponivel-insupd.component';

describe('RefgruponivelInsupdComponent', () => {
  let component: RefgruponivelInsupdComponent;
  let fixture: ComponentFixture<RefgruponivelInsupdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefgruponivelInsupdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefgruponivelInsupdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
