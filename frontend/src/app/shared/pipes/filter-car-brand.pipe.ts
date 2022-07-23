import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe register pipe with name = filterCarBrand this pipe will be connector between input element and carBrandList
 */
@Pipe({
  name: 'filterCarBrand'
})

export class FilterCarBrandPipe implements PipeTransform {
  /**
   * Transforms filter car brand pipe 
   * @param value containts element will be processed by pipe
   * @param filterString containts filter string will be filter value response
   * @returns  value after filter by filterstring
   */
  transform(value: any, filterString:string){
    // Filter logic process 
    const carBrands = [];
    for(const carBrand of value){
      if(carBrand['name'].toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ){
        carBrands.push(carBrand);
      }
    }
    return carBrands;
  }

}
