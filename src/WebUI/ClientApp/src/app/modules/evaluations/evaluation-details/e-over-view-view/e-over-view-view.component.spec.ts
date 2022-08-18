import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EOverViewViewComponent } from './e-over-view-view.component';

describe('EOverViewViewComponent', () => {
  let component: EOverViewViewComponent;
  let fixture: ComponentFixture<EOverViewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EOverViewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EOverViewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
