import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PActionComponent } from './p-action.component';

describe('PActionComponent', () => {
  let component: PActionComponent;
  let fixture: ComponentFixture<PActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
