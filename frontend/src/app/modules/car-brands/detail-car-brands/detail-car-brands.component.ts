import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CarBrandService } from 'src/app/core/services/car-brand.service';

/**
 * Component is using for register selector ,templateUrl and styleUrls
 */
@Component({
  selector: 'app-detail-car-brands',
  templateUrl: './detail-car-brands.component.html',
  styleUrls: ['./detail-car-brands.component.scss']
})

export class DetailCarBrandsComponent implements OnInit {

  /**
   * Id of detail car brands component using for catch parameter id from route
   */
  id = this.actRoute.snapshot.params['id'];

  /**
   * Car brand data of detail car brands component is initial variable will be contains response of API car brand detail
   */
  carBrandData: any = {};

  /**
   * Creates an instance of detail car brands component.
   * @param carBrandService is using for register carBrandService file which is API logic where located
   * @param actRoute        is using for catch activated route
   * @param router          is using for initialize router module
   */
  constructor(
    private carBrandService: CarBrandService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }

  /**
   * on init for initialize API get car brand with id parameter in the first
   */
  ngOnInit(): void {
    this.carBrandService.getCarBrand(this.id).subscribe((data: {}) => {
      this.carBrandData = data;
    });
  }

  /**
   * Deletes car brand  using for delete car brand by id 
   */
  deleteCarBrand(){
    if (window.confirm('Are you sure, you want to delete?')) {
      this.carBrandService.deleteCarBrand(this.id).subscribe((data: {}) => {
        this.router.navigate(['car-brands/list']);
      });
    }
  }

  /**
   * Backs clicked using for back to previous page
   */
  backClicked() {
    this.router.navigate(['car-brands/list']);
  }
}
