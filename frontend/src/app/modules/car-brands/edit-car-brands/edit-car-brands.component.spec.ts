import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarBrandsComponent } from './edit-car-brands.component';

describe('EditCarBrandsComponent', () => {
  let component: EditCarBrandsComponent;
  let fixture: ComponentFixture<EditCarBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
