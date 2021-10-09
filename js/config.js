"use strict";
/*
    Coder: POCH
    File: config.js
    Lines: 19
    Date: 9-1-2018
    Purpose: It defines objects or variables that are constant
    file linked: template.html
    
*/
//global variables
let auth_token, socket_id, device_type, contacts;

let config = {};
config.socket_server = {
  'port': '8000',
  'hostname': 'www.tubely.com',
  'autoConnect': true
};
config.image_location = 'img/';
device_type = "web";
contacts = [];
objGlobal.screen_height = $(window).height();
objGlobal.screen_width = $(window).width();
objGlobal.chat_header_container_height = 30;
objGlobal.user_info_container_height = 175;
objGlobal.typing_box_container_height = 30;
objGlobal.room_heading_height = 15;
objGlobal.chat_window_header_height = 20;
let user_id = 2; // used in messaging.js
console.log("config.js loaded");