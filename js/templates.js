"use strict";
/*
    Coder: POCH
    File: load_templates.js
    Lines: 68
    Date: 04-1-2018
    Purpose:It loads all html files in template.html. 
    file linked: template.html
    List of functions used:
    1.templates.append_chat_message(msg_id, strText, userId, strCalledFrom)=>to append chat messages in chat window
    2.templates.append_conv_message(strConversationID, msg_id, strText, userId, strCalledFrom)=>append conversation message in messaging window
*/
let templates = {};
let template_conversation_list_item = "";
let arrTemplates = [];
let chat_message_template = "";


templates.append_chat_message = function(msg_id, strText, userId, strCalledFrom) {
  //to append chat messages in chat window
  try {
    let user_pic = company[site_id].users[userId].pic;
    let msgbox = $(objGlobal.chatHistoryMsgsBox).find(" #dvchatHistory_msgs_box");
    let msgdiv = document.createElement("div");
    msgdiv.id = "conversation_" + msg_id;
    msgdiv.className = "msgContainer";
    $(msgbox).append(msgdiv);
    let chatMessageBox=$(msgbox).find("#conversation_" + msg_id);
    if (chat_message_template == "") {
      $.when($(chatMessageBox).html(arrTemplateContent["chatMessageTemplate"])).then(function() {
        chat_message_template = $(chatMessageBox).html();
        $(chatMessageBox).find(" #user_pic").attr("src", user_pic);
        $(chatMessageBox).find(" #msg").html(strText);
        $(msgbox).animate({
          scrollTop: $(msgbox).prop("scrollHeight")
        }, 100);
      });
    } else {
      $(chatMessageBox).html(chat_message_template);
      $(chatMessageBox).find(" #user_pic").attr("src", user_pic);
      $(chatMessageBox).find(" #msg").html(strText);
      $(msgbox).animate({
        scrollTop: $(msgbox).prop("scrollHeight")
      }, 100);
    }
    if (userId != current_user_id) {
      let userPic=$(chatMessageBox).find(" #user_pic");
      $(userPic).hammer().on("tap", function(event) {
        profile.setProfileInfo(company[site_id].users[userId], 'templates.js=>userPic');
      });
    }
  } catch (e) {
    console.log("Error Occured: templates.js => " + "templates.append_chat_message" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
templates.append_conv_message = function(strConversationID, msg_id, strText, userId, strCalledFrom) {
  // append conversation message in messaging window
  try {
    let user_pic = contacts[userId].pic;
    
    let convMsgdiv = document.createElement("div");
//     convMsgdiv.id = "conversation_msg_" + msg_id;
//     convMsgdiv.class="userMsgBox";
    convMsgdiv.setAttributes({
      "id":"conversation_msg_" + msg_id,
      "class":"userMsgBox"
    });
    
    let messageBoxPath=$( objGlobal.conversationWindow).find(" #dvConversation_" + strConversationID);
    let messageContentBoxPath=$(messageBoxPath).find("#dvMessage_content");
    console.log("messageContentBox: "+messageContentBoxPath);
    $(messageContentBoxPath).append(convMsgdiv);
    let convMessageBox=$(messageContentBoxPath).find("#conversation_msg_" + msg_id);
    console.log("convMessageBox: "+convMessageBox);
//       $.when($(convMessageBox).html(arrTemplateContent["chatMessageTemplate"])).then(function() {
              $.when($(convMessageBox).html(arrTemplateContent["user_msg_template"])).then(function() {

        
//       $(convMessageBox).find(" #user_pic").attr("src", user_pic);
      $(convMessageBox).find(" #msg").html(strText);
      $(messageContentBoxPath).animate({
        scrollTop: $(messageContentBoxPath).prop("scrollHeight")
      }, 100);
    });
  } catch (e) {
    console.log("Error Occured: templates.js => " + " templates.append_conv_message " + " and called from " + strCalledFrom);
    console.log(e);
  }
}