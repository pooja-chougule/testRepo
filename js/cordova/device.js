/*
    Coder: Rutuja Ruke
    Date: 24/03/2018
    Purpose:Device Plugin
    URL: https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html
    Plugin add: cordova plugin add cordova-plugin-device
    Plugin remove: cordova plugin rm cordova-plugin-device
    Version no.: 0.0.1
    Plugin support platform:Android,Ios*/
console.log("device.js included");
var getDeviceInfo = function(strCalledFrom) {

    try {
         //Plugin not installed then alert will fire
        if (typeof device == "undefined") {
            alert("Device Plugin not installed");
            return false;
        }
        alert("platform: "+device.platform);
        alert("device uuid:"+device.uuid);
        alert("version: "+device.version);
        alert("manufacturer: "+device.manufacturer);
         console.log(device.uuid); //unique id - Ex. 8eb31071-73e8-42c5-abc8-3dd1cda99b31
        console.log(device.platform); //Platform - Ex. Andriod 
        console.log(device.version); //version of OS - Ex. 5.1
        console.log(window.device.name); // device name-RUTU
        console.log(device.manufacturer); //Manufacturer -OPPO
    } catch (e) {
        console.log("Device issue");
        console.log("Error Occured: device.js => " + "getDeviceInfo" + "and called from" + strCalledFrom);
        console.log(e);
    }
}