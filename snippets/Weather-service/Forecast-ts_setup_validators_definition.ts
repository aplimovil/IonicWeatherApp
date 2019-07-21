import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/************************************ Add this code ************************************/

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstantsProvider } from '../../providers/app-constants/app-constants';
import { WeatherApiProvider } from '../../providers/weather-api/weather-api';

/************************************ Add this code ************************************/



export class ForecastPage {

    /************************************ Add this code ************************************/

    forecastForm: FormGroup; //Connects with the forecastForm in the template
    private appConstants: any; //Holds an AppConstantsProvider object
    private Weather: any; //Holds a WeatherApiProvider object for service connection
    private geometry: any; //Holds the latitude and longitude coordinates
    private minWeather: number[][]; //Holds the min temperatures data for weather forecast
    private maxWeather: number[][]; //Holds the max temperatures data for weather forecast
    private weatherTime: any; //Holds time data for weather forecast
    weatherResult: boolean; //Flag to control the weather conditions request to service
    summaryIcon: string; //Holds the icon path for the weather condictions recovered from service

    /************************************ Add this code ************************************/



    /****************************************** Update this code *************************************************/

    constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, appConstants:
        AppConstantsProvider, WeatherApi: WeatherApiProvider) {
        /* Defines the validation rules for location field in the template: the field must be: required,
        a string without numbers, with minimun length of 3 characters and max length of 100 characters*/
        this.forecastForm = fb.group({
            'location': ['', Validators.compose([Validators.required, Validators.pattern
                ('[a-zA-Z, ]*'), Validators.minLength(3), Validators.maxLength(100)])],
            'forecastType': 'daily'
        });
        //Variables setup
        this.appConstants = appConstants;
        this.Weather = WeatherApi;
        this.geometry = { "longitude": "", "latitude": "" };
        this.minWeather = new Array();
        this.maxWeather = new Array();
        this.weatherTime = new Array();
        this.weatherResult = false;
        this.summaryIcon = "";
    }

    /****************************************** Update this code *************************************************/

}
