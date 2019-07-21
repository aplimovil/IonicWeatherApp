@Injectable()
export class AppConstantsProvider {

    /***************************** Update this code ****************************/

    geocodingAPIURL: string; //Holds the Geocoding API service URL
    forecastURL: string;  //Holds the Weather API service URL
    geocodingAPIKey: string; //Holds the geocoding API service Key
    forecastAPIKey: string; //Holds the Weather API service Key

    /***************************** Update this code ****************************/

    constructor(public http: HttpClient) {

        /***************************** Update this code ****************************/

        //Setup the geocoding API key
        this.geocodingAPIKey = "YOUR_API_KEY";
        //Setup the Weather API key
        this.forecastAPIKey = "YOUR_API_KEY";
        //Setup the TomTom Geocoding API URL
        this.geocodingAPIURL = "https://api.tomtom.com/search/2/geocode/";
        //Setup the Dark Sky Weather API URL; don't forget to include your KEY
        this.forecastURL = 'https://api.darksky.net/forecast/'+this.forecastAPIKey+'/';

        /***************************** Update this code ****************************/
    }


    /********************************** Add this code ******************************/

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

    /********************************** Add this code ******************************/

}