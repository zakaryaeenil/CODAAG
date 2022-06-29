import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProjectUpdateComponent } from './type-project-update.component';

describe('TypeProjectUpdateComponent', () => {
  let component: TypeProjectUpdateComponent;
  let fixture: ComponentFixture<TypeProjectUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeProjectUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProjectUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
