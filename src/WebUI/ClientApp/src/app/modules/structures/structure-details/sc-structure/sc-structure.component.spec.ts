import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScStructureComponent } from './sc-structure.component';

describe('ScStructureComponent', () => {
  let component: ScStructureComponent;
  let fixture: ComponentFixture<ScStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
