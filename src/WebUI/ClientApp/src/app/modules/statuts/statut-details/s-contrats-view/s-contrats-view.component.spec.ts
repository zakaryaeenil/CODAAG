import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SContratsViewComponent } from './s-contrats-view.component';

describe('SContratsViewComponent', () => {
  let component: SContratsViewComponent;
  let fixture: ComponentFixture<SContratsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SContratsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SContratsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
