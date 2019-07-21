export class WeatherPage {

    /****************************************************** Add this code **********************************************/

    //Gets the current weather conditions from service for a particular location
    getWeather(formData: any) {
        //Uses the WeatherApiProvider to get the latitud and longitude coordinates for location set by the user
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

    /****************************************************** Add this code **********************************************/

}