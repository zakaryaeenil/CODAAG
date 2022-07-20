import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpOverviewViewComponent } from './tp-overview-view.component';

describe('TpOverviewViewComponent', () => {
  let component: TpOverviewViewComponent;
  let fixture: ComponentFixture<TpOverviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpOverviewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpOverviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
