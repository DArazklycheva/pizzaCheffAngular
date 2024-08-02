import { Pipe, PipeTransform } from '@angular/core';
import { ProductType } from 'src/types/product.type';

@Pipe({
  name: 'chickenProducts',
})
export class ChickenProductsPipe implements PipeTransform {
  transform(products: ProductType[]): ProductType[] {
    return products.filter((item) =>
      item.title.toLocaleLowerCase().includes('кур')
    );
  }
}
