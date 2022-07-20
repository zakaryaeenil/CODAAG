import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SProjectsViewComponent } from './s-projects-view.component';

describe('SProjectsViewComponent', () => {
  let component: SProjectsViewComponent;
  let fixture: ComponentFixture<SProjectsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SProjectsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SProjectsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
