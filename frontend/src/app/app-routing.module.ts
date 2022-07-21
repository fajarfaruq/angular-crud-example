import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCarBrandsComponent } from './modules/car-brands/add-car-brands/add-car-brands.component';
import { DeleteCarBrandsComponent } from './modules/car-brands/delete-car-brands/delete-car-brands.component';
import { DetailCarBrandsComponent } from './modules/car-brands/detail-car-brands/detail-car-brands.component';
import { EditCarBrandsComponent } from './modules/car-brands/edit-car-brands/edit-car-brands.component';
import { ListCarBrandsComponent } from './modules/car-brands/list-car-brands/list-car-brands.component';

const routes: Routes = [
  { 
    path : 'car-brands', 
    children: [
      { path : 'add', component: AddCarBrandsComponent},
      { path : 'detail/:id', component: DetailCarBrandsComponent},
      { path : 'list' , component:ListCarBrandsComponent},
      { path : 'delete/:id', component:DeleteCarBrandsComponent},
      { path : 'edit/:id', component:EditCarBrandsComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
