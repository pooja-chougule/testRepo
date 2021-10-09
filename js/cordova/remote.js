/*
    Coder: Rutuja Ruke
    Date: 24/03/2017
    Purpose:Push plugins/Remote Notication
    URL: https://github.com/arnesson/cordova-plugin-firebase
    Plugin add: cordova plugin add cordova-plugin-firebase@0.1.25 --save
    Plugin remove: cordova plugin rm cordova-plugin-firebase
    Version no.: "0.1.23"
    Plugin Platform support:Android and iOS
*/
console.log("remote.js included");
var remoteNotification = function(strCalledFrom) {
    try {
        if (typeof window.FirebasePlugin == "undefined") {
            alert("Push Notification Plugin not installed");
            return false;
        }
        alert("remote notification called");
       window.FirebasePlugin.onTokenRefresh(function(token) {
    // save this server-side and use it to push notifications to this device
    console.log(token);
}, function(error) {
    console.error(error);
});
    } catch (e) {
        console.log("Push issue");
        console.log("Error Occured: remote.js => " + "remoteNotification" + "and called from" + strCalledFrom);
        console.log(e);
    }
}