import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarBrandsComponent } from './add-car-brands.component';

describe('AddCarBrandsComponent', () => {
  let component: AddCarBrandsComponent;
  let fixture: ComponentFixture<AddCarBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
