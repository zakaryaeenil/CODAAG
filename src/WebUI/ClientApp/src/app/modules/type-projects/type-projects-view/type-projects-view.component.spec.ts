import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProjectsViewComponent } from './type-projects-view.component';

describe('TypeProjectsViewComponent', () => {
  let component: TypeProjectsViewComponent;
  let fixture: ComponentFixture<TypeProjectsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeProjectsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProjectsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
