import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-pattern2',
  templateUrl: './pattern2.component.html',
  styleUrls: ['./pattern2.component.css']
})
export class Pattern2Component implements OnInit {
  view = [700, 400];
  result1: { value: number, name: number }[] = [];
  result2: { value: number, name: number }[] = [];
  inputData: any;
  pureJSAve: number;
  lodashAve: number;

  constructor() {}

  ngOnInit() {}

  measur() {
    const data1: { a: number }[] = [];
    const data2: { a: number }[] = [];

    Array.from({ length: 10000 }, () => {
      const num = Math.random();
      data1.push({ a: num });
      data2.push({ a: num });
    });

    Array.from({ length: 50 }, (_, index) => {
      this.result1.push({ value: this.pureJS(data1), name: index });
      this.result2.push({ value: this.lodash(data2), name: index });
    });

    this.inputData = [ { name: 'PureJS', series: this.result1 }, { name: 'Lodash', series: this.result2 } ];
    this.pureJSAve = _.sum(this.result1.map(o => { return o.value; })) / 50;
    this.lodashAve = _.sum(this.result2.map(o => { return o.value; })) / 50;
  }

  pureJS(data: { a: number }[]): number {
    const start_ms = performance.now();
    data.forEach(list => list.a *= 3);
    data.sort((l1, l2) => { return (l1.a > l2.a) ? 1 : -1 });
    return (performance.now() - start_ms);
  }
  
  lodash(data: { a: number }[]): number {
    const start_ms = performance.now();
    _.chain(data).each(list => list.a *= 3)
      .sortBy('a').value();
    return (performance.now() - start_ms);
  }
}
