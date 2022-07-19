import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCarBrandsComponent } from './delete-car-brands.component';

describe('DeleteCarBrandsComponent', () => {
  let component: DeleteCarBrandsComponent;
  let fixture: ComponentFixture<DeleteCarBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCarBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCarBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
