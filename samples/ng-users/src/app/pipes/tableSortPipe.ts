import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';

@Pipe({
  name: 'tablesort',
})
export class TableSortPipe implements PipeTransform {

    transform(value: Array<any>, sortBy: string, order: string): Array<any> {
      if (value == null || !Array.isArray(value)) {
        return null;
      }

      const newValue = [...value];
      newValue.sort((a, b) => {
        return (a[sortBy] > b[sortBy] ? 1 : a[sortBy] === b[sortBy] ? 0 : -1) * (order === 'asc' ? 1 : -1);
      });

      return newValue;
    }
}
