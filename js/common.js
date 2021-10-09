"use strict";
/*
    Coder: POCH
    File: common.js
    Lines: 61
    Date: 8-1-2018
    Purpose:ALL REUSABLE FUNCTIONS SHOULD BE HERE.. 
    file linked: template.html
    List of functions:
    1.getParameterByName(name, url,strCalledFrom)=>It takes querystring and returns values
    2.Element.prototype.setAttributes(attrs)=>lets you set multiple attributes for elements
    3. get_time_difference(start,end) => gets time difference between two dates in hours and minutes
    4. pad(num, size) => adds leading zeros to numbers
*/
let common = {};
let $ = jQuery.noConflict();
common.pad = function(num, size) {
  // adds leading zeros to numbers
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}
common.get_time_difference = function(start, end) {
  //gets difference in hours and minutes between two dates          
  start = new Date(start);
  end = new Date(end);
  let diff = end.getTime() - start.getTime();
  let time_difference = new Object();
  time_difference.hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= time_difference.hours * 1000 * 60 * 60;
  if (time_difference.hours < 10) time_difference.hours = "0" + time_difference.hours;
  time_difference.minutes = Math.floor(diff / 1000 / 60);
  diff -= time_difference.minutes * 1000 * 60;
  if (time_difference.minutes < 10) time_difference.minutes = "0" + time_difference.minutes;
  return time_difference;
}
common.getParameterByName = function(name, url, strCalledFrom) {
  try {
    //for gettting parameters from Querystring
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  } catch (e) {
    console.log("Error Occured: common.js => " + "common.getParameterByName" + " and called from " + strCalledFrom);
    console.log(e);
  }
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
//for IE console.log errors
let alertFallback = true;
if (typeof console === "undefined" || typeof console.log === "undefined") {
  console = {};
  if (alertFallback) {
    console.log = function(msg) {
      alert(msg);
    };
  } else {
    console.log = function() {};
  }
}
console.log("common.js loaded");