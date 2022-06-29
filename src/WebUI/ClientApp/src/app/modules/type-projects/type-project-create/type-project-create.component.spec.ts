import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProjectCreateComponent } from './type-project-create.component';

describe('TypeProjectCreateComponent', () => {
  let component: TypeProjectCreateComponent;
  let fixture: ComponentFixture<TypeProjectCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeProjectCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeProjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
