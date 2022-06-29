import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OStructureComponent } from './o-structure.component';

describe('OStructureComponent', () => {
  let component: OStructureComponent;
  let fixture: ComponentFixture<OStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
