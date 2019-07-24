import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';
import { Geolocation } from '@ionic-native/geolocation'; //Adds support for native geolocation

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
  private geolocation; //Holds a geolocation object for geopositioning purposes
  isProgressVisible: boolean; //Flag to control the status of the progress pop-up window

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, appConstants:
    AppConstantsProvider, WeatherApi: WeatherApiProvider, geolocation: Geolocation, public loadingCtrl: LoadingController) {
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
    this.geolocation = geolocation;
  }

  //Gets the current weather conditions from service for a particular location
  getWeather(formData: any) {
    //If progress pop-up is not visible, it shows it before starting the network operations
    if (!this.isProgressVisible) this.showProgressInfo();
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
    this.isProgressVisible = false; //Updates the isProgressVisible flag because network operations are finished
  }

  //Gets weather conditions for the current location gotten by geolocation 
  getLocalWeather(formData: any) {
    //Shows the progress pop-up window before starting the network operations
    this.showProgressInfo();
    //getCurrentPosition() gets the current location from phone GPS using the geolocation object
    //from cordova plugin 
    this.geolocation.getCurrentPosition().then(pos => {
      //Uses the getLocation method from WeatherAPIProvider to get a location from reverse geocoding
      //TomTom service according to API specification; the latitude and longitude are available in the coords property
      this.Weather.getLocation(this.appConstants.getReverseGeocodingAPIURL() + pos.coords.latitude + ',' + pos.coords.longitude + '.json?key=' + this.appConstants.getGeocodingAPIKey()).
        subscribe((data: any) => {
          //Parses the JSON response to get the name of the city, which is available in the municipality field
          //of the address object
          var currentLocation = data.addresses[0].address.municipality;
          //Sets the currentLocation value in the textfield of the Form
          this.weatherForm.controls['location'].setValue(currentLocation);
          //Prints the City value in the console for validation purposes
          console.log('City: ' + formData.value.location);
          //Calls getWeather method to get the current weather conditions for current location
          this.getWeather(formData);
        });
    });
  }

  //Shows a progress pop-up window as long as network operations (services consumption) are in progress
  showProgressInfo() {
    //Creates a pop-up from Ionic Loading Controller module
    let loader = this.loadingCtrl.create({
      content: "Loading weather data...", //Sets a message for the pop-up
      duration: 3000 // Sets a fixed duration for pop-up display
    });
    loader.present(); //Shows the pop-up
    this.isProgressVisible = true; //Updates the isProgressVisible flag
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WeatherPage');
  }

}
