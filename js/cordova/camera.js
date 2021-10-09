/*
    Coder: Rutuja Ruke
    Date: 26/03/2018
    Purpose:Device Plugin
    URL:https://www.tutorialspoint.com/cordova/cordova_camera.htm
    Plugin add: cordova plugin add cordova-plugin-camera
    Plugin remove:cordova plugin rm cordova-plugin-camera
    Version no.: 4.0.2 
    Plugin support platform:Android,Ios*/

console.log("camera.js included");
// var startCamera = function(strCalledFrom) {
//     try {
//          //Plugin not installed then alert will fire
//         if (typeof camera == "undefined") {
//             alert("Camera Plugin not installed");
//             return false;
//         }
         
//          document.getElementById("cameraTakePicture").addEventListener("click", cameraTakePicture);

//         function cameraTakePicture() {
//             navigator.camera.getPicture(onSuccess, onFail, {
//                 quality: 50,
//                 destinationType: Camera.DestinationType.DATA_URL
//             });

//             function onSuccess(imageData) {
//                 var image = document.getElementById('myImage');
//                 image.src = "data:image/jpeg;base64," + imageData;
//             }

//             function onFail(message) {
//                 alert('Failed because: ' + message);
//             }
//         }
//     } catch (e) {
//         console.log("Camera issue");
//         console.log("Error Occured: camera.js => " + "startCamera" + "and called from" + strCalledFrom);
//         console.log(e);
//     }
// }
function cameraTakePicture() { 
   navigator.camera.getPicture(onSuccess, onFail, {  
      quality: 50, 
      destinationType: Camera.DestinationType.DATA_URL 
   });  
   
   function onSuccess(imageData) { 
      var image = document.getElementById('myImage'); 
      image.src = "data:image/jpeg;base64," + imageData; 
   }  
   
   function onFail(message) { 
      alert('Failed because: ' + message); 
   } 
}
// function cameraGetPicture() {
//    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
//       destinationType: Camera.DestinationType.DATA_URL,
//       sourceType: Camera.PictureSourceType.PHOTOLIBRARY
//    });

//    function onSuccess(imageURL) {
//       var image = document.getElementById('myImage');
//       image.src = imageURL;
//    }

//    function onFail(message) {
//       alert('Failed because: ' + message);
//    }

// }