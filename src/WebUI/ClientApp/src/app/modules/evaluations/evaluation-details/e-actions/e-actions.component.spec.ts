import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EActionsComponent } from './e-actions.component';

describe('EActionsComponent', () => {
  let component: EActionsComponent;
  let fixture: ComponentFixture<EActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
