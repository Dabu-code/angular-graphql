import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productPipe',
  standalone:true
})
export class ProductPipe implements PipeTransform {

  transform(data: any, text: string): any {
    if (text === '' || text == null || text.length < 1) return data;
    const resultado = [];
    for (const items of data) {
      if (items.title.toLowerCase().includes(text.toLowerCase())) resultado.push(items);
    }
    return resultado;
  }


}
