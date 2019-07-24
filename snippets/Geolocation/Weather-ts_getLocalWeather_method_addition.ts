/*********************************************** Add this code ************************************************/

import { Geolocation } from '@ionic-native/geolocation'; //Adds support for native geolocation

/*********************************************** Add this code ************************************************/



export class WeatherPage {

  /*********************************************** Add this code ************************************************/

  private geolocation; //Holds a geolocation object for geopositioning purposes

  /*********************************************** Add this code ************************************************/



  /*********************************************** Update this code ************************************************/

  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, appConstants:
    AppConstantsProvider, WeatherApi: WeatherApiProvider, private geolocation: Geolocation) {

  /*********************************************** Update this code ************************************************/



    /*********************************************** Add this code ************************************************/

    this.geolocation = geolocation;

    /*********************************************** Add this code ************************************************/

  }


  /*********************************************** Add this code ************************************************/

  //Gets weather conditions for the current location gotten by geolocation 
  getLocalWeather(formData: any) {
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

  /*********************************************** Add this code ************************************************/

}