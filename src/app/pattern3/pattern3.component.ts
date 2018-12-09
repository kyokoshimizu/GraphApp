import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-pattern3',
  templateUrl: './pattern3.component.html',
  styleUrls: ['./pattern3.component.css']
})
export class Pattern3Component implements OnInit {
  view = [700, 400];
  result1: { value: number, name: number }[] = [];
  result2: { value: number, name: number }[] = [];
  result3: { value: number, name: number }[] = [];
  inputData: any;
  pureJSAve: number;
  pureJSAve2: number;
  lodashAve: number;

  constructor() {}

  ngOnInit() {}

  measur() {
    const data1: { b: number[] }[] = [];
    const data2: { b: number[] }[] = [];
    const data3: { b: number[] }[] = [];

    Array.from({ length: 10000 }, (_) => {
      data1.push({ b: [1, 2, 3] });
      data2.push({ b: [1, 2, 3] });
      data3.push({ b: [1, 2, 3] });
    });

    Array.from({ length: 10 }, (_, index) => {
      this.result1.push({ value: this.pureJS(data1), name: index });
      this.result2.push({ value: this.pureJS2(data1), name: index });
      this.result3.push({ value: this.lodash(data3), name: index });
    });

    this.inputData = [
      { name: 'PureJS1', series: this.result1 },
      { name: 'PureJS2', series: this.result2 },
      { name: 'Lodash', series: this.result3 },
    ];
    this.pureJSAve = _.sum(this.result1.map(o => { return o.value; })) / 10;
    this.pureJSAve2 = _.sum(this.result2.map(o => { return o.value; })) / 10;
    this.lodashAve = _.sum(this.result3.map(o => { return o.value; })) / 10;
  }

  pureJS(data: { b: number[] }[]) {
    const start_ms = performance.now();
    data.map((o) => { return o.b })
      .reduce((a, b) => a.concat(b), []);
    return (performance.now() - start_ms);
  }

  pureJS2 = (data: { b: number[] }[]) => {
    const start_ms = performance.now();
    ([] as number[]).concat(...data.map((o) => { return o.b }));
    return (performance.now() - start_ms);
  }
  
  lodash(data: { b: number[] }[]) {
    const start_ms = performance.now();
    _.chain(data).map('b')
      .flatten().value();
    return (performance.now() - start_ms);
  }
}
