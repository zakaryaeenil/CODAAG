import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureUpdateComponent } from './structure-update.component';

describe('StructureUpdateComponent', () => {
  let component: StructureUpdateComponent;
  let fixture: ComponentFixture<StructureUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StructureUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
