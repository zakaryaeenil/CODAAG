import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutUpdateComponent } from './statut-update.component';

describe('StatutUpdateComponent', () => {
  let component: StatutUpdateComponent;
  let fixture: ComponentFixture<StatutUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
