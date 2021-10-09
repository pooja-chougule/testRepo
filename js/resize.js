"use strict";
/*
    Coder: POCH
    File: resize.js
    Lines: 91
    Date: 25-1-2018
    Purpose:It sets height and width of tubely  to screen_height and screen_width and sets height and width of different screens of different tabs
    file linked:load_head_files.js
    List of functions:
    1.resize_elements(strCalledFrom)=>set initial height/width of the page
    2.window.onresize(event)=>to adjust screen height on scrolling
    */

let resize_elements = function(strCalledFrom) {
  try {
     /*
  set initial height/width of the page
    
  */
    $("#dvWait").show();
      $("#dvMain").height(objGlobal.screen_height);
      $("#dvMain").width(objGlobal.screen_width);
    objGlobal.mainDv_height = $("#dvMain").height();
    objGlobal.mainDv_width = $("#dvMain").width();
    objGlobal.header_height = $("#dvHeader").height();
    objGlobal.footer_height = $("#dvFooter").height();
    $("#dvTabContainer").height(objGlobal.mainDv_height - objGlobal.header_height - objGlobal.footer_height);
    if (head.desktop) {
      objGlobal.tab_container_height = $("#dvTabContainer").height();
      
    } else {
      objGlobal.tab_container_height = $("#dvMainMobile_dvchat_dvTabContainer").height();
    }
    objGlobal.rooms_container_height = objGlobal.tab_container_height - objGlobal.user_info_container_height - objGlobal.chat_header_container_height;
    objGlobal.chat_window_container_height = objGlobal.rooms_container_height - objGlobal.typing_box_container_height;
    objGlobal.chat_window_height = objGlobal.chat_window_container_height - objGlobal.chat_window_header_height;
    $("#dvChatRoomsContainer").height(objGlobal.rooms_container_height);
    $("#dvChatWindowContainer").height(objGlobal.chat_window_container_height);
    let chatHeaderHeight = $("#dvChatHeaderContainer").height();
    let userInfoContainerHeight = $("#dvUserInfoContainer").height();
    let chatRoomsRowHeight = objGlobal.tab_container_height - chatHeaderHeight - userInfoContainerHeight;
    let roomHeadingHeight, roomsContainerHeight;

    roomHeadingHeight = $("#dvRooms_roomHeading").height();
    roomsContainerHeight = $("#dvRooms").height();
    $("#dvRooms #dvRooms_container").height(roomsContainerHeight - roomHeadingHeight);
    $("#dvchatHistory_msgs_box").height(objGlobal.chat_window_height);
    let textBoxHeight = $("#dvTypeSpaceContainer").height();
    let chatWindowHeight = roomsContainerHeight - textBoxHeight;
    let tabContainerWidth = $("#dvTabContainer").width();
    $("#dvCurrentUserContainer #dvDockContainer").width((objGlobal.screen_width - 275 - 143));
    let convListWidth = $("#dvConversationList").width();
    let convWidth = tabContainerWidth - convListWidth;
    $("#dvConversations").width(convWidth);
    let convUsersListHeight;
    if (head.desktop) {
      objGlobal.conversation_window_height=objGlobal.tab_container_height;
      $("#dvConversations").height(objGlobal.conversation_window_height);
      convUsersListHeight = objGlobal.tab_container_height - 60 - 40;
      objGlobal.msgContentHeight = objGlobal.conversation_window_height - 60 - 60;
    } else {
      convUsersListHeight = objGlobal.tab_container_height;
      
      objGlobal.conversation_window_height=objGlobal.tab_container_height+40+55;
      $("#dvConversations").height(objGlobal.conversation_window_height);
      objGlobal.msgContentHeight = objGlobal.conversation_window_height - 40 - 60;
    }
    $("#dvConversationListUsers").height(convUsersListHeight);

    return false;
  } catch (e) {
    console.log("Error Occured: resize.js => " + "resize_elements" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
window.onresize = function(event) {
  //to adjust screen height on scrolling
  objGlobal.screen_height = $(window).height();
  objGlobal.screen_width = $(window).width();
  resize_elements('resize.js=>window.onresize');
};
