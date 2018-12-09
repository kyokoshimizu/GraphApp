import { Component } from '@angular/core';
import * as _ from 'lodash';

interface SeriesInterface {
  value: number;
  name: number;
}
interface GraphInterface {
  name: 'PureJS' | 'Lodash';
  series: SeriesInterface[];
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
  inputData: GraphInterface[] = [];
  pureJSAve: number;
  lodashAve: number;

  constructor() {}

  onClick() {
    const data1: InitialDataInterface[] = [];
    const data2: InitialDataInterface[] = [];
    Array.from({ length: 10000 }, () => {
      const num = Math.random();
      data1.push({ a: num });
      data2.push({ a: num });
    });

    this.inputData = this.measur(data1, data2);
    this.pureJSAve = this.calcAverage(this.inputData[0].series);
    this.lodashAve = this.calcAverage(this.inputData[1].series);
  }

  measur(data1, data2): GraphInterface[] {
    let result1: SeriesInterface[] = [];
    let result2: SeriesInterface[] = [];
    Array.from({ length: this.roopCount }, (_, index) => {
      result1.push({ value: this.pureJS(data1), name: index });
      result2.push({ value: this.lodash(data2), name: index });
    });

    return [ { name: 'PureJS', series: result1 }, { name: 'Lodash', series: result2 } ];
  }

  calcAverage(result: SeriesInterface[]): number {
    return _.sum(result.map(o => { return o.value; })) / this.roopCount;
  }

  pureJS(data: InitialDataInterface[]): number {
    const start_ms = performance.now();
    let sum = 0;
    data.map(o => { return o.a })
      .filter(a => a % 2)
      .forEach(n => sum += n);
    return (performance.now() - start_ms);
  }

  lodash(data: InitialDataInterface[]): number {
    const start_ms = performance.now();
    _.chain(data).map('a')
      .filter(a => a % 2).sum().value();
    return (performance.now() - start_ms);
  }
}
