import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CarBrandService } from './services/car-brand.service';

/**
 * Ng module using for register all service file inside core folder 
 */
@NgModule({
  providers: [CarBrandService],
})

export class CoreModule {
  /**
   * Creates an instance of core module.
   * @param parentModule 
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
