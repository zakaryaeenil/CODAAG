import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoOverViewComponent } from './co-over-view.component';

describe('CoOverViewComponent', () => {
  let component: CoOverViewComponent;
  let fixture: ComponentFixture<CoOverViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoOverViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoOverViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
