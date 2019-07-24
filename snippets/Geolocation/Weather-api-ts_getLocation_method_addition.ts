
export class WeatherApiProvider {

  /************************************************** Add this code **********************************************/

  /*Connects to TomTom reverse geocoding service to get a specific location from latitud and longitude coordinates 
    parameters. Refer to TomTom geocoding service for more information: 
    https://developer.tomtom.com/search-api/search-api-documentation/reverse-geocoding*/
  getLocation(reverseGeocodingAPIURL: any) {
    //Connnect to service using URL and latitud, longitude parameters according to API specification
    return this.http.get(reverseGeocodingAPIURL);
  }

  /************************************************** Add this code **********************************************/

}