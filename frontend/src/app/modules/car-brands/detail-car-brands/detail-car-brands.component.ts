import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-car-brands',
  templateUrl: './detail-car-brands.component.html',
  styleUrls: ['./detail-car-brands.component.scss']
})
export class DetailCarBrandsComponent implements OnInit {

  constructor(
    private location : Location
  ) { }

  ngOnInit(): void {
  }

  backClicked() {
    this.location.back()
  }
}
