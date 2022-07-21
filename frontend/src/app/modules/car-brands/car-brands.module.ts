import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCarBrandsComponent } from './list-car-brands/list-car-brands.component';
import { DetailCarBrandsComponent } from './detail-car-brands/detail-car-brands.component';
import { AddCarBrandsComponent } from './add-car-brands/add-car-brands.component';
import { EditCarBrandsComponent } from './edit-car-brands/edit-car-brands.component';
import { DeleteCarBrandsComponent } from './delete-car-brands/delete-car-brands.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ListCarBrandsComponent,
    DetailCarBrandsComponent,
    AddCarBrandsComponent,
    EditCarBrandsComponent,
    DeleteCarBrandsComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
  ],
  exports:[
    ListCarBrandsComponent,
    DetailCarBrandsComponent,
    AddCarBrandsComponent,
    EditCarBrandsComponent,
    DeleteCarBrandsComponent
  ]
})
export class CarBrandsModule { 
  
}
