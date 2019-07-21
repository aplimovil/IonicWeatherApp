import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';


/**
 * Generated class for the WeatherPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html',
})
export class WeatherPage {

  weatherForm: FormGroup; //Connects with the weatherForm in the template
  private appConstants: any; //Holds an AppConstantsProvider object
  private Weather: any; //Holds a WeatherApiProvider object for service connection
  private geometry: any; //Holds the latitude and longitude coordinates
  private currentWeather: any; //Holds the current weather conditions information
  weatherResult: boolean; //Flag to control the weather conditions request to service
  summaryIcon: string; //Holds the icon path for the weather condictions recovered from service

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, appConstants:
    AppConstantsProvider, WeatherApi: WeatherApiProvider) {
    /* Defines the validation rules for location field in the template: the field must be: required,
    a string without numbers, with minimun length of 3 characters and max length of 100 characters*/
    this.weatherForm = fb.group({
      'location': ['', Validators.compose([Validators.required, Validators.pattern
        ('[a-zA-Z, ]*'), Validators.minLength(3), Validators.maxLength(100)])]
    });
    //Variables setup
    this.appConstants = appConstants;
    this.Weather = WeatherApi;
    this.geometry = { "longitude": "", "latitude": "" };
    this.currentWeather = {};
    this.weatherResult = false;
    this.summaryIcon = "";

  }

  //Gets the current weather conditions from service for a particular location
  getWeather(formData: any) {
    //Uses the WeatherApiProvider to get the latitud and longitude coordinates for location
    this.Weather.getGeometry(this.appConstants.getGeocodingAPIURL() + formData.value.location + '.json?key=' + this.appConstants.getGeocodingAPIKey()).
    subscribe((data: any) => {
        this.geometry.longitude = data.results[0].position.lon;
        this.geometry.latitude = data.results[0].position.lat;
        //Prints the coordinates recovered from service in the console 
        console.log('Geometrylat: ' + this.geometry.longitude + ', Geometrylong: ' + this.geometry.latitude);
        //Gets the current weather conditions using the coordinates translated from the location set by the user
        this.Weather.getCurrentWeather(this.geometry.longitude, this.geometry.latitude).
          subscribe((weatherData: any) => {
            //Gets the current conditions from the specific JSON object
            this.currentWeather = weatherData.currently;
            //Connection to service was successful
            this.weatherResult = true;
            //Sets the path for the icon to show according to weather conditions 
            if (this.currentWeather.summary.toLowerCase().indexOf("cloudy") > 0)
              this.summaryIcon = "cloudy";
            else if (this.currentWeather.summary.toLowerCase().indexOf("rainy") > 0)
              this.summaryIcon = "rainy";
            else if (this.currentWeather.summary.toLowerCase().indexOf("sunny") > 0)
              this.summaryIcon = "sunny";
            else if (this.currentWeather.summary.toLowerCase().indexOf("thunderstorm") > 0)
              this.summaryIcon = "thunderstorm";
          });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

}
