import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutCreateComponent } from './statut-create.component';

describe('StatutCreateComponent', () => {
  let component: StatutCreateComponent;
  let fixture: ComponentFixture<StatutCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
