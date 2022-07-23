import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarBrandService } from 'src/app/core/services/car-brand.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCarBrandsComponent } from '../add-car-brands/add-car-brands.component';

/**
 * Component is using for register selector ,templateUrl and styleUrls
 */
@Component({
  selector: 'app-list-car-brands',
  templateUrl: './list-car-brands.component.html',
  styleUrls: ['./list-car-brands.component.scss'],
})

export class ListCarBrandsComponent implements OnInit {
  /**
   * Entered search car brand of list car brands component using for filled search brand car input
   */
  enteredSearchCarBrand: string = '';

  /**
   * Car brand data of list car brands component is initial variable will be contains response of API car brand detail
   */
  carBrandData: any = [];

  /**
   * Creates an instance of list car brands component.
   * @param carBrandService   is using for register carBrandService file which is API logic where located
   * @param dialog            is using for register MatDialog module
   */
  constructor(
    private carBrandService: CarBrandService,
    private dialog: MatDialog
  ) {}


  /**
   * on init for initialize carBrandData variable filled with listAllCarBrand from carBrandService responses 
  *              will be show on car list element
   */
  ngOnInit(): void {
    this.carBrandService.listAllCarBrand().subscribe((data: {}) => {
      this.carBrandData = data;
    });
  }

  /**
   * Opens dialog add car brands using for show add car brand dialog 
   */
  openDialogAddCarBrands(){
    // Define dialog config as Matdialogconfig
    const dialogConfig = new MatDialogConfig();
    // MatDialog config
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'modal-form';
    dialogConfig.width = '600px';
    // Execute open dialog 
    this.dialog.open(AddCarBrandsComponent, dialogConfig);
  }

}

