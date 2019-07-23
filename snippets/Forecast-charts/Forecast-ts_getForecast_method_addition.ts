export class ForecastPage {

  /************************************************** Add this code ********************************************/

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

  /************************************************** Add this code ********************************************/

}