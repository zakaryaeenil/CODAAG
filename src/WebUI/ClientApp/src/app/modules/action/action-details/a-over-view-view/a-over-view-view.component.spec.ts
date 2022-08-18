import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AOverViewViewComponent } from './a-over-view-view.component';

describe('AOverViewViewComponent', () => {
  let component: AOverViewViewComponent;
  let fixture: ComponentFixture<AOverViewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AOverViewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AOverViewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
