import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SOverviewViewComponent } from './s-overview-view.component';

describe('SOverviewViewComponent', () => {
  let component: SOverviewViewComponent;
  let fixture: ComponentFixture<SOverviewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SOverviewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SOverviewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
