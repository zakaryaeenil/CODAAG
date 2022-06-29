import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GStructureComponent } from './g-structure.component';

describe('GStructureComponent', () => {
  let component: GStructureComponent;
  let fixture: ComponentFixture<GStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
