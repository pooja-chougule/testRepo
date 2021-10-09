"use strict";
/*
    Coder: POCH
    File: header.js
    Lines: 50
    Date: 21-2-2018
    Purpose:toggle tabs in header
    file linked:template.html
    List of functions:
    1.hide_all_tabs(strCalledFrom)=>hide all the tabs
    2.toggle_tab(iTabID,strCalledFrom)=>to toggle tabs
  */
let hide_all_tabs = function(strCalledFrom) {
  //hide all the tabs
  try {

    $(objGlobal.chatBoxPath).hide();
    $(objGlobal.searchBoxPath).hide();
    $(objGlobal.messageBoxPath).hide();
    $(objGlobal.settingBoxPath).hide();
    $(objGlobal.earnMoneyBoxPath).hide();
    $(objGlobal.logOutBoxPath).hide();
  } catch (e) {
    console.log("Error Occured: header.js => " + "hide_all_tabs" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let toggle_tab = function(iTabID, strCalledFrom) {
  //to toggle tabs
  try {
    hide_all_tabs("main.js=>toggle_tab");
    switch (iTabID) {
      case 1:
        $(objGlobal.chatBoxPath).show();
        $("#txtChat").focus(); //to get cursor in text box
        break;
      case 2:
        $(objGlobal.searchBoxPath).show();
        break;
      case 3:
        $(objGlobal.messageBoxPath).show();
        showConversation(user_id + "-" + contacts[1].user_id, 'templates.js=>templates.load');
        break;
      case 4:
        $(objGlobal.settingBoxPath).show();
        break;
      case 5:
        $(objGlobal.earnMoneyBoxPath).show();
        break;
      case 6:
        $(objGlobal.logOutBoxPath).show();
        translate('header.js=>logOut');
        break;
      default:
        //nothing
        break;
    }
    resize_elements('header.js=>toggle_tab');
  } catch (e) {
    console.log("Error Occured: header.js => " + "toggle_tab" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let hide_all_containers = function(strCalledFrom) {
  //hide all containers
  $("#dvSignInContainer").hide();
  $("#dvSignupContainer").hide();

  $("#dvHomePageContainer").hide();
}
let toggle_containers = function(iContainerId, strCalledFrom) {
  //to toggle containers
  hide_all_containers("tabui.js=>toggle_containers");
  switch (iContainerId) {
    case 1:
      // $.when(
      $("#dvSignInContainer").show();
      break;
    case 2:
      $("#dvSignupContainer").show();

      break;
    case 3:
     
      $("#dvHomePageContainer").show();
      break;
    default:
      //nothing
      break;
  }
}