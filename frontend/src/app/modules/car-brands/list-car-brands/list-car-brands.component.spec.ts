import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarBrandsComponent } from './list-car-brands.component';

describe('ListCarBrandsComponent', () => {
  let component: ListCarBrandsComponent;
  let fixture: ComponentFixture<ListCarBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCarBrandsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCarBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
