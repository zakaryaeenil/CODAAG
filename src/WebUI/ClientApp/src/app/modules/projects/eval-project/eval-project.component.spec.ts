import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalProjectComponent } from './eval-project.component';

describe('EvalProjectComponent', () => {
  let component: EvalProjectComponent;
  let fixture: ComponentFixture<EvalProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
