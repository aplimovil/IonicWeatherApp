/************************ Add this code ****************************/

//Import HighCharts modules for painting a bar graph
import { ChartModule } from 'angular2-highcharts';
import * as highcharts from 'Highcharts';

/************************ Add this code ****************************/

@NgModule({
    declarations: [
      ForecastPage,
    ],
    imports: [
      IonicPageModule.forChild(ForecastPage),
      
      /****************************** Add this code ******************************/

      ChartModule.forRoot(highcharts), //Register the ChartModule from HighCharts

      /****************************** Add this code ******************************/
    ],
  })
  export class ForecastPageModule {}