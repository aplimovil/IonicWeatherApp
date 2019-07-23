import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';


/**
 * Generated class for the ForecastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forecast',
  templateUrl: 'forecast.html',
})
export class ForecastPage {

  forecastForm: FormGroup; //Connects with the forecastForm in the template
  private appConstants: any; //Holds an AppConstantsProvider object
  private Weather: any; //Holds a WeatherApiProvider object for service connection
  private geometry: any; //Holds the latitude and longitude coordinates
  private minWeather: number[][]; //Holds the min temperatures data for weather forecast
  private maxWeather: number[][]; //Holds the max temperatures data for weather forecast
  private weatherTime: any; //Holds time data for weather forecast
  weatherResult: boolean; //Flag to control the weather conditions request to service
  summaryIcon: string; //Holds the icon path for the weather condictions recovered from service
  chartValue: {}; //Holds the data for Highcharts graphic


  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, appConstants:
    AppConstantsProvider, WeatherApi: WeatherApiProvider) {
    /* Defines the validation rules for location field in the template: the field must be: required,
    a string without numbers, with minimun length of 3 characters and max length of 100 characters*/
    this.forecastForm = fb.group({
      'location': ['', Validators.compose([Validators.required, Validators.pattern
        ('[a-zA-Z, ]*'), Validators.minLength(3), Validators.maxLength(100)])],
      'forecastType': 'daily'
    });
    //Variables setup
    this.appConstants = appConstants;
    this.Weather = WeatherApi;
    this.geometry = { "longitude": "", "latitude": "" };
    this.minWeather = new Array();
    this.maxWeather = new Array();
    this.weatherTime = new Array();
    this.weatherResult = false;
    this.summaryIcon = "";
  }

  /*Filters the JSON retrieved from the forecast API for the chart display. 
  JSON filtration retrieves the date/hour details and the temperature details */
  filterJson(json, forecastType) {
    this.minWeather = new Array(); //Init the minWeather as an array to hold forecast daily or hourly values
    this.maxWeather = new Array(); //Init the maxWeather as an array to hold forecast daily or hourly values 
    this.weatherTime = new Array(); //Init the weatherTime as an array to hold forecast date or hour values 
    //Traverse the JSON input
    for (var i = 0; i < json.length; i++) {
      //Defines an array to hold months of the year abbreviations
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      /*DarkSky API provides the time in UNIX time (seconds from midnight of 1970), so it is converted to
      miliseconds to init a Date object*/
      var b: Date = new Date(json[i].time * 1000);
      // If user selects daily weather forecast ...
      if (forecastType == "daily") {
        //Pushes the date to the array using the month abbreviation and the year
        this.weatherTime.push(b.getDate() + " " + months[b.getMonth()] + " " + b.getFullYear());
        //Pushes the max temperature data to the array
        this.maxWeather.push(json[i].temperatureMax);
        //Pushes the min temperature data to the array
        this.minWeather.push(json[i].temperatureMin);
      }
      // If user selects hourly weather forecast ...
      else {
        //Pushes the date to the array using the month abbreviation, the year and time
        this.weatherTime.push(b.getDate() + " " + months[b.getMonth()] + " " + b.getFullYear() + " - " + b.getHours() + " hours");
        //Pushes the min temperature data to the array
        this.minWeather.push(json[i].temperature);
      }
    }
  }

  //Gets the forecast data from DarkSky Weather service
  getForecast(formData: any) {
    //Uses the WeatherApiProvider to get the latitud and longitude coordinates for location
    this.Weather.getGeometry(this.appConstants.getGeocodingAPIURL() + formData.value.location + '.json?key=' + this.appConstants.getGeocodingAPIKey()).
      subscribe((data: any) => {
        this.geometry.longitude = data.results[0].position.lon;
        this.geometry.latitude = data.results[0].position.lat;
        //Gets the current weather conditions using the coordinates translated from the location set by the user
        this.Weather.getCurrentWeather(this.geometry.longitude, this.geometry.latitude).
          subscribe((weatherData: any) => {
            //Connection to service was successful
            this.weatherResult = true;
            // If user selects daily weather forecast ...
            if (formData.value.forecastType == "daily") {
              /*Gets the daily data forecast information from the specific JSON object and filter them
              using the filterJSON method*/
              this.filterJson(weatherData.daily.data, formData.value.forecastType);
              //Setup the chart graph using Highcharts API
              this.chartValue = {
                title: { text: 'Weather Forecast' }, //Graph title
                chart: { type: 'column' }, //Graph type (in this case, bar graph)
                xAxis: {
                  //X axis data source, in this case weatherTime array which holds the date data 
                  categories: this.weatherTime
                },
                series: [
                  //Y axis data source, in this case columns with minWeather and maxWeather data for max and min
                  //temperatures 
                  { name: 'Min Temp', data: this.minWeather },
                  { name: 'Max Temp', data: this.maxWeather }
                ]
              };
            }
            // If user selects hourly weather forecast ...
            else {
              /*Gets the hourly data forecast information from the specific JSON object and filter them
              using the filterJSON method*/
              this.filterJson(weatherData.hourly.data, formData.value.forecastType);
              //Setup the chart graph using Highcharts API
              this.chartValue = {
                title: { text: 'Weather Forecast' }, //Graph title
                chart: { type: 'column' }, //Graph type (in this case, bar graph)
                xAxis: {
                  //X axis data source, in this case weatherTime array which holds the date and time data 
                  categories: this.weatherTime
                },
                series: [
                  //Y axis data source, in this case a column with minWeather min temperatures 
                  { name: 'Min Temp', data: this.minWeather },
                ]
              };
            }
          });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForecastPage');
  }

}
