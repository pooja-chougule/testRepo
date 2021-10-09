"use strict";
/*
    Coder: POCH
    File: profile.js
    Lines: 188
    Date: 21-12-2017
    Purpose:It includes all functions related to showing profile of selected user and logged in user in GroupChat rooms. 
    file linked: template.html
    List of functions used:
    1.profile.setProfileInfo(user, strCalledFrom)=>shows profile info of user and set href of diff tabs in focus area
    2.profile.setLoggedInUserProfile(user, strCalledFrom)=>It sets current users image in Me area and make audio and video toggle in me area
    3.profile.interactUser(iTabId, user_id, strCalledFrom)=>show alert on diff tabs of focus area
    4.profile.toggleMedia(iVideoTabId, user_id, media_type, strCalledFrom)=>toggle video icon in me area , focus area and dock area
*/
let profile = {};
profile.setProfileInfo = function(user, strCalledFrom) {
  //shows profile info of user
  try {
    let user_name = user.user_name,
      user_age = user.age,
      user_gender = user.gender,
      user_location = user.city,
      user_country = user.country,
      user_pic = user.pic,
      user_id = user.user_id,
      room_id = user.room_id;
    objGlobal.user_in_focus_id = user_id;
    if (user_id == current_user_id) {
      $(objGlobal.userProfileOptionsBlock).hide(); // to hide options other than Profile for current user
      $(objGlobal.userProfileCurrentUserProfileBlock).show(); // to show only profile option to current user
    } else {
      $(objGlobal.userProfileOptionsBlock).show();
      $(objGlobal.userProfileCurrentUserProfileBlock).hide();
    }
    user_location = user_location.substring(0, 8); //to limit a string to 8 characters
    user_country = user_country.substring(0, 8);
    // to set user profile in focus - set user's name, photo, age, gender, location, country
    $(objGlobal.userProfileNameBlock).html(user_name);
    $(objGlobal.userProfileImageBlock).attr("src", user_pic);
    $(objGlobal.userProfileImageBlock).on('dragstart', function(event) {
      event.preventDefault();
    }); // to prevent drag of image
    $(objGlobal.userProfileAgeBlock).html(user_age);
    $(objGlobal.userProfileGenderBlock).html(user_gender);
    $(objGlobal.userProfileLocationBlock).html(user_location);
    $(objGlobal.userProfileCountryBlock).html(user_country);
    let selectedUserRoomPath = $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + objGlobal.selected_user_room_id);
    $(selectedUserRoomPath).find("#dvRooms_room_" + objGlobal.selected_user_room_id + "_user_" + objGlobal.selected_user_id).attr("class", "unselectedUserBackground elementWidth roomBarHeight"); // to change background of selected user
    objGlobal.selected_user_id = user_id;
    objGlobal.selected_user_room_id = room_id;
    let roomPath = $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + room_id);
    $(roomPath).find("#dvRooms_room_" + room_id + "_user_" + user_id).attr("class", "selectedUserBackground elementWidth roomBarHeight");
    $(objGlobal.typeSpaceContainer).find("#dvTypingBox #txtChat").focus(); // to set focus in text box
  } catch (e) {
    console.log("Error Occured: profile.js => " + "profile.setProfileInfo" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
profile.interactUser = function(iTabId, strCalledFrom) {
  // to show alert on diff tabs of focus area 
  try {
    switch (iTabId) {
      case 1:
        alert("#Profile for user_id#:" + objGlobal.user_in_focus_id);
        break;
      case 2:
        alert("#Add friend Of user_id#:" + objGlobal.user_in_focus_id);
        break;
      case 3:
        alert("#Block user_id#:" + objGlobal.user_in_focus_id);
        break;
      default:
        //nothing
        break;
    }
  } catch (e) {
    console.log("Error Occured: profile.js => " + "profile.interactUser" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
profile.setLoggedInUserProfile = function(user, strCalledFrom) {
  // Sets users information in the ME area  
  try {
    let user_pic, user_id;
    user_pic = user.pic;
    user_id = user.user_id;
    let loggedInUserImage = $(objGlobal.meAreaContainer).find("#loggedInUser_me_image");
    $(loggedInUserImage).attr("src", user_pic);
    $(loggedInUserImage).on('dragstart', function(event) {
      event.preventDefault();
    });
  } catch (e) {
    console.log("Error Occured: profile.js => " + "profile.setLoggedInUserProfile" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
profile.toggleMedia = function(iVideoTabId, media_type, userId, strCalledFrom) {
  //to toggle video and audio icon in 1. focus area , 2. me area and 3. dock area
  try {
    let img;
    switch (iVideoTabId) {
      case 1:
        //to toggle media in focus area
        switch (media_type) {
          case 'v':
            if (company[site_id].users[userId].video == false) {
              //to make video icon on
              company[site_id].users[userId].video = true;
              img = config.image_location + 'del/video_on.png';
            } else {
              company[site_id].users[userId].video = false;
              img = config.image_location + 'del/video_off.png';
            }
            $(objGlobal.userProfileVideoImgBlock).attr('src', img); //set video on/off    
            break;
          case 'a':
            if (company[site_id].users[userId].audio == false) {
              //to make audio icon on
              company[site_id].users[userId].audio = true;
              img = config.image_location + 'del/audio_on.png';
            } else {
              //to make audio icon off
              company[site_id].users[userId].audio = false;
              img = config.image_location + 'del/audio_off.png';
            }
            $(objGlobal.userProfileAudioImgBlock).attr('src', img);
            break;
        }
        break;
      case 2:
        //to toggle media of me area
        switch (media_type) {
          case 'v':
            if (company[site_id].users[userId].video == false) {
              //to make video icon on
              company[site_id].users[userId].video = true;
              img = config.image_location + 'del/video_on.png';
            } else {
              //to make video icon off
              company[site_id].users[userId].video = false;
              img = config.image_location + 'del/video_off.png';
            }
            $(objGlobal.meAreaContainer).find("#meArea_video_img").attr('src', img);
            break;
          case 'a':
            //to toggle audio of me area
            if (company[site_id].users[userId].audio == false) {
              //to make audio icon on
              company[site_id].users[userId].audio = true;
              img = config.image_location + 'del/audio_on.png';
            } else {
              //to make audio icon off
              company[site_id].users[userId].audio = false;
              img = config.image_location + 'del/audio_off.png';
            }
            $(objGlobal.meAreaContainer).find("#meArea_audio_img").attr('src', img);
            break;
        }
        break;
      case 3:
        //to toggle media of dock area
        let dockedUser = $(objGlobal.dockHolder).find("#dvDockUser_" + userId);

        switch (media_type) {

          case 'v':
            if (company[site_id].users[userId].video == false) {
              //to make video icon on
              company[site_id].users[userId].video = true;
              img = config.image_location + 'del/video_on.png';
            } else {
              //to make video icon off
              company[site_id].users[userId].video = false;
              img = config.image_location + 'del/video_off.png';
            }
            $(dockedUser).find("#dockArea_video_img").attr('src', img);
            break;
          case 'a':
            //to toggle audio of dock area
            if (company[site_id].users[userId].audio == false) {
              //to make audio icon on
              company[site_id].users[userId].audio = true;
              img = config.image_location + 'del/audio_on.png';
            } else {
              //to make audio icon off
              company[site_id].users[userId].audio = false;
              img = config.image_location + 'del/audio_off.png';
            }
            $(dockedUser).find("#dockArea_audio_img").attr('src', img);
            break;
        }
        break;
      default:
        //nothing
        break;
    }
  } catch (e) {
    console.log("Error Occured: profile.js => " + "profile.toggleMedia" + " and called from " + strCalledFrom);
    console.log(e);
  }
}