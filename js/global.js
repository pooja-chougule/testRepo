"use strict";
/*
    Coder:POCH
    File: global.js
    Lines: 32
    Date: 23-2-2018
    Purpose: It defines objects and variables that are global
    file linked: template.html
    List of functions:
    1.connection_defaults(data, strCalledFrom)=>server sends us list of users, rooms and other configuration variables
*/
//global variables
let user, room, server_response,
  site_info, site_id, site_name, room_count, current_user_id,
  company, default_room_id,
  user_count, docked_user_id;
user = {};
room = {};
company = {};
let connection_defaults = function(data, strCalledFrom) {
  //this is where server sends us list of users, rooms and other configuration variables
  server_response = genRoomSample("global.js"); //for testing purpose
  site_info = JSON.parse(server_response); //to convert jsonstring to object
  site_id = site_info.site_id;
  objGlobal.site_name = site_info.site_name;
  room_count = site_info.room_count;
  user_count = site_info.users.user_count;
  current_user_id = site_info.current_user.user_id;
  default_room_id = site_info.default_room_id;
}
//todo - get data from server
connection_defaults("data", 'global.js'); //It calls this function to get all server_side data which is for now temporary json data
company[site_id] = {};
company[site_id].room_count = 0;
company[site_id].rooms = {};
company[site_id].user_count = 0;
company[site_id].users = {};
company[site_id].rooms.users = {};
company[site_id].dockcount = 0;
company[site_id].docks = Array();
console.log("global.js loaded");