import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PContratComponent } from './p-contrat.component';

describe('PContratComponent', () => {
  let component: PContratComponent;
  let fixture: ComponentFixture<PContratComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PContratComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
