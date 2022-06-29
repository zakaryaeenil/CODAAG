import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationCreateComponent } from './evaluation-create.component';

describe('EvaluationCreateComponent', () => {
  let component: EvaluationCreateComponent;
  let fixture: ComponentFixture<EvaluationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
