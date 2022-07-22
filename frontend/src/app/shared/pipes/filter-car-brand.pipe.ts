import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCarBrand'
})
export class FilterCarBrandPipe implements PipeTransform {

  transform(value: any, filterString:string){
    if(value.length === 0){
      return value;
    }

    const carBrands = [];
    for(const carBrand of value){
      if(carBrand['name'].toLowerCase().indexOf(filterString.toLowerCase()) !== -1 ){
        carBrands.push(carBrand);
      }
    }
    return carBrands;
  }

}
