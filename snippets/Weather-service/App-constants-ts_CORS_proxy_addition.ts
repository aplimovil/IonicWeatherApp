export class AppConstantsProvider {

    constructor(public http: HttpClient) {

        /***************************************************** Update this code ***************************************************/

        this.forecastURL = 'https://cors-anywhere.herokuapp.com/' + 'https://api.darksky.net/forecast/' + this.forecastAPIKey + '/';

        /***************************************************** Update this code ***************************************************/
    }

}