import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpProjectsComponent } from './tp-projects.component';

describe('TpProjectsComponent', () => {
  let component: TpProjectsComponent;
  let fixture: ComponentFixture<TpProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TpProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
