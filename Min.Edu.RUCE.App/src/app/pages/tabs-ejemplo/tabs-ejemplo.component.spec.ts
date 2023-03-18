import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsEjemploComponent } from './tabs-ejemplo.component';

describe('TabsEjemploComponent', () => {
  let component: TabsEjemploComponent;
  let fixture: ComponentFixture<TabsEjemploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsEjemploComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabsEjemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
