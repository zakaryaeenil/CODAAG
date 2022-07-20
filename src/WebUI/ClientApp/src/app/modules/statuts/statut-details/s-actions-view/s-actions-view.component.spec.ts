import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SActionsViewComponent } from './s-actions-view.component';

describe('SActionsViewComponent', () => {
  let component: SActionsViewComponent;
  let fixture: ComponentFixture<SActionsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SActionsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SActionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
