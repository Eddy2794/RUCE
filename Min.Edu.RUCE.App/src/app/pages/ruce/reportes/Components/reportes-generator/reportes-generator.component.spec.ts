import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesGeneratorComponent } from './reportes-generator.component';

describe('ReportesGeneratorComponent', () => {
  let component: ReportesGeneratorComponent;
  let fixture: ComponentFixture<ReportesGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesGeneratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
