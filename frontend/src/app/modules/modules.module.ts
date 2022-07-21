import { NgModule } from '@angular/core';
import { CarBrandsModule } from './car-brands/car-brands.module';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [],
  imports: [
    CarBrandsModule,
    LayoutModule
  ],
  exports:[
    CarBrandsModule,
    LayoutModule
  ]
})
export class ModulesModule { }
