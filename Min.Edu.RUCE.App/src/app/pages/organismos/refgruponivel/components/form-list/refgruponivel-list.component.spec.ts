import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefgruponivelListComponent } from './refgruponivel-list.component';

describe('RefgruponivelListComponent', () => {
  let component: RefgruponivelListComponent;
  let fixture: ComponentFixture<RefgruponivelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefgruponivelListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefgruponivelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
