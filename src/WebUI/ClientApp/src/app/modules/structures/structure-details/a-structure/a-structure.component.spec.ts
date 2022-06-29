import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AStructureComponent } from './a-structure.component';

describe('AStructureComponent', () => {
  let component: AStructureComponent;
  let fixture: ComponentFixture<AStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
