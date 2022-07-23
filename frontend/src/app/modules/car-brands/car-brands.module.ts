import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCarBrandsComponent } from './list-car-brands/list-car-brands.component';
import { DetailCarBrandsComponent } from './detail-car-brands/detail-car-brands.component';
import { AddCarBrandsComponent } from './add-car-brands/add-car-brands.component';
import { EditCarBrandsComponent } from './edit-car-brands/edit-car-brands.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterCarBrandPipe } from 'src/app/shared/pipes/filter-car-brand.pipe';

/**
 * Ng module
 */
@NgModule({
  declarations: [
    ListCarBrandsComponent,
    DetailCarBrandsComponent,
    AddCarBrandsComponent,
    EditCarBrandsComponent,
    FilterCarBrandPipe
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ListCarBrandsComponent,
    DetailCarBrandsComponent,
    AddCarBrandsComponent,
    EditCarBrandsComponent
  ]
})
export class CarBrandsModule { }
