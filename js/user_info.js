"use strict";
/*
    Coder: POCH
    File: user_info.js
    Lines: 160
    Date: 21-12-2017
    Purpose:It includes all functions related to user operations like add user,remove user from room 
    file linked: template.html,chat_rooms.html
    List of functions used:
    1.userInfo.addUserToObj(user, strCalledFrom)=>add user to the javascript object
    2.userInfo.addUserToRoomObj(user, strCalledFrom)=>add user to room object
    3.userInfo.removeUserObj(user_id, strCalledFrom)=>remove user-object
    4.userInfo.addUser(obj, strCalledFrom)=>adding user-it adds user div in users list 
    5.userInfo.removeUser()=>remove user's div
    6.userInfo.updateUserDetails (user,iage,strpic,strCalledFrom)=>It updates user details    
*/
let userInfo = {};
userInfo.addUserToObj = function(user, strCalledFrom) {
  // add user to the javascript object
  try {
    if (typeof(company[site_id].users[user.user_id]) == 'object') {} else {
      company[site_id].user_count++;
    }
    company[site_id].users[user.user_id] = user;
    //console.log(company[site_id].user_count);
    company[site_id].users[user.user_id].audio = false;
    company[site_id].users[user.user_id].video = false;
    $("#dvUsercount").html("(" + company[site_id].user_count + ")");
  } catch (e) {
    console.log("Error Occured: user_info.js => " + "userInfo.addUserObject" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
userInfo.addUserToRoomObj = function(user, room_id, strCalledFrom) {
  //add user to room object
  try {
    if (typeof(company[site_id].rooms[room_id].users[user.user_id]) == 'object') {} else {
      company[site_id].rooms[room_id].users[user.user_id] = user;
      //let room_id = company[site_id].rooms[user.room_id].users[user.user_id].room_id;
      company[site_id].rooms[room_id].display = 1;
      company[site_id].rooms[room_id].user_count++;
      $("#dvRooms_room_" + room_id + "_userCount_" + room_id).html(company[site_id].rooms[room_id].user_count + "  ");
      userInfo.addUser(user, room_id, 'user_info.js=>addUserToRoomObj'); //to add user's div in user's list
      //to show room header of room in which user get added
      $("#dvRooms_room_" + room_id + "_dvRoomdetails").show();
      $("#dvRooms_room_" + room_id + "arrow_img").attr("src", "img/room_expansion_arrow.png");
      //             document.getElementById("dvRooms_room_" + room_id + "_nameCell").className = "roomTitle fontColorGreen";
      $("#dvRooms_room_" + room_id + "_nameCell").attr("class", "roomTitle fontColorGreen");
      company[site_id].rooms[room_id].users[user.user_id].room_id = room_id; //set room_id of user
    }
  } catch (e) {
    console.log("Error Occured: user_info.js => " + "userInfo.addUserToRoomObj" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
userInfo.removeUserObj = function(user_id, strCalledFrom) {
  //remove user-object from room, dock, users list 
  try {
    let room_id = company[site_id].users[user_id].room_id;
    if (user_id == current_user_id) {
      console.log("current user");
      alert("current user");
      return false;
    }
    delete company[site_id].rooms[room_id].users[user_id];
    company[site_id].rooms[room_id].user_count--;
    $("#dvRooms_room_" + room_id + "_userCount_" + room_id).html(company[site_id].rooms[room_id].user_count);
    roomInfo.updateRoomUserCount(company[site_id].users[user_id], company[site_id].rooms[room_id].user_count, 'user_info.js=>userInfo.removeUserObj');
    userInfo.removeUser(company[site_id].users[user_id]); //to remove user's div from room  
    if (dock.isUserInDock(user_id)) {
      dock.removeFromDock(company[site_id].users[user_id]);
    }
    profile.setProfileInfo(company[site_id].users[current_user_id], "user_info.js=>userInfo.removeUserObj"); // to set currentuser's details in focus area//some issue remaining
    delete company[site_id].users[user_id];
    company[site_id].user_count--;
    $("#dvUsercount").html("(" + company[site_id].user_count + ")");
  } catch (e) {
    console.log("Error Occured: user_info.js => " + "userInfo.removeUserObject" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
userInfo.addUser = function(obj, room_id, strCalledFrom) {
  //adding user-it adds user div in users list 
  try {
    let user_name = obj.user_name;
    let user_id = obj.user_id;
    // creates  <div> and <table> element 
    let dv = document.createElement("div");
    dv.id = "dvRooms_room_" + room_id + "_user_" + user_id;
    dv.className = "elementWidth roomBarHeight";
    let tbl = document.createElement("table");
    tbl.setAttributes({
      'border': '0',
      'cellpadding': '0',
      'cellspacing': '0',
      'width': '100%',
      'class': 'roomDescTable'
    });
    let row = document.createElement("tr");
    row.onclick = function(row, uid) {
      uid = obj.user_id;
      profile.setProfileInfo(company[site_id].users[uid], 'user_info.js=>user row');
    }
    row.className = "cursorStyle";
    let cell1 = document.createElement("td");
    cell1.colspan = "2";
    cell1.className = "roomUserOutCell";
    row.appendChild(cell1);
    let cell2 = document.createElement("td");
    cell2.colspan = "2";
    cell2.className = "roomUserOutCell chatheaderBorder";
    row.appendChild(cell2);
    let cell3 = document.createElement("td");
    cell3.className = "roomUserImgCell chatheaderBorder";
    let image = document.createElement("img");
    image.src = config.image_location + "user_images/pic-" + user_id + ".jpg";
    image.id = "dvRooms_room_" + room_id + "_user_" + user_id + "_profilePic";
    $("#dvRooms_room_" + room_id + "_user_" + user_id + "_profilePic").on('dragstart', function(event) {
      event.preventDefault();
    }); //to make image undragable
    image.className = "roomUserImgCellHeight roomUserImgCell";
    cell3.appendChild(image);
    row.appendChild(cell3);
    let cell4 = document.createElement("td");
    cell4.className = "roomUserName  fontFace headingFont roomUserNameCell";
    cell4.id = "dvRooms_room_" + room_id + "_user_" + user_id + "_userName";
    let dvUserName = document.createElement("div");
    dvUserName.id = "dvRooms_room_" + room_id + "_user_" + user_id + "_userName_Container";
    let spn = document.createElement("span");
    spn.className = "userNameMargin";
    let cellText = document.createTextNode(user_name);
    spn.appendChild(cellText);
    dvUserName.appendChild(spn);
    cell4.appendChild(dvUserName);
    row.appendChild(cell4);
    let cell5 = document.createElement("td");
    cell5.className = "roomUserName roomUserTimeInCell fontFace headingFont chatheaderBorder ";
    let sp = document.createElement("span");
    sp.className = "alignRightStyle";
    sp.id = "dvRooms_room_" + room_id + "_user_" + user_id + "_timeIn";
    let time = document.createTextNode("0:00");
    sp.appendChild(time);
    cell5.appendChild(sp);
    row.appendChild(cell5);
    tbl.appendChild(row);
    dv.appendChild(tbl);
    $(dv).insertAfter("#dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvHeader");
  } catch (e) {
    console.log("Error Occured: user_info.js => " + "userInfo.addUser" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
userInfo.removeUser = function(obj, strCalledFrom) {
  //remove user's div
  try {
    let user_id = obj.user_id;
    let room_id = obj.room_id;
    $("#dvRooms_room_" + room_id + "_user_" + user_id).remove();
  } catch (e) {
    console.log("Error Occured: user_info.js => " + "userInfo.removeUser" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
userInfo.updateUserDetails = function(user, iage, strpic, strCalledFrom) {
  //It updates user details
  try {
    if (typeof(user) == 'object') {
      console.log(user);
      user.age = iage;
      user.pic = strpic;
      console.log(user);
    }
  } catch (e) {
    console.log("Error Occured: user_info.js => " + "userInfo.updateUserDetails" + " and called from " + strCalledFrom);
    console.log(e);
  }
}