"use strict";
/*
    Coder: POCH
    File: bot.js
    Lines: 30
    Date: 2-4-2018
    Purpose:to generate bot response
    file linked:
    List of functions:
    1.getBotResponse(message, strCalledFrom)=> to generate bot response
    
    */
let getBotResponse = function(message, strCalledFrom) {
  // to generate bot response
  try {
    if (message === "") {
      return false;
    }
    $.ajax({
      url: 'https://api.dialogflow.com/v1/query?v=20150910&lang=en&sessionId=1&query=' + message,
      success: function(json) {
        let strBotResponse = (json.result.fulfillment.speech);
        //console.log(strBotResponse);
        let random = Math.random().toString().slice(2, 6); // gives any random no.
        templates.append_chat_message(random, strBotResponse, company[site_id].users[user_id].user_id, 'bot.js =>getBotResponse ');
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        //console.log(XMLHttpRequest)
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Bearer b27aa11b66b24e7bb82c48d8d2d77f20");
      },
      type: 'GET',
      contentType: 'json',
    });
  } catch (e) {
    console.log("Error Occured: bot.js => " + "getBotResponse" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
console.log("bot.js loaded");