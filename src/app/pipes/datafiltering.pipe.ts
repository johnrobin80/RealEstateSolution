import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datafiltering',
})
export class DatafilteringPipe implements PipeTransform {
  transform(value: any[], propName: string, filterString: string): any[] {
    const resultArray = [];
    alert('DatafilteringPipe ==> ' + value.length);
    if (value.length === 0 || propName === '' || filterString === '') {
      return value;
    }

    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }

    return resultArray;
  }
}
