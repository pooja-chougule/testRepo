"use strict";
/*
    Coder: POCH
    File: load_templates.js
    Lines:370
    Date: 3-4-2018
    Purpose:It adds html templates into arrTemplates[] and load html templates in memory using function loadHTMLTemplatesInMemory().
    List of functions:
    1.loadHTMLTemplatesInMemory(strCalledFrom)=>load html templates in memory
    2.createContainers(strCalledFrom)=>load templates of main containers like header, tabContainer and footer and load all tabWindow templates 
    3.createMainContainer(strCalledFrom)=>load tabContainer and footer template
    4.loadChatContainer(strCalledFrom)=>load chatContainer and its all inside templates
    5.setUserDetailsArea(strCalledFrom)=>set user details and tap events of tabs in focus area
    6.setMeArea(strCalledFrom)=>set user details and tap events of tabs in me area
    7.loadMessageContainer(strCalledFrom)=>load meaasge container
    8.setConvListHeader(strCalledFrom)=>set conversationListHeader
    9.loadSearchContainer(strCalledFrom)=> load searchContainer
    10.loadParentContainers(strCalledFrom)=>load parent containers like sign in container,signup Container, homepage container
    11.loadHomePageContainers(strCalledFrom)=>load HomePageContainers by checking if its desktop or mobile
   */
let arrTemplateContent = {};
let iTemplateLoadedCount = 0;
arrTemplates.push({
  'svar': "signupTemplate",
  'url': base_location + 'templates/signup.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "containersTemplate",
  'url': base_location + 'templates/tubely_containers.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "chatTemplate",
  'url': base_location + 'templates/chat.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "chatMessageTemplate",
  'url': base_location + 'templates/chat_message_template.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "chatHeaderTemplate",
  'url': base_location + 'templates/chat_header.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "chatRoomsTemplate",
  'url': base_location + 'templates/chat_rooms.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "chatWindowTemplate",
  'url': base_location + 'templates/chat_window.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "chatInputBoxTemplate",
  'url': base_location + 'templates/typespace.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "userProfileTemplate",
  'url': base_location + 'templates/user_details.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "loggedInUserTemplate",
  'url': base_location + 'templates/loggedin_user.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "meAreaTemplate",
  'url': base_location + 'templates/me.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "dockUserTemplate",
  'url': base_location + 'templates/dock_user.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "headerTemplate",
  'url': base_location + 'templates/header.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "tabContainerTemplate",
  'url': base_location + 'templates/tab_container.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "footerTemplate",
  'url': base_location + 'templates/footer.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "bodyTemplate",
  'url': base_location + 'templates/body.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "messageTemplate",
  'url': base_location + 'templates/message.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "convListHeaderTemplate",
  'url': base_location + 'templates/conversation_listheader.html?' + genRandomNumbers()
});
// arrTemplates.push({
//   'svar': "searchTemplate",
//   'url': base_location + 'templates/swipe.html?' + genRandomNumbers()
// });
arrTemplates.push({
  'svar': "conversationListItemTemplate",
  'url': base_location + 'templates/conversation_listitem.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "conversationMessageTemplate",
  'url': base_location + 'templates/conversation_message.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "mobileUiTemplate",
  'url': base_location + 'templates/mobileui_template.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "mobileTabContainer",
  'url': base_location + 'templates/mobile_tabcontainer.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "mobile_msgnavigationTemplate",
  'url': base_location + 'templates/mobile_msgnavigation.html?' + genRandomNumbers()
});
arrTemplates.push({
  'svar': "user_msg_template",
  'url': base_location + 'templates/user_msg_template.html?' + genRandomNumbers()
});
let loadHTMLTemplatesInMemory = function(strCalledFrom) {
  try {
    //load html templates in memory
    $.get(arrTemplates[iTemplateLoadedCount].url, function(res) {
      let tmpvarname = arrTemplates[iTemplateLoadedCount].svar;
      arrTemplateContent[tmpvarname] = res.toString();
      iTemplateLoadedCount++;
      if (iTemplateLoadedCount == arrTemplates.length) {
        console.log("this is the end");
        //call whatever function
        loadParentContainers('load_templates.js=>loadHTMLTemplatesInMemory');

      } else {
        loadHTMLTemplatesInMemory('load_templates.js=>loadHTMLTemplatesInMemory');
      }
    }).done(function() {})
  } catch (e) {
    console.log("Error Occured: load_templates.js=> " + "loadHTMLTemplatesInMemory" + " and called from " + strCalledFrom);
  }
}

let loadParentContainers = function(strCalledFrom) {
  //load parent containers like sign in container,signup Container, homepage container
  try {
    $.when($('body').html(arrTemplateContent["containersTemplate"])).then(function() {
      $.when($("#dvSignupContainer").html(arrTemplateContent["signupTemplate"])).then(function() {
        password = document.getElementById("txtPassWord");
        confirmPassword = document.getElementById("txtConfirmPassword");

        toggle_containers(1, 'load_templates.js=>loadParentContainers');
      });

    });

  } catch (e) {
    console.log("Error Occured: load_templates.js=> " + "loadParentContainers" + " and called from " + strCalledFrom);
  }
}

let loadHomePageContainers = function(strCalledFrom) {
  //load HomePageContainers by checking if its desktop or mobile
  try {
    if (head.desktop) {
      $.when(createContainers('load_templates.js=>loadHomePageContainers')).then(function() {
        toggle_containers(3, 'load_templates.js=>loadHomePageContainers');

      });
    } else {
      $.when(createMobileUI('load_templates.js=>loadHomePageContainers')).then(function() {
        toggle_containers(3, 'load_templates.js=>loadHomePageContainers');

      });

    }
  } catch (e) {
    console.log("Error Occured: load_templates.js=> " + "loadHomePageContainers" + " and called from " + strCalledFrom);
  }
}
let createContainers = function(strCalledFrom) {
  try {
    //load templates of main containers like header, tabContainer and footer and load all tabWindow templates 
    console.log("after this is the end createConainers called...");
    //     $.when($('body').html(arrTemplateContent["bodyTemplate"])).then(function() {
    $.when($("#dvHomePageContainer").html(arrTemplateContent["bodyTemplate"])).then(function() {

      $.when($('#dvHeader').html(arrTemplateContent["headerTemplate"])).then(function() {
        $.when(createMainContainer('load_templates.js.js=>createContainers')).then(function() {
          $.when(loadChatContainer('load_templates.js.js=>createContainers')).then(function() {
            console.log("chatContainers loaded");
            $.when(loadMessageContainer('load_templates.js.js=>createContainers')).then(function() {
              $.when(loadSearchContainer('load_templates.js.js=>createContainers')).then(function() {
                $.when(resize_elements('load_templates.js=>createContainers')).then(function() {
                  $.when(toggle_tab(1, 'load_templates.js=>createContainers')).then(function() {
                    console.log("toggle_tab get called");
                    $.when($("#dvMain").show()).then(function() {
                      translate('load_templates.js=>createContainers');
                      $.when($("#dvWait").hide()).then(function() {
                        end();
                        console.log("total time to load evrything");
                        setTimeout(setConversationMessage, 10000);
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  } catch (e) {
    console.log("Error Occured: load_templates.js => " + "createContainers" + " and called from " + strCalledFrom);
  }
}
let createMainContainer = function(strCalledFrom) {
  try {
    //load tabContainer and footer template
    let tabContainer=$("#dvHomePageContainer #dvMain #dvTabContainer");
    $.when($(tabContainer).html(arrTemplateContent["tabContainerTemplate"])).then(function() {
      objGlobal.chatBoxPath = $(tabContainer).find("#dvChat");
      objGlobal.searchBoxPath = $(tabContainer).find("#dvSearch");
      objGlobal.messageBoxPath = $(tabContainer).find("#dvMessages");
      objGlobal.settingBoxPath = $(tabContainer).find("#dvSettings");
      objGlobal.earnMoneyBoxPath = $(tabContainer).find("#dvEarn");
      objGlobal.logOutBoxPath = $(tabContainer).find("#dvLogout");
      $("#dvHomePageContainer #dvMain #dvFooter").html(arrTemplateContent["footerTemplate"]);
    });
  } catch (e) {
    console.log("Error Occured: load_templates.js => " + "createMainContainer" + " and called from " + strCalledFrom);
  }
}
let loadChatContainer = function(strCalledFrom) {
  try {
    //load chatContainer and its all inside templates
    $.when($( objGlobal.chatBoxPath ).html(arrTemplateContent["chatTemplate"])).then(function() {
      objGlobal.chatHeaderContainer = $(objGlobal.chatBoxPath).find(" #dvChatHeaderContainer");
      $.when($(objGlobal.chatHeaderContainer).html(arrTemplateContent["chatHeaderTemplate"])).then(function() {
        $(objGlobal.chatHeaderContainer).find("#dvChatHeader_siteName").html(objGlobal.site_name + " #Webchat#");
        $(objGlobal.chatHeaderContainer).find("#dvChatHeader_report").html("#Report Abuse#");
        $(objGlobal.chatHeaderContainer).find("#dvChatHeader_help").html("#Help#");
        objGlobal.chatroomsContainer = $(objGlobal.chatBoxPath).find(" #dvChatRoomsContainer");
        objGlobal.chatWindowContainer = $(objGlobal.chatBoxPath).find(" #dvChatWindowContainer");
        objGlobal.typeSpaceContainer = $(objGlobal.chatBoxPath).find(" #dvTypeSpaceContainer");
        objGlobal.userInfoContainer = $(objGlobal.chatBoxPath).find(" #dvUserInfoContainer");
        objGlobal.currentUserContainer = $(objGlobal.chatBoxPath).find(" #dvCurrentUserContainer");
        $.when($(objGlobal.chatroomsContainer).html(arrTemplateContent["chatRoomsTemplate"])).then(function() {
          objGlobal.roomListHeaderPath=$(objGlobal.chatroomsContainer).find("#dvRooms #dvRooms_roomHeading");
          objGlobal.roomListBoxPath = $(objGlobal.chatroomsContainer).find("#dvRooms  #dvRooms_container");
          $.when($(objGlobal.chatWindowContainer).html(arrTemplateContent["chatWindowTemplate"])).then(function() {
            objGlobal.chatHistoryMsgsBox = $(objGlobal.chatWindowContainer).find("#dvchatHistory_msgs");
            $.when($(objGlobal.typeSpaceContainer).html(arrTemplateContent["chatInputBoxTemplate"])).then(function() {
              $.when($(objGlobal.userInfoContainer).html(arrTemplateContent["userProfileTemplate"])).then(function() {
                //setting path reference variables of elements of userProfileTemplate
                objGlobal.userProfileNameBlock = $(objGlobal.userInfoContainer).find("#dvUserProfile_nameBlock #dvUserProfile_userName");
                objGlobal.userProfileImageBlock = $(objGlobal.userInfoContainer).find("#dvUserProfile_userImage");
                objGlobal.userProfileAudioImgBlock = $(objGlobal.userInfoContainer).find("#imgAudio");
                objGlobal.userProfileVideoImgBlock = $(objGlobal.userInfoContainer).find("#imgVideo");
                objGlobal.userProfileRemoveImgBlock = $(objGlobal.userInfoContainer).find("#imgRemove");
                objGlobal.userProfileAddImgBlock = $(objGlobal.userInfoContainer).find("#imgAdd");
                objGlobal.userProfileDetailsBlock = $(objGlobal.userInfoContainer).find("#dvUserProfile_details");
                objGlobal.userProfileAgeBlock = $(objGlobal.userProfileDetailsBlock).find("#dvUserProfile_details_userAge");
                objGlobal.userProfileGenderBlock = $(objGlobal.userProfileDetailsBlock).find("#dvUserProfile_details_userGender");
                objGlobal.userProfileLocationBlock = $(objGlobal.userProfileDetailsBlock).find("#dvUserProfile_details_userLocation");
                objGlobal.userProfileCountryBlock = $(objGlobal.userProfileDetailsBlock).find("#dvUserProfile_details_userCountry");
                objGlobal.userProfileOptionsBlock = $(objGlobal.userInfoContainer).find("#dvUserProfile_userOptions");
                objGlobal.userProfileShowProfileTab = $(objGlobal.userProfileOptionsBlock).find("#dvUserProfile_profileTab");
                objGlobal.userProfileAddFriendTab = $(objGlobal.userProfileOptionsBlock).find("#dvUserProfile_addFriendTab");
                objGlobal.userProfileBlockTab = $(objGlobal.userProfileOptionsBlock).find("#dvUserProfile_blockTab");
                objGlobal.userProfileDockTab = $(objGlobal.userProfileOptionsBlock).find("#dvUserProfile_dockTab");
                objGlobal.userProfileCurrentUserProfileBlock = $(objGlobal.userInfoContainer).find("#dvUserProfile_currentUserProfileTab_Box");
                objGlobal.userProfileCurrentUserProfileTab = $(objGlobal.userProfileCurrentUserProfileBlock).find("#dvUserProfile_currentUserProfileTab");
                setUserDetailsArea('load_templates.js=>loadChatContainer');
                $.when($(objGlobal.currentUserContainer).html(arrTemplateContent["loggedInUserTemplate"])).then(function() {
                  objGlobal.meAreaContainer = $(objGlobal.currentUserContainer).find("#meAreaContainer");
                  objGlobal.dockHolder = $(objGlobal.currentUserContainer).find("#dvDockContainer #dvDockHolder");
                  $.when($(objGlobal.meAreaContainer).html(arrTemplateContent["meAreaTemplate"])).then(function() {
                    $.when(resize_elements('load_templates.js=>loadChatContainer')).then(function() {
                      setMeArea('load_templates.js=>loadChatContainer');
                      $.when(populateRooms('load_templates.js.js=>loadChatContainer')).then(function() {
                        $.when(populateUsers('load_templates.js.js=>loadChatContainer')).then(function() {
                          profile.setLoggedInUserProfile(company[site_id].users[current_user_id], 'load_templates.js=>loadChatContainer');
                          profile.setProfileInfo(company[site_id].users[current_user_id], 'load_templates.js=>loadChatContainer')
                          $(objGlobal.typeSpaceContainer).find("#dvTypingBox #txtChat").focus(); //to get cursor in text box of chat  window
                          chat_enter_pressed('load_templates.js.js=>loadChatContainer'); //to send message on enter pressed
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  } catch (e) {
    console.log("Error Occured: load_templates.js => " + "loadChatContainer" + " and called from " + strCalledFrom);
  }
}
let setUserDetailsArea = function(strCalledFrom) {
  try {
    //set user details and tap events of tabs in focus area
    $(objGlobal.userProfileImageBlock).attr("src", config.image_location + "user_images/pic_loading.gif");
    $(objGlobal.userProfileAudioImgBlock).attr("src", config.image_location + "del/audio_off.png");
    $(objGlobal.userProfileVideoImgBlock).attr("src", config.image_location + "del/video_off.png");
    $(objGlobal.userProfileRemoveImgBlock).attr("src", config.image_location + "del/remove.png");
    $(objGlobal.userProfileAddImgBlock).attr("src", config.image_location + "del/add.png");
    $(objGlobal.userProfileVideoImgBlock).hammer().on("tap", function(event) {
      profile.toggleMedia(1, 'v', objGlobal.user_in_focus_id, 'user_details.html=>#imgVideo');
    });
    $(objGlobal.userProfileAudioImgBlock).hammer().on("tap", function(event) {
      profile.toggleMedia(1, 'a', objGlobal.user_in_focus_id, 'user_details.html=>#imgAudio');
    });
    $(objGlobal.userProfileRemoveImgBlock).hammer().on("tap", function(event) {
      userInfo.removeUserObj(objGlobal.user_in_focus_id, 'user_details.html=>#imgRemove'); // to set remove user tab 
    });
    $(objGlobal.userProfileShowProfileTab).hammer().on("tap", function(event) {
      profile.interactUser(1, 'user_details.html=>#dvUserProfile_profileTab'); //to show alert on Profile tab of focus area
    });
    $(objGlobal.userProfileAddFriendTab).hammer().on("tap", function(event) {
      profile.interactUser(2, 'user_details.html=>#dvUserProfile_addFriendTab'); ////to show alert on Add friend tab of focus area
    });
    $(objGlobal.userProfileBlockTab).hammer().on("tap", function(event) {
      profile.interactUser(3, 'user_details.html=>#dvUserProfile_blockTab'); //to show alert on Block tab of focus area
    });
    $(objGlobal.userProfileDockTab).hammer().on("tap", function(event) {
      dock.addUserToDock(company[site_id].users[objGlobal.user_in_focus_id], 'user_details.html=>#dvUserProfile_dockTab'); //to add user to dock
    });
    $(objGlobal.userProfileCurrentUserProfileTab).hammer().on("tap", function(event) {
      profile.interactUser(1, 'user_details.html=>#dvUserProfile_currentUserProfileTab'); //to show alert on Profile tab of current user in focus area
    });

  } catch (e) {
    console.log("Error Occured: load_templates.js => " + "setUserDetailsArea" + " and called from " + strCalledFrom);
  }
}
let setMeArea = function(strCalledFrom) {
  try {
    // set user details and tap events of tabs in me area
    $(objGlobal.meAreaContainer).find("#loggedInUser_me_image").attr("src", config.image_location + "user_images/pic_loading.gif");
    $(objGlobal.meAreaContainer).find("#meArea_audio_img").attr("src", config.image_location + "del/audio_off.png");
    $(objGlobal.meAreaContainer).find("#meArea_video_img").attr("src", config.image_location + "del/video_off.png");
    $(objGlobal.meAreaContainer).find("#meArea_bar_img").attr("src", config.image_location + "del/bar.png");
    $(objGlobal.meAreaContainer).find("#meArea_video_img").hammer().on("tap", function(event) {
      profile.toggleMedia(2, 'v', current_user_id, 'me.html=>#meArea_video_img'); //toggle video in me area
    });
    $(objGlobal.meAreaContainer).find("#meArea_audio_img").hammer().on("tap", function(event) {
      profile.toggleMedia(2, 'a', current_user_id, 'me.html=>#meArea_audio_img'); // toggle audio in me area
    });
    $(objGlobal.meAreaContainer).find("#meArea_settings_tab").hammer().on("tap", function(event) {
      toggle_tab(4, 'me.html=>#meArea_settings_tab'); //set  settings tab of me area
    });
  } catch (e) {
    console.log("Error Occured: load_templates.js => " + "setMeArea" + " and called from " + strCalledFrom);
  }
}
let loadMessageContainer = function(strCalledFrom) {
  try {
    //load meaasge container
    $.when($(objGlobal.messageBoxPath).html(arrTemplateContent["messageTemplate"])).then(function() {
      objGlobal.conversationList=$(objGlobal.messageBoxPath).find("#dvConversationList");
      objGlobal.conversationUsersList = $(objGlobal.conversationList).find(" #dvConversationListUsers");
      objGlobal.conversationWindow = $(objGlobal.messageBoxPath).find(" #dvConversations");
      $.when($(objGlobal.conversationList).find("#dvConversationListHeader").html(arrTemplateContent["convListHeaderTemplate"])).then(function() {
        $.when(setConvListHeader('load_templates.js=>loadMessageContainer')).then(function() {
          $.when(doTestMessages('load_templates.js=>loadMessageContainer')).then(function() {
            resize_elements('load_templates.js=>loadMessageContainer');
          });
        });
      });
    });
  } catch (e) {
    console.log("Error Occured: load_templates.js => " + "loadMessageContainer" + " and called from " + strCalledFrom);
  }
}
let setConvListHeader = function(strCalledFrom) {
  try {
    //set conversationListHeader
    $("#imgConvHeader").attr("src", contacts[user_id].pic);
    $("#imgConversationList_headerStatus").attr("src", config.image_location + "conv_msg/status.png");
    $("#imgConversationList_headerChat").attr("src", config.image_location + "conv_msg/chat.png");
    $("#imgConversationList_headerMenu").attr("src", config.image_location + "conv_msg/menu.png");
  } catch (e) {
    console.log("Error Occured: load_templates.js => " + "setConvListHeader" + " and called from " + strCalledFrom);
  }
}
let loadSearchContainer = function(strCalledFrom) {
  //set Search tab
  try {
    // load searchContainer
    //     $.when($("#dvSearch").html(arrTemplateContent["searchTemplate"])).then(function() {
    //       doSwipe('load_templates.js=>loadSearchContainer');
    //     });
  } catch (e) {
    console.log("Error Occured: load_templates.js => " + "loadSearchContainer" + " and called from " + strCalledFrom);
  }
}