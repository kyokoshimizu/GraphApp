import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatTableModule, MatTabsModule, } from '@angular/material';
import { Pattern1Component } from './pattern1/pattern1.component';
import { Pattern2Component } from './pattern2/pattern2.component';
import { Pattern3Component } from './pattern3/pattern3.component';

@NgModule({
  declarations: [
    AppComponent,
    Pattern1Component,
    Pattern2Component,
    Pattern3Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatTableModule,
    MatTabsModule,
    NgxChartsModule,
  ],
  exports: [
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
