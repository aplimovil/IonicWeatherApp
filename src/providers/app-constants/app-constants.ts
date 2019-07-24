import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AppConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConstantsProvider {
  geocodingAPIURL: string; //Holds the Geocoding API service URL
  forecastURL: string;  //Holds the Weather API service URL
  geocodingAPIKey: string; //Holds the geocoding API service Key
  forecastAPIKey: string; //Holds the Weather API service Key


  constructor(public http: HttpClient) {
    //Setup the geocoding API key
    this.geocodingAPIKey = "YOUR_API_KEY";
    //Setup the Weather API key
    this.forecastAPIKey = "YOUR_API_KEY";
    //Setup the TomTom Geocoding API URL
    this.geocodingAPIURL = "https://api.tomtom.com/search/2/geocode/";
    //Setup the Dark Sky Weather API URL; don't forget to include your KEY
    this.forecastURL = 'https://cors-anywhere.herokuapp.com/'+'https://api.darksky.net/forecast/'+this.forecastAPIKey+'/';
  }

  //Gets the Geocoding API service URL
  getGeocodingAPIURL() {
    return this.geocodingAPIURL;
  }

  //Gets the Weather API service URL
  getForecastURL() {
    return this.forecastURL;
  }

  //Gets the Geocoding API service Key
  getGeocodingAPIKey() {
    return this.geocodingAPIKey;
  }

  //Gets the Forecast API service Key
  getForecastAPIKey() {
    return this.forecastAPIKey;
  }

}
