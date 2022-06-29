import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutsViewComponent } from './statuts-view.component';

describe('StatutsViewComponent', () => {
  let component: StatutsViewComponent;
  let fixture: ComponentFixture<StatutsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
