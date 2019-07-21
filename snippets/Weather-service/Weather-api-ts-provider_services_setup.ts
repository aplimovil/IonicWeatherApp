import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/******************************* Add this code ******************************/

import { AppConstantsProvider } from '../app-constants/app-constants';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/******************************* Add this code ******************************/

/*
  Generated class for the WeatherApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherApiProvider {

  /******************************************** Add this code *******************************************/

  weatherURL: string; //Holds Dark Sky Weather API URL locally 
  private constantVar: any; //Holds an AppConstantsProvider object

  /******************************************** Add this code *******************************************/


  
  /******************************************** Update this code *******************************************/

  /*Handles a HttpClient connection and AppConstantsProvider object parameters to get Weather information
  from Dark Sky API service*/
  constructor(public http: HttpClient, constantVar: AppConstantsProvider) {
    this.constantVar = constantVar; //Setup the local constantVar variable
    this.weatherURL = constantVar.getForecastURL(); //Setup the local weatherURL variable
  }

  /******************************************** Update this code *******************************************/


  /******************************************** Add this code *******************************************/

  /*Connects to Dark Sky Weather service to get weather information from latitud and longitude parameters
  Refers to Dark Sky service for more information: https://darksky.net/dev*/
  getCurrentWeather(longitude: any, latitude: any) {
    //Connnect to service using URL and latitud, longitude parameters according to API specification 
    return this.http.get(this.weatherURL + latitude + "," + longitude)
  }

  /*Connects to TomTom geocoding service to get latitud and longitude coordinates from a specific location
  parameter. Refer to TomTom geocoding service for more information: 
  https://developer.tomtom.com/search-api/search-api-documentation-geocoding/geocode*/
  getGeometry(geocodingAPIURL: any) {
    //Connnect to service using URL and location parameter according to API specification
    return this.http.get(geocodingAPIURL)
  }

  /******************************************** Add this code *******************************************/

}
