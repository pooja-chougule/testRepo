"use strict";
/*
    Coder: POCH
    File: test.js
    Lines: 92
    Date: 14-12-2017
    Purpose:all test functions of all .js files are get called here
    file linked: template.html
    List of functions used: 
    1.populateRooms(strCalledFrom)=>populate rooms in memory object using function roomInfo.addRoomObj()
    2.populateUsers(strCalledFrom)=>populate users 
    3.testUpdateInfo(strCalledFrom)=>It calls userInfo.updateUserDetails() and update user details
    4.sendTestMessages(strCalledFrom)=>sends test message   
    5.doTestMessages(strCalledFrom)=>It passes objMessage to messageReceived()
    6.getMessagesForUser(strCalledFrom)=>gives messages for users
    7.setConversationMessage(strCalledFrom)=>sets conversation message on receiving new message from the user
*/
let populateRooms = function(strCalledFrom) {
  // populate rooms in memory object
  for (let i = 0; i < room_count; i++) {
    roomInfo.addRoomObj(site_info.rooms[i], "test.js=>populateElements");
  }
}
let populateUsers = function(strCalledFrom) {
  //populate users 
  for (let i = 0; i < user_count; i++) {
    //console.log("adding users");
    userInfo.addUserToObj(site_info.users[i], 'test.js=>populateUsers'); //adds user to memory object
    userInfo.addUserToRoomObj(site_info.users[i], site_info.users[i].old_room_id, 'test.js=>populateUsers'); //adds user to rooms object 
    roomInfo.joinRoom(site_info.users[i].user_id, 9, 'test.js=>populateUsers');
  }
}
let sendTestMessages = function(strCalledFrom) {
  // sends test message
  for (let i = 1; i <= 50; i++) {
    templates.append_chat_message(i, 'How are you?', 4, 'test.js => sendTestMessages');
  }
}
let doTestMessages = function(strCalledFrom) {
  //It passes objMessage to messageReceived()
  try {
    for (let i = 1; i <= contacts.length - 1; i++) {
      if (i == user_id) {
        // return false;
        //dont add the user element in the list
      } else {
        //contacts[i].msgCount=0;
        contacts[i].msgCount = contacts[i].msgCount + 1;
        let objMessage = {
          "sender_id": i,
          "conversation_id": user_id + "-" + i,
          "message": "#Hello#",
          "time": "11:50",
          "msgCount": contacts[i].msgCount
        };

        messageReceived(objMessage, 'messaging.js=>doTestMessages');
      }
    }
  } catch (e) {
    console.log("Test Message issue");
    console.log("Error Occured: test.js => " + "doTestMessages" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let setConversationMessage=function(strCalledFrom){
  //sets conversation message on receiving new message from the user
  let dt = new Date();
  let time = dt.getHours() + ":" + dt.getMinutes();
  let objMessage={
         "sender_id": 4,
          "conversation_id": user_id + "-" +"4",
          "message": "testing",
          "time":time,
          "msgCount": contacts[4].msgCount+1
  }
  alert("message received");
  messageReceived(objMessage, 'messaging.js=>doTestMessages');
}
// let testUpdateInfo = function(strCalledFrom) {
//     //It calls userInfo.updateUserDetails() and update user details
//     userInfo.updateUserDetails(company[site_id].users[2], 25, "images/aishwarya.jpg", "test.js => userInfo.testUpdateInfo");
// }

let getMessagesForUser=function(strCalledFrom){
  //gives messages for user
   try {
  let arrMessages=[];
  arrMessages[0]='hi ,how are you?';
  arrMessages[1]='are you there?';
  arrMessages[2]='lets come for the party';
  arrMessages[3]='ok bye'; 
  console.log("arrMessages: "+arrMessages);
   } catch (e) {
    console.log("Error Occured: test.js => " + "getMessagesForUser" + " and called from " + strCalledFrom);
    console.log(e);
  }   
}