import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProjectDetailsComponent } from './type-project-details.component';

describe('TypeProjectDetailsComponent', () => {
  let component: TypeProjectDetailsComponent;
  let fixture: ComponentFixture<TypeProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeProjectDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
