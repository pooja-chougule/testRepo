"use strict";
/*
    Coded by: RURU
              POCH
    File: messaging.js
    Lines: 205
    Date:1-3-2018
    Purpose:Messaging GUI code comes here
            It populates chat users from test_users.js from contacts[i] by loading conversation_listitem.html
            It also shows conversation messages  by clicking on any conversation listitem by showConversation()
    List of functions used :
    1.getContactInfo(strConversationID, strCalledFrom)=>It returns info of contact_id
    2.messageReceived(objConversation, strCalledFrom)=>it adds conversationListItem if it not exists and sets message of it
    3.setMessage(strConversationID, strMessage,iTime , strCalledFrom)=>Sets message-text and message-time
    4.showConversation(strConversationID, strCalledFrom)=>check if the conversation exists then bring the conversation to front else create the conversation
    5.addConversation(strConversationID, strCalledFrom, callback)=>loads  conversation_listitem.html and sets user info
    6.showConversations(strCalledFrom)=>it gets back to the dvConversationList by using z-index
    7.isConversationListItemExisting(strConversationID, strCalledFrom)=>It checks if conversation list item exists
    8.isConversationExisting(strConversationID, strCalledFrom)=>It checks if conversation exists
   
*/

let zIndex = 1;
let getContactInfo = function(strConversationID, strCalledFrom) {
  //It returns info of contact_id
  try {
    let contact_id;
    let obj = strConversationID.split("-");
    if (obj[0] == user_id) {
      contact_id = obj[1];
    } else {
      contact_id = obj[0];
    }
    return contacts[contact_id];
  } catch (e) {
    console.log("Error Occured: messaging.js => " + "getContactInfo" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let setMessage = function(strConversationID, isenderId, strMessage, iTime, iMsgCount, strCalledFrom) {
  //Sets message-text and message-time and message-count
  try {
    let conversationListelem = $(objGlobal.conversationUsersList).find("#dvConversationListItem" + strConversationID);
    $(conversationListelem).find("#spConvListItemMessage").html(strMessage);
    $(conversationListelem).find("#spConvListItemTime").html(iTime);
    $(conversationListelem).find("#spConvListItemMsgCount").html(iMsgCount);
    let senderConversationWindowId = "dvConversation_" + strConversationID;
    let currentConversationWindowId = $(objGlobal.currentConversationWindow).attr('id');
    if (currentConversationWindowId == senderConversationWindowId) {
      alert("the conversation window available");
      let randomNumber = Math.random().toString().slice(2, 6); // gives any random no. 
      templates.append_conv_message(strConversationID, randomNumber, strMessage, isenderId, 'test.js => receiveDummyMessage')
    }
  } catch (e) {
    console.log("Error Occured: messaging.js => " + "setMessage" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let addConversation = function(strConversationID, strCalledFrom, callback) {
  //loads  conversation_listitem.html and sets user info
  try {
    let contact = getContactInfo(strConversationID);
    let elemConversationListItem = document.createElement("div");
    elemConversationListItem.id = "dvConversationListItem" + strConversationID;
    elemConversationListItem.className = "conversationListItem";
    zIndex++;
    $.when($(objGlobal.conversationUsersList).prepend(elemConversationListItem)).then(function() {
      let conversationListItem = $(objGlobal.conversationUsersList).find("#dvConversationListItem" + strConversationID);
      $.when($(conversationListItem).html(arrTemplateContent["conversationListItemTemplate"])).then(function() {
        $(conversationListItem).find(" #spConvListItemUsername").html(contact.user_name); //contact.user_name
        $(conversationListItem).find(" #imgConvList").attr('src', contact.pic);
        callback();
        $(conversationListItem).hammer().on("tap", function(event) {
          showConversation(strConversationID, 'messaging.js=>addConversation');
        });
      });
    });
  } catch (e) {
    console.log("Error Occured: messaging.js => " + "addConversation" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let messageReceived = function(objConversation, strCalledFrom) {
  //  it adds conversationListItem if it not exists and sets message of it
  try {
    if (!isConversationListItemExisting(objConversation.conversation_id)) {
      //create the conversation listing
      addConversation(objConversation.conversation_id, "messaging.js=>messageReceived", function() {
        //conversation list-item was added now set the message
        setMessage(objConversation.conversation_id, objConversation.sender_id, objConversation.message, objConversation.time, objConversation.msgCount, "messaging.js=>messageReceived");
      });
    } else {
      //element already present in the list
      objGlobal.topConversationListItem = objGlobal.conversationUsersList.children().first();
      let conversationListElem = $(objGlobal.conversationUsersList).find("#dvConversationListItem" + objConversation.conversation_id);

      $.when($(conversationListElem).insertBefore($(objGlobal.topConversationListItem))).then(function() {
        objGlobal.topConversationListItem = conversationListElem;
        setMessage(objConversation.conversation_id, objConversation.sender_id, objConversation.message, objConversation.time, objConversation.msgCount, "messaging.js=>messageReceived");
      });
    }
    objGlobal.topConversationListItem = objGlobal.conversationUsersList.children().first();

  } catch (e) {
    console.log("Error Occured: messaging.js => " + "messageReceived" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let showConversation = function(strConversationID, strCalledFrom) {
  try {
    //check if the conversation exists
    //bring the conversation to front
    if (head.mobile) {
      $("#dvMainMobile_dvchat_dvHeader").hide();
    }
    $(objGlobal.conversationWindow).show();
    $(objGlobal.conversationWindow).css("z-index", zIndex); //get conversation window container above all the windows
    zIndex++;
    let conversationBox;

    if (isConversationExisting(strConversationID)) {

      $(objGlobal.conversationWindow).find(" #dvConversation_" + strConversationID).css("z-index", zIndex);

      $(objGlobal.conversationUsersList).find(" #dvConversationListItem" + selected_user_id).attr("class", " conversationListItem conversastionList_unselectedUser"); //to make prviously selected users bckground normal
      selected_user_id = strConversationID;
      $(objGlobal.conversationUsersList).find(" #dvConversationListItem" + strConversationID).attr("class", "conversationListItem conversastionList_selectedUser"); // to change background of selected user
      zIndex++;
    } else {
      //create the conversation window
      $(objGlobal.conversationUsersList).find(" #dvConversationListItem" + selected_user_id).attr("class", " conversationListItem conversastionList_unselectedUser"); //to make prviously selected users bckground normal 
      selected_user_id = strConversationID;

      $(objGlobal.conversationUsersList).find(" #dvConversationListItem" + strConversationID).attr("class", "conversationListItem conversastionList_selectedUser"); // to change background of selected user
      let elemConversation = document.createElement("div");
      elemConversation.id = "dvConversation_" + strConversationID;
      elemConversation.className = "conversationBox"
      elemConversation.style.zIndex = zIndex;

      zIndex++;
      $.when($(objGlobal.conversationWindow).append(elemConversation)).then(function() {
        conversationBox = $(objGlobal.conversationWindow).find(" #dvConversation_" + strConversationID);
        $.when($(conversationBox).html(arrTemplateContent["conversationMessageTemplate"])).then(function() {
          let msgContentHeight;
          if (head.desktop) {
            //do not set the back arrow in the conversation window's header for desktop ui
          } else {
            $(conversationBox).find(" #iBackArrow_icon").attr('src', base_location + "img/conv_msg/left-arrow.png");
          }
          $(conversationBox).find(" #dvMessage_content").height(objGlobal.msgContentHeight);
          window.onresize = function(event) {
            //to adjust messageContent height on scrolling
            objGlobal.screen_height = $(window).height();
            objGlobal.screen_width = $(window).width();
            resize_elements('messaging.js=>window.onresize');
            $(conversationBox).find(" #dvMessage_content").height(objGlobal.msgContentHeight);
          };
          let contact = getContactInfo(strConversationID);
          $(conversationBox).find(" #imgUser_image").attr('src', contact.pic);
          $(conversationBox).find(" #iSearch_icon").attr('src', base_location + "img/conv_msg/search.png"); // sets icon images of template
          $(conversationBox).find(" #iAttachment_icon").attr('src', base_location + "img/conv_msg/footer_paperclip.png");
          $(conversationBox).find(" #iMenu_bar_icon").attr('src', base_location + "img/conv_msg/menu.png");
          $(conversationBox).find(" #iSmiley_icon").attr('src', base_location + "img/conv_msg/footer_smiley.png");
          $(conversationBox).find(" #imgMicrophone").attr('src', base_location + "img/conv_msg/microphone.png");
          $(conversationBox).find(" #dvUser_name").html(contact.user_name);

          $(conversationBox).find(" #imgMicrophone").hammer().on("tap", function(event) {
            sendConversationMsg(strConversationID, 'conversation_message.html=>microphone');
          });
          $(conversationBox).find(" #txtConv_message").focus(); //to set focus in text box
          chat_enter_pressed_messageTab(strConversationID, 'messaging.js=>showConversation');
        });
      });
    }
    // get common code of if-else here
    conversationBox = $(objGlobal.conversationWindow).find(" #dvConversation_" + strConversationID);
    objGlobal.currentConversationWindow = conversationBox;
    $(conversationBox).find(" #txtConv_message").focus(); //to set focus in text box
    chat_enter_pressed_messageTab(strConversationID, 'messaging.js=>showConversation');

  } catch (e) {
    console.log("Error Occured: messaging.js => " + "showConversation" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let showConversations = function(strCalledFrom) {
  //it gets back to the dvConversationList by using z-index
  try {
    $(objGlobal.conversationList).css("z-index", zIndex);
    zIndex++;
  } catch (e) {
    console.log("showConversations issue");
    console.log("Error Occured: messaging.js => " + "showConversations" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let isConversationListItemExisting = function(strConversationID, strCalledFrom) {
  //It checks if conversation list item exists
  try {
    let conversationListItem = $(objGlobal.conversationUsersList).find("#dvConversationListItem" + strConversationID);
    if (conversationListItem.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Error Occured: messaging.js => " + "isConversationListItemExisting" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let isConversationExisting = function(strConversationID, strCalledFrom) {
  //It checks if conversation exists
  try {
    let conversationWindowItem = $(objGlobal.conversationWindow).find("#dvConversation_" + strConversationID);
    if ($(conversationWindowItem).length) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log("Error Occured: messaging.js => " + "isConversationExisting" + " and called from " + strCalledFrom);
    console.log(e);
  }
}