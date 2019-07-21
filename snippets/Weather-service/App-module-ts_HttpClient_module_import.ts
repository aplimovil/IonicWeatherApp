/********************* Add this code ************************/

import { HttpClientModule } from '@angular/common/http';

/********************* Add this code ************************/


@NgModule({
    declarations: [
      MyApp
    ],
    imports: [
      BrowserModule,

      /******************** Add this code ******************/
      HttpClientModule,
      /******************** Add this code ******************/
      
      IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
      MyApp
    ],
    providers: [
      StatusBar,
      SplashScreen,
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      AppConstantsProvider,
      WeatherApiProvider
    ]
  })
  export class AppModule { }