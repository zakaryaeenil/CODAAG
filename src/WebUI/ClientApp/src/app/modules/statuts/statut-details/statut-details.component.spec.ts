import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutDetailsComponent } from './statut-details.component';

describe('StatutDetailsComponent', () => {
  let component: StatutDetailsComponent;
  let fixture: ComponentFixture<StatutDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
