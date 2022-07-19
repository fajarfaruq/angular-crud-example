import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCarBrandsComponent } from './detail-car-brands.component';

describe('DetailCarBrandsComponent', () => {
  let component: DetailCarBrandsComponent;
  let fixture: ComponentFixture<DetailCarBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailCarBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCarBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
