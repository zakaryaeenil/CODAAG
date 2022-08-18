import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AEvaluationComponent } from './a-evaluation.component';

describe('AEvaluationComponent', () => {
  let component: AEvaluationComponent;
  let fixture: ComponentFixture<AEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
