import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoProjectsComponent } from './co-projects.component';

describe('CoProjectsComponent', () => {
  let component: CoProjectsComponent;
  let fixture: ComponentFixture<CoProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
