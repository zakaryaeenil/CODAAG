import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EProjectsComponent } from './e-projects.component';

describe('EProjectsComponent', () => {
  let component: EProjectsComponent;
  let fixture: ComponentFixture<EProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
