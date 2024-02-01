import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterData',
  pure: true,
})
export class FilterDataPipe implements PipeTransform {
  transform(value: any[], propName: string, filterString: string): any[] {
    const resultArray = [];
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

// @NgModule({
//   imports: [CommonModule],
//   declarations: [FilterDataPipe],
//   exports: [FilterDataPipe, CommonModule, FormsModule],
// })
// export class NgFilterDataPipe {}
