"use strict";
/*
    Coder: POCH
    File: data_sample.js
    Lines: 180
    Date: 11-1-2018
    Purpose:Generates sample server data containing room information and user information. 
    file linked: template.html
    List of functions:
    1.genRoomSample(strCalledFrom)=>returns jstring that contains all data of rooms and users in json string format
    
*/
let genRoomSample = function(strCalledFrom) {
  try {
    /*
    Generates sample server data containing room information and user information.
    */
    let result = {};
    result.site_id = 786;
    result.site_name = "#Tubely#";
    result.room_count = 9;
    result.default_room_id = 2;
    result.rooms = {};
    result.users = {};
    result.current_user = {};
    result.current_user.user_id = 2;
    result.users.user_count = 5;
    result.rooms[0] = {
      "room_name": '#ESPANOL#',
      "room_id": 1,
      "room_desc": '#All Espanol people are welcome here# '
    };
    result.rooms[1] = {
      "room_name": '#HINDI#',
      "room_id": 2,
      "room_desc": '#All Hindi people are welcome here# '
    };
    result.rooms[2] = {
      "room_name": '#INDONESIAN#',
      "room_id": 3,
      "room_desc": '#All Indonesian people are welcome here# '
    };
    result.rooms[3] = {
      "room_name": '#MALAYSIAN#',
      "room_id": 4,
      "room_desc": '#All Malasian people  are welcome here# '
    };
    result.rooms[4] = {
      "room_name": '#PINOY#',
      "room_id": 5,
      "room_desc": '#All people are welcome here#  '
    };
    result.rooms[5] = {
      "room_name": '#TAMIL#',
      "room_id": 6,
      " room_desc": '#All Tamil people  are welcome here# '
    };
    result.rooms[6] = {
      "room_name": '#Tubely Chat#',
      "room_id": 7,
      " room_desc": ' #This is Lobby #'
    };
    result.rooms[7] = {
      "room_name": '#UK#',
      "room_id": 8,
      "room_desc": ' #Only  people of UK can come here# '
    };
    result.rooms[8] = {
      "room_name": '#USA#',
      "room_id": 9,
      "room_desc": ' #Only  people of USA can come here# '
    };
    result.rooms[9] = {
      "room_name": '#INDIA#',
      "room_id": 10,
      "room_desc": ' #All are welcome here# '
    };
    result.users[0] = {
      "user_id": 1,
      "user_name": "rutuja",
      "gender": '#Female#',
      "age": 27,
      "city": ' #mumbai#',
      "state": '#MH#',
      "country": '#IN#',
      "pic": config.image_location + 'user_images/rutu.jpg',
      "room_id": '9',
      "money": 0,
      "invisible": 0,
      "audio": true,
      "video": true,
      "videoAvailable": false,
      "audioAvailable": false
    };
    result.users[1] = {
      "user_id": 2,
      "user_name": "pooja",
      "gender": '#Female#',
      "age": 23,
      "city": ' #Bhimarayanagudi# ',
      "state": '#MH#',
      "country": "#The Democratic People's Republic of Korea#",
      "pic": config.image_location + 'user_images/pooja.jpg',
      "room_id": 9,
      "money": 0,
      "invisible": 0,
      "audio": true,
      "video": true,
      "videoAvailable": false,
      "audioAvailable": false
    };
    result.users[2] = {
      "user_id": 3,
      "user_name": "nana",
      "gender": '#male#',
      "age": 66,
      "city": '  #mumbai#',
      "state": '#MH#',
      "country": '#IN#',
      "pic": config.image_location + 'user_images/nana.jpg',
      "room_id": 9,
      "money": 0,
      "invisible": 0,
      "audio": true,
      "video": true,
      "videoAvailable": false,
      "audioAvailable": false
    };
    result.users[3] = {
      "user_id": 4,
      "user_name": "raj",
      "gender": '#male#',
      "age": 49,
      "city": ' #mumbai#',
      "state": '#MH#',
      "country": '#IN#',
      "pic": config.image_location + 'user_images/raj.jpg',
      "room_id": 9,
      "money": 0,
      "invisible": 0,
      "audio": true,
      "video": true,
      "videoAvailable": false,
      "audioAvailable": false
    };
    result.users[4] = {
      "user_id": 5,
      "user_name": "devendra",
      "gender": '#male#',
      "age": 47,
      "city": ' #mumbai#',
      "state": '#MH#',
      "country": '#IN#',
      "pic": config.image_location + 'user_images/devendra.jpg',
      "room_id": 9,
      "money": 0,
      "invisible": 0,
      "audio": true,
      "video": true,
      "videoAvailable": false,
      "audioAvailable": false
    };
    result.users[5] = {
      "user_id": 6,
      "user_name": "rahul",
      "gender": '#male#',
      "age": 47,
      "city": '#mumbai#',
      "state": '#MH#',
      "country": '#IN#',
      "pic": config.image_location + 'user_images/rahul.jpg',
      "room_id": 2,
      "money": 0,
      "invisible": 0,
      "audio": true,
      "video": true,
      "videoAvailable": false,
      "audioAvailable": false
    };
    for (let i = 0; i < result.users.user_count; i++) 
    {
      result.users[i].old_room_id = 2;
    }
    let jstring = JSON.stringify(result); //to convert result object to json string
    return jstring;
  } catch (e) {
    console.log("Error Occured: data_sample.js => " + "genRoomSample" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
console.log("data_sample.js loaded");