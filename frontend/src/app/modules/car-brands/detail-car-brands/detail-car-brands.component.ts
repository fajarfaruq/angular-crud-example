import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CarBrandService } from 'src/app/core/services/car-brand.service';

@Component({
  selector: 'app-detail-car-brands',
  templateUrl: './detail-car-brands.component.html',
  styleUrls: ['./detail-car-brands.component.scss']
})
export class DetailCarBrandsComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  carBrandData: any = {};

  constructor(
    private location : Location,
    private carBrandService: CarBrandService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carBrandService.getCarBrand(this.id).subscribe((data: {}) => {
      this.carBrandData = data;
    });
  }

  deleteCarBrand(){
    if (window.confirm('Are you sure, you want to delete?')) {
      this.carBrandService.deleteCarBrand(this.id).subscribe((data: {}) => {
        this.router.navigate(['car-brands/list']);
      });
    }
  }

  backClicked() {
    this.router.navigate(['car-brands/list']);
  }
}
