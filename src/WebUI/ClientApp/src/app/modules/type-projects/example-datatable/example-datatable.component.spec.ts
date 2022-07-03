import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDatatableComponent } from './example-datatable.component';

describe('ExampleDatatableComponent', () => {
  let component: ExampleDatatableComponent;
  let fixture: ComponentFixture<ExampleDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleDatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
