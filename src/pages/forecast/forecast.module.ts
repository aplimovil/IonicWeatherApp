import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForecastPage } from './forecast';
//Import HighCharts modules for painting a bar graph
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';

@NgModule({
  declarations: [
    ForecastPage,
  ],
  imports: [
    IonicPageModule.forChild(ForecastPage),
    ChartModule.forRoot(highcharts), //Register the ChartModule from HighCharts
  ],
})
export class ForecastPageModule {}
