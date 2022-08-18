import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PEvaluationComponent } from './p-evaluation.component';

describe('PEvaluationComponent', () => {
  let component: PEvaluationComponent;
  let fixture: ComponentFixture<PEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
