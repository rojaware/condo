// monthname.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthname',
})
export class MonthNamePipe implements PipeTransform {
  transform(monthNumber: number): string {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames[monthNumber ];
  }
}
