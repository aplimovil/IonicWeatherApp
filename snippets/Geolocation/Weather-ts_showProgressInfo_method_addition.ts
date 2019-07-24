
export class WeatherPage {

    /***************************************** Add this code ********************************************/

    //Shows a progress pop-up window as long as network operations (services consumption) are in progress
    showProgressInfo() {
        //Creates a pop-up from Ionic Loading Controller module
        let loader = this.loadingCtrl.create({
            content: "Loading weather data...", //Sets a message for the pop-up
            duration: 3000 // Sets a fixed duration for pop-up display
        });
        loader.present(); //Shows the pop-up
        this.isProgressVisible = true; //Updates the isProgressVisible flag
    }

    /***************************************** Add this code ********************************************/


    getLocalWeather(formData: any) {
        /*********************** Add this code (at the beginning of the method) *****************************/

        //Shows the progress pop-up window before starting the network operations
        this.showProgressInfo();

        /*********************** Add this code (at the beginning of the method) *****************************/
    }

    getWeather(formData: any) {

        /*********************** Add this code (at the beginning of the method) *****************************/

        //If progress pop-up is not visible, it shows it before starting the network operations
        if (!this.isProgressVisible) this.showProgressInfo();

        /*********************** Add this code (at the beginning of the method) *****************************/


        /******************************** Add this code (at the end of the method) *********************************/

        this.isProgressVisible = false; //Updates the isProgressVisible flag because network operations are finished
        
        /******************************** Add this code (at the end of the method) *********************************/
    }

}