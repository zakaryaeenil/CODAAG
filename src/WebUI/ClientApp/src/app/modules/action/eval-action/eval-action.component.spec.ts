import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalActionComponent } from './eval-action.component';

describe('EvalActionComponent', () => {
  let component: EvalActionComponent;
  let fixture: ComponentFixture<EvalActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvalActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
