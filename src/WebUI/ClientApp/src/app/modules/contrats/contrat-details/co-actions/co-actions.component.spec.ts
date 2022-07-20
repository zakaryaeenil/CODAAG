import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoActionsComponent } from './co-actions.component';

describe('CoActionsComponent', () => {
  let component: CoActionsComponent;
  let fixture: ComponentFixture<CoActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
