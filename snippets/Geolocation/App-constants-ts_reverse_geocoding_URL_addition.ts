
export class AppConstantsProvider {

    /*********************************************** Add this code ********************************************/

    geocodingReverseAPIURL: string; //Holds the reverse geocoding API service URL (from coordinates to location)

    /*********************************************** Add this code ********************************************/

    
    
    constructor(public http: HttpClient) {

        /*********************************************** Add this code ********************************************/

        //Setup the TomTom Reverse geocoding API URL
        this.geocodingReverseAPIURL = "https://api.tomtom.com/search/2/reverseGeocode/";

        /*********************************************** Add this code ********************************************/

    }

    

    /*********************************************** Add this code ********************************************/

    //Gets the Reverse geocoding API service URL
    getReverseGeocodingAPIURL() {
        return this.geocodingReverseAPIURL;
    }

    /*********************************************** Add this code ********************************************/


}