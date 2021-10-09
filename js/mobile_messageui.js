"use strict";
/*
    Coder: POCH
    File: mobile_messageui.js
    Lines: 185
    Date: 22-3-2018
    Purpose:It creates mobile ui and set height and width
    List of functions:
    1.init(strCalledFrom)=>loads all script and css files through head.js
    2.loadNavigationBarTemplate(strCalledFrom)=>load template of navigation bar and set tap event on each tab 
    3.createMobileUI(strCalledFrom)=>creates mobileUI
    4.showTabWindow(window_id, strTabTitle,strCalledFrom)=>shows tabWindow depending on given window_id by setting z-index property and sets the title of that window
    */
let usersList;
let init = function(strCalledFrom) {
  //set height and width of main div and other divs
  try {
    let iHeight, iWidth;
    iHeight = $(window).height();
    iWidth = $(window).width();
    let userList_height = iHeight - 40 - 55;
    $("#dvMainMobile").height(iHeight);
    $("#dvMainMobile").width(iWidth);
    $("#dvMainMobile_dvchat_dvTabContainer").height(userList_height);
    loadNavigationBarTemplate('mobile_messageui.js =>init'); //?It loads navigation bar template in footer
  } catch (e) {
    console.log("Error Occured: mobile_messageui.js => " + " init " + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let loadNavigationBarTemplate = function(strCalledFrom) {
  //load template of navigation bar and set tap event on each tab 
  try {
    let footerNavigationBarPath = $("#dvMainMobile #dvMainMobile_dvchat #dvMainMobile_dvchat_dvFooter");


    $.when($(footerNavigationBarPath).html(arrTemplateContent["mobile_msgnavigationTemplate"])).then(function() {
      // sets tab immages
      let roomsTabPath, chatTabPath, searchTabPath, messagesTabPath, settingsTabPath, earnTabPath, logoutTabPath;
      roomsTabPath = $(footerNavigationBarPath).find(" #dvHeader_chatRoomsTab");
      chatTabPath = $(footerNavigationBarPath).find(" #dvHeader_chatTab");
      searchTabPath = $(footerNavigationBarPath).find(" #dvHeader_searchTab");
      messagesTabPath = $(footerNavigationBarPath).find(" #dvHeader_messagesTab");
      settingsTabPath = $(footerNavigationBarPath).find(" #dvHeader_settingsTab");
      earnTabPath = $(footerNavigationBarPath).find(" #dvHeader_earnTab");
      logoutTabPath = $(footerNavigationBarPath).find(" #dvHeader_logoutTab");

      $(roomsTabPath).find("#imgRoomListTab").attr("src", base_location + "img/header/roomlist.png");
      $(chatTabPath).find("#imgChatTab").attr("src", base_location + "img/header/chat.png");
      $(searchTabPath).find("#imgSearchTab").attr("src", base_location + "img/header/search.png");
      $(messagesTabPath).find("#imgMsgTab").attr("src", base_location + "img/header/commenting.png");
      $(settingsTabPath).find("#imgSettingsTab").attr("src", base_location + "img/header/wrench.png");
      $(earnTabPath).find("#imgEarnTab").attr("src", base_location + "img/header/money.png");
      $(logoutTabPath).find("#imgLogOutTab").attr("src", base_location + "img/header/close.png");

      let doubleTapped = false;
      $(roomsTabPath).hammer();
      $(roomsTabPath).on('doubletap', function(event) {
        doubleTapped = true;
        console.log('this was a double tap');
      }).on('tap', function(event) {
        if (!doubleTapped) {
          showTabWindow("dvRooms_container", 'Rooms List', 'mobile_messageui.js=>roomList_tab');
          console.log('this was a single tap');
        }
        doubleTapped = false;
      });
      $(chatTabPath).hammer();
      $(chatTabPath).on('doubletap', function(event) {
        doubleTapped = true;
        console.log('this was a double tap');
      }).on('tap', function(event) {
        if (!doubleTapped) {
          showTabWindow("dvChatWindow", 'Chat', 'mobile_messageui.js=>roomList_tab');
          console.log('this was a single tap');
        }
        doubleTapped = false;
      });
      $(searchTabPath).hammer();
      $(searchTabPath).on('doubletap', function(event) {
        doubleTapped = true;
        console.log('this was a double tap');
      }).on('tap', function(event) {
        if (!doubleTapped) {
          showTabWindow("dvSearchWindow", 'Search', 'mobile_messageui.js=>roomList_tab');
          console.log('this was a single tap');
        }
        doubleTapped = false;
      });
      $(messagesTabPath).hammer();
      $(messagesTabPath).on('doubletap', function(event) {
        doubleTapped = true;
        console.log('this was a double tap');
      }).on('tap', function(event) {
        if (!doubleTapped) {
          showTabWindow("dvConversationListUsers", 'Message', 'mobile_messageui.js=>roomList_tab');
          console.log('this was a single tap');
        }
        doubleTapped = false;
      });
      $(settingsTabPath).hammer();
      $(settingsTabPath).on('doubletap', function(event) {
        doubleTapped = true;
        console.log('this was a double tap');
      }).on('tap', function(event) {
        if (!doubleTapped) {
          showTabWindow("dvSettingsWindow", 'Settings', 'mobile_messageui.js=>roomList_tab');
          console.log('this was a single tap');
        }
        doubleTapped = false;
      });
      $(earnTabPath).hammer();
      $(earnTabPath).on('doubletap', function(event) {
        doubleTapped = true;
        console.log('this was a double tap');
      }).on('tap', function(event) {
        if (!doubleTapped) {
          showTabWindow("dvEarnMoneyWindow", 'Earn Money', 'mobile_messageui.js=>roomList_tab');
          console.log('this was a single tap');
        }
        doubleTapped = false;
      });
      $(logoutTabPath).hammer();
      $(logoutTabPath).on('doubletap', function(event) {
        doubleTapped = true;
        console.log('this was a double tap');
      }).on('tap', function(event) {
        if (!doubleTapped) {
          location.reload();
          console.log('this was a single tap');
        }
        doubleTapped = false;
      });
    });
  } catch (e) {
    console.log("Error Occured: mobile_messageui.js => " + " loadTemplate " + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let showTabWindow = function(window_id, strTabTitle, strCalledFrom) {
  // shows tabWindow depending on given window_id by setting z-index property and sets the title of that tab
  try {
    if (window_id == "dvConversationListUsers") {
      objGlobal.usersList = true;
    } else {
      objGlobal.usersList = false;
    }
    console.log(usersList);
    let activeTab = document.getElementById(window_id);
    activeTab.style.zIndex = zIndex;
    zIndex++;
    $(objGlobal.conversationWindow).hide();
    $("#dvMainMobile #dvMainMobile_dvchat #dvMainMobile_dvchat_dvHeader").show();
    $("#dvMainMobile #dvMainMobile_dvchat #dvMainMobile_dvchat_dvHeader #spTabHeader").html(strTabTitle);
  } catch (e) {
    console.log("Error Occured: mobile_messageui.js => " + " showTabWindow " + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let createMobileUI = function(strCalledFrom) {
  // creates mobileUI
  try {
    //$.when($('body').html(arrTemplateContent["mobileUiTemplate"])).then(function() {

    $.when($("#dvHomePageContainer").html(arrTemplateContent["mobileUiTemplate"])).then(function() {
      $.when(init('mobile_messageui.js=>createMobileUI')).then(function() {
        $.when($("#dvMainMobile_dvchat_dvTabContainer").html(arrTemplateContent["mobileTabContainer"])).then(function() {
          let tabContainer = $("#dvMainMobile #dvMainMobile_dvchat #dvMainMobile_dvchat_dvTabContainer");
          // it loads tabContainer template in tabContainer div
          objGlobal.conversationUsersList = $(tabContainer).find(" #dvConversationListUsers");
          objGlobal.conversationWindow = $(tabContainer).find(" #dvConversations");
          objGlobal.searchBoxPath = $(tabContainer).find(" #dvSearchWindow");
          objGlobal.roomListBoxPath = $(tabContainer).find(" #dvRooms_container");
          objGlobal.chatWindow = $(tabContainer).find(" #dvChatWindow");
          objGlobal.settingsWindow = $(tabContainer).find(" #dvSettingsWindow");
          objGlobal.earnMoneyWindow = $(tabContainer).find(" #dvEarnMoneyWindow");
          objGlobal.logOutWindow = $(tabContainer).find(" #dvLogOutWindow");
          //searchTemplate
          //           $.when($(searchBoxPath).html(arrTemplateContent["searchTemplate"])).then(function() {
          //             // It loads template in searchWindow
          //             doSwipe('mobile_messageui.js=>searchWindow.load');

          $.when(doTestMessages('mobile_messageui.js=>createMobileUI')).then(function() { // It loads users list
            resize_elements('mobile_messageui.js=>createMobileUI');
            populateRooms('mobile_messageui.js=>createMobileUI');
            showTabWindow("dvConversationListUsers", 'Message', 'mobile_messageui.js=>createMobileUI'); // It shows messaging window as default window
            $.when($("#dvMainMobile").show()).then(function() {
              translate('mobile_messageui.js=>createMobileUI');
              $.when($("#dvWait").hide()).then(function() {
                end();
                console.log("total time to load evrything");
              });
            });
          });
        });
      });
    });
  } catch (e) {
    console.log("Error Occured: mobile_messageui.js => " + " createMobileUI " + " and called from " + strCalledFrom);
    console.log(e);
  }
}
console.log("mobile_messageui.js get loaded");