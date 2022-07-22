import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CarBrandService } from 'src/app/core/services/car-brand.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCarBrandsComponent } from '../add-car-brands/add-car-brands.component';

@Component({
  selector: 'app-list-car-brands',
  templateUrl: './list-car-brands.component.html',
  styleUrls: ['./list-car-brands.component.scss'],
})
export class ListCarBrandsComponent implements OnInit {
  enteredSearchCarBrand: string = '';
  carBrandData: any = [];

  constructor(
    private carBrandService: CarBrandService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listAllCarBrand();
  }

  listAllCarBrand() {
    return this.carBrandService.listAllCarBrand().subscribe((data: {}) => {
      this.carBrandData = data;
    });
  }

  openDialogAddCarBrands(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'modal-form';
    dialogConfig.width = '600px';

    this.dialog.open(AddCarBrandsComponent, dialogConfig);
  }

}

