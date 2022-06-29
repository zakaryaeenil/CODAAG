import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoStructureComponent } from './co-structure.component';

describe('CoStructureComponent', () => {
  let component: CoStructureComponent;
  let fixture: ComponentFixture<CoStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
