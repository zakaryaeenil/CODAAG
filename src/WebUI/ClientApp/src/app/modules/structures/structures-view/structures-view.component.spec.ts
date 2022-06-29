import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuresViewComponent } from './structures-view.component';

describe('StructuresViewComponent', () => {
  let component: StructuresViewComponent;
  let fixture: ComponentFixture<StructuresViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructuresViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuresViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
