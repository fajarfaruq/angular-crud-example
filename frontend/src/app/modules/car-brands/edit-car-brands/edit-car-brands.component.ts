import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-car-brands',
  templateUrl: './edit-car-brands.component.html',
  styleUrls: ['./edit-car-brands.component.scss']
})
export class EditCarBrandsComponent implements OnInit {

  constructor(
    private location : Location
  ) { }

  ngOnInit(): void {
  }

  backClicked() {
    this.location.back()
  }
}
