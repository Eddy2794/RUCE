import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMultipleSelectComponent } from './tablemultipleselect.component';

describe('TablemultipleselectComponent', () => {
  let component: TableMultipleSelectComponent;
  let fixture: ComponentFixture<TableMultipleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMultipleSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableMultipleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
