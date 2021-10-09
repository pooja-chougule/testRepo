"use strict";
/*
    Coder: POCH
    File: mobile_global.js
    Lines: 34
    Date: 24-3-2018
    Purpose: to dfine global variables for mobile ui,it sets base_location
    file linked: mobile.js, template.html ,tubely_mobile.html
    
*/
//global variables for mobile ui of tubely
let base_location;
if (location.href.indexOf("10.") > 0) {
  base_location = "//10.0.0.234/proj/tubely/";
} else {
  if (head.mobile) {
    base_location = "./";

  } else {
    base_location = "//pooja.astute.ws/proj/tubely/";

  }
}

let selected_user_id, selected_user_room_id;
let bLocal = false;
if (location.href.indexOf('ngrok') > -1) {
  bLocal = false;
} else {
  bLocal = true;
}
Element.prototype.setAttributes = function(attrs) {
  //lets you set multiple attributes for elements
  for (let idx in attrs) {
    if ((idx == 'styles' || idx == 'style') && typeof attrs[idx] == 'object') {
      for (let prop in attrs[idx]) {
        this.style[prop] = attrs[idx][prop]
      }
    } else if (idx == 'html') {
      this.innerHTML = attrs[idx]
    } else {
      this.setAttribute(idx, attrs[idx]);
    }
  }
};