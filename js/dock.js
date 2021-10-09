"use strict";
/*
    Coder: POCH
    File: dock.js
    Lines: 87
    Date: 21-12-2017
    Purpose: functions related to operations of dock like add user to dock and remove user from dock. 
    file linked: template.html
    List of functions :
    1. dock.isUserInDock(user_id, strCalledFrom) => Returns true or false
    2. dock.addUserToDock(user, strCalledFrom) =>if user not in dock it push user to dock and add user's div in dock
    3. dock.removeUserFromDock(user, strCalledFrom) =>remove docked user from dock
    4. dock.userInteractionOnDetailTab(user_id, strCalledFrom) =>show alert on DETAIL tab of dock area
*/
let dock = {};
dock.isUserInDock = function(user_id, strCalledFrom) {
  //It checks if user is in dock or not
  try {
    if ($.inArray(user_id, company[site_id].docks) == -1) //it means user already in dock
    {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.log("Error Occured: dock.js => " + "dock.isUserInDock" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
dock.removeUserFromDock = function(user, strCalledFrom) {
  //It remove docked user from dock
  try {
    let user_id = user.user_id;
    $(objGlobal.dockHolder).find("#dvDockUser_" + user_id).remove();
    company[site_id].docks.splice($.inArray(user_id, company[site_id].docks), 1);
    company[site_id].dockcount--;
  } catch (e) {
    console.log("Error Occured: dock.js => " + "dock.removeUserFromDock" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
dock.addUserToDock = function(user, strCalledFrom) {
  //addUserToDock
  //to load dock.html in dvDockContainer
  try {
    if (dock.isUserInDock(user.user_id)) {
      return false; //do nothing because user is already in dock
    }
    let user_id = user.user_id,
      user_name = user.user_name,
      user_pic = user.pic;
    docked_user_id = user_id;

    let dockUserBlock = document.createElement("div");
    dockUserBlock.setAttributes({
      'id': 'dvDockUser_' + user_id,
      'class': 'dockUserHolder'
    });
    $(objGlobal.dockHolder).append(dockUserBlock);
    company[site_id].docks.push(user.user_id); //push user to dock and increase dock-count
    company[site_id].dockcount++;
    let tmpDockUser = $(objGlobal.dockHolder).find("#dvDockUser_" + user_id);
    $.when($(tmpDockUser).html(arrTemplateContent["dockUserTemplate"])).then(function() {
      $(objGlobal.dockHolder).width(company[site_id].dockcount * 143); //to set width of dvDockHolder

      $(tmpDockUser).find(" #dock_userPic").attr("src", config.image_location + "user_images/pic_loading.gif");
      $(tmpDockUser).find(" #dock_userPic").on('dragstart', function(event) {
        event.preventDefault();
      }); // to prevent drag of image
      $(tmpDockUser).find(" #dockArea_audio_img").attr("src", config.image_location + "del/audio_off.png");
      $(tmpDockUser).find(" #dockArea_video_img").attr("src", config.image_location + "del/video_off.png");
      $(tmpDockUser).find(" #dockArea_detailTab_img").attr("src", config.image_location + "del/detail.png");
      $(tmpDockUser).find(" #dockArea_cross_img").attr("src", config.image_location + "del/cross.png");
      $(tmpDockUser).find(" #dock_userName").html(user_name);
      $(tmpDockUser).find(" #dock_userPic").attr("src", user_pic);
      $(tmpDockUser).find(" #dockArea_video_img").hammer().on("tap", function(event) {
        profile.toggleMedia(3, 'v', user_id, 'dock_user.html => #dockArea_video_img ');
      }); //to toggle video icon of the docked user

      $(tmpDockUser).find(" #dockArea_audio_img").hammer().on("tap", function(event) {
        profile.toggleMedia(3, 'a', user_id, 'dock_user.html => #dockArea_audio_img');
      }); //to toggle audio icon of the docked user
      $(tmpDockUser).find(" #removeUser_FromDock_Ref").attr("href", "javascript:dock.removeUserFromDock(company[site_id].users[" + user.user_id + "],'dock_user.html=>removeUser_FromDock_Ref');"); // set href to remove user from dock
      $(tmpDockUser).find(" #imgDetail_href").attr("href", "javascript:dock.userInteractionOnDetailTab(" + user_id + ",'dock_user.html => # imgDetail_href ');"); // to show alert on DETAIL tab of dock area
    });
  } catch (e) {
    console.log("Error Occured: dock.js => " + "dock.addUserToDock" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
dock.userInteractionOnDetailTab = function(user_id, strCalledFrom) {
  // to show alert on DETAIL tab of dock area 
  try {
    alert("Details of user_id:" + user_id);
  } catch (e) {
    console.log("Error Occured: dock.js => " + "dock.userInteractionOnDetailTab" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
console.log("dock.js loaded");