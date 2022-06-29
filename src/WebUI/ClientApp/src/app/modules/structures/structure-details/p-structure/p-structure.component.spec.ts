import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PStructureComponent } from './p-structure.component';

describe('PStructureComponent', () => {
  let component: PStructureComponent;
  let fixture: ComponentFixture<PStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
