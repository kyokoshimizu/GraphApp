import { Component } from '@angular/core';
import * as _ from 'lodash';

interface SeriesInterface {
  value: number;
  name: number;
}
interface InitialDataInterface {
  a: number;
}

@Component({
  selector: 'app-pattern1',
  templateUrl: './pattern1.component.html',
  styleUrls: ['./pattern1.component.css']
})

export class Pattern1Component {
  view = [750, 450];
  roopCount = 50;
  inputData: { name: 'PureJS' | 'Lodash', series: SeriesInterface[] }[] = [];
  displayData: { label: string, average: number, class: string }[] = [];

  constructor() {}

  onClick() {
    const data1: InitialDataInterface[] = [];
    const data2: InitialDataInterface[] = [];
    Array.from({ length: 10000 }, () => {
      const num = Math.random();
      data1.push({ a: num });
      data2.push({ a: num });
    });

    const result1: SeriesInterface[] = [];
    const result2: SeriesInterface[] = [];
    Array.from({ length: this.roopCount }, ({}, index) => {
      result1.push({ value: this.pureJS(data1), name: index });
      result2.push({ value: this.lodash(data2), name: index });
    });

    this.inputData = [ { name: 'PureJS', series: result1 }, { name: 'Lodash', series: result2 } ];
    this.inputData.forEach((item, i) => {
      this.displayData.push({
        label: `${item.name}Average: `,
        average: this.calcAverage(item.series),
        class: `label${i + 1}`,
      });
    });

  }

  calcAverage(result: SeriesInterface[]): number {
    return _.sum(result.map(o => o.value)) / this.roopCount;
  }

  pureJS(data: InitialDataInterface[]): number {
    const startMs = performance.now();
    let sum = 0;
    data.map(o => o.a)
      .filter(a => a % 2)
      .forEach(n => sum += n);
    return performance.now() - startMs;
  }

  lodash(data: InitialDataInterface[]): number {
    const startMs = performance.now();
    _.chain(data).map('a')
      .filter(a => a % 2).sum().value();
    return performance.now() - startMs;
  }
}
