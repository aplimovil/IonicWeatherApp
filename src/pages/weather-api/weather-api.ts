import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the WeatherApiPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather-api',
  templateUrl: 'weather-api.html'
})
export class WeatherApiPage {

  weatherRoot = 'WeatherPage'
  forecastRoot = 'ForecastPage'


  constructor(public navCtrl: NavController) {}

}
