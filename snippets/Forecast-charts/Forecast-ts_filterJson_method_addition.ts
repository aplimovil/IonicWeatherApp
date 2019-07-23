export class ForecastPage {

  /******************************************** Add this code  ***************************************/

  chartValue: {}; //Holds the data for Highcharts graphic

  /******************************************** Add this code  ***************************************/


  /******************************************** Add this code  ***************************************/

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

  /******************************************** Add this code  ***************************************/

}