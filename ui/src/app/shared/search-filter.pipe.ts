import { Pipe, PipeTransform } from '@angular/core';
import { Property } from '@app/models/property.model';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(list: any[], filterText: string): any {
    return list
      ? list.filter(
          (item) => this.hasInclude(item, filterText.toLowerCase())
            //item.name.search(new RegExp(filterText, 'i')) > -1
        )
      : [];
  }

  hasInclude(item: Property, key: string): boolean {
    const children = Object.values(item);
    const value = children.join();
    return value.toLowerCase().includes(key)
  }  
}