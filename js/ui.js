"use strict";
/*
    Coder: POCH
     File: ui.js
     Lines: 67
    Date: 21-2-2018
    Purpose:functions related to ui. 
    file linked: template.html
    List of functions used:
    1.sendChatMessage(strCalledFrom)=> append msg from text-box
    2.chat_enter_pressed(strCalledFrom)=> sends message by pressing enter key
    3.sendConversationMsg(strConversationID, strCalledFrom)=>append conversation msg in conversation window
    4.chat_enter_pressed_messageTab(strConversationID, strCalledFrom)=>it sends message by pressing enter key under message tab
    
*/
let sendChatMessage = function(strCalledFrom) {
  //to append msg from text-box
  try {
    let msg = $("#txtChat").val();
    if (msg == "") {
      return false;
    }
    let random = Math.random().toString().slice(2, 6); // gives any random no.
    templates.append_chat_message(random, msg, company[site_id].users[current_user_id].user_id, 'ui.js => sendChatMessage');
    $("#txtChat").val(""); // make texbox empty
    $("#txtChat").focus(); //to get cursor in text box
    getBotResponse(msg, 'ui.js=>sendChatMessage'); //to generate bot response
  } catch (e) {
    console.log("Error Occured: ui.js => " + "sendChatMessage" + " and called from " + strCalledFrom);
  }
}
let chat_enter_pressed = function(strCalledFrom) {
  // it sends message by pressing enter key
  try {
    //document.getElementById("txtChat").addEventListener("keydown", function(e) {

    $('#txtChat').bind('keydown', function(e) {
      if (!e) {
        let e = window.event;
      }
      //e.preventDefault(); // sometimes useful
      // Enter is pressed
      if (e.keyCode == 13) {
        sendChatMessage('ui.js=>chat_enter_pressed');
      }
    });
//     }, false);
  } catch (e) {
    console.log("Error Occured: ui.js => " + "chat_enter_pressed" + " and called from " + strCalledFrom);
    console.log("Error Occured: ui.js => " + "chat_enter_pressed");
    console.log(e);
  }
}
let sendConversationMsg = function(strConversationID, strCalledFrom) {
  //append conversation msg in conversation window
  try {
    let convMsg = $("#dvConversation_" + strConversationID + " #txtConv_message").val();
    if (convMsg == "") {
      return false;
    }
    let random = Math.random().toString().slice(2, 6); // gives any random no. 
    templates.append_conv_message(strConversationID, random, convMsg, contacts[current_user_id].user_id, 'ui.js => sendConversationMsg');
    $("#dvConversation_" + strConversationID + " #txtConv_message").val(""); // make texbox empty
    $("#dvConversation_" + strConversationID + " #txtConv_message").focus(); //to set focus in text box
  } catch (e) {
    console.log("Error Occured: ui.js => " + "sendConversationMsg" + " and called from " + strCalledFrom);
  }
}
let chat_enter_pressed_messageTab = function(strConversationID, strCalledFrom) {
  // it sends message by pressing enter key under message tab
  try {
    $("#dvConversation_" + strConversationID + " #txtConv_message").keydown(function(e) {
      if (!e) {
        let e = window.event;
      }
      // Enter is pressed
      if (e.keyCode == 13) {
        sendConversationMsg(strConversationID, 'ui.js=>chat_enter_pressed_messageTab');
      }
    });
  } catch (e) {
    console.log("Error Occured: ui.js => " + "chat_enter_pressed_messageTab" + " and called from " + strCalledFrom);
    console.log(e);
  }
}