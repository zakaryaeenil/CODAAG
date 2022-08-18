import { ComponentFixture, TestBed } from '@angular/core/testing';

import { POverViewViewComponent } from './p-over-view-view.component';

describe('POverViewViewComponent', () => {
  let component: POverViewViewComponent;
  let fixture: ComponentFixture<POverViewViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ POverViewViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(POverViewViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
