
/**************************************************** Add this code **********************************************/

import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**************************************************** Add this code **********************************************/


export class WeatherPage {

    /**************************************************** Add this code **********************************************/

    isProgressVisible: boolean; //Flag to control the status of the progress pop-up window

    /**************************************************** Add this code **********************************************/


    /**************************************************** Update this code **********************************************/

    constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, appConstants:
        AppConstantsProvider, WeatherApi: WeatherApiProvider, geolocation: Geolocation, public loadingCtrl: LoadingController) {

    /**************************************************** Update this code **********************************************/

    }
}