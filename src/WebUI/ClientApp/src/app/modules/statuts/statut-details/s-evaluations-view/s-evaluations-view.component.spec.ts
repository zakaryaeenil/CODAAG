import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SEvaluationsViewComponent } from './s-evaluations-view.component';

describe('SEvaluationsViewComponent', () => {
  let component: SEvaluationsViewComponent;
  let fixture: ComponentFixture<SEvaluationsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SEvaluationsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SEvaluationsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
