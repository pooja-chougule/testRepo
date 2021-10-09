/*
  Coder: Rutuja Ruke
  Date: 24/03/2018
  Purpose:Lat/Lon Plugin
  URL: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/index.html
  Plugin Add: cordova plugin add cordova-plugin-geolocation
  Plugin remove: cordova plugin rm cordova-plugin-geolocation
  Version no: 2.4.3 
  Plugin support platform: Android, Ios
*/

var getGpsInfo = function(strCalledFrom) {
    try {
        if (typeof navigator.geolocation == "undefined") {
            alert("Gps Plugin not installed");
            return false;
        }
        //Get Latitude and Longitude info 
        var getgeoSuccess = function(position) {
            console.log(position);
            
            //console.log('Latitude: ' + position.coords.latitude + '\n' + 'Longitude: ' + position.coords.longitude + '\n' + 'Altitude: ' + position.coords.altitude + '\n' + 'Accuracy: ' + position.coords.accuracy + '\n' + 'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' + 'Heading: ' + position.coords.heading + '\n' + 'Speed: ' + position.coords.speed + '\n' + 'Timestamp: ' + position.timestamp + '\n');
            
        }
        navigator.geolocation.getCurrentPosition(getgeoSuccess, onGeoError);
    } catch (e) {
        alert("Location issue");
        console.log("Error Occured: geo.js => " + "getGpsInfo" + "and called from" + strCalledFrom);
    }
}