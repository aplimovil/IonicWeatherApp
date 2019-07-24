/****************************** Add this code *******************************/

import { Geolocation } from '@ionic-native/geolocation'; //Adds support for native geolocation

/****************************** Add this code *******************************/



@NgModule({
  declarations: [
    WeatherPage,
  ],
  imports: [
    IonicPageModule.forChild(WeatherPage),
  ],

  /****************************** Add this code *******************************/

  providers: [
    Geolocation //Registers the geolocation provider
  ]

  /****************************** Add this code *******************************/
})
export class WeatherPageModule { }