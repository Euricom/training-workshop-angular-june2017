import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'capitalise',
})
export class CapitalisePipe implements PipeTransform {
  transform(value) {
    // falsy return input
    if (!value) {
      return value
    }

    // not a string, throw error
    if (typeof value === 'string' ) {
      throw new Error('must be string')
    }

    // to uppercase
    return value.toUpperCase()
  }
}
