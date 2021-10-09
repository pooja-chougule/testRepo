"use strict";
/*
    Coder: POCH
    File: room.js
    Lines: 190
    Date: 21-12-2017
    Purpose:It includes all functions related to adding a new room. 
    file linked: template.html,chat_rooms.html
    List of functions used:
    1.roomInfo.addRoom(obj, strCalledFrom)=>It appends room div in rooms list
    2.roomInfo.addRoomObj(room, strCalledFrom)=>It adds room to the javascript object
    3.roomInfo.updateRoomUserCount(user,iCount,strCalledFrom)=>It sets user-count label of room to user or users depending upon no. of users of that room
    4.roomInfo.joinRoom(room_id, strCalledFrom)=>user will join a new room and get removed from previous room
    5.roomInfo.toggleJoinRoomLabel(room_id,strText,strCalledFrom)=>change join tab of room to leave and vise versa
    6.roomInfo.updateTimeSpentInRoom(strCalledFrom)=>updates the time spent for each user
*/
let roomInfo = {};
roomInfo.addRoom = function(obj, strCalledFrom) {
  //add rooms-it appends room div in rooms list
  try {
    let room_name = obj.room_name;
    let room_id = obj.room_id;
    let dv = document.createElement("div");
    dv.setAttributes({
      "id": "dvRooms_room_" + room_id,
      "class": "roomsMainDivWidth boxBorder"
    });
    let roomdv = document.createElement("div"); //creates <div>
    roomdv.setAttributes({
      "id": "dvRooms_room_" + room_id + "_tab",
      "class": "room roomBarHeight elementWidth "
    });
    let roomtbl = document.createElement("table"); //creates <table>
    roomtbl.setAttributes({
      "border": "0",
      "cellpadding": "0",
      "cellspacing": "0",
      "width": "100%"
    });
    let roomrow = document.createElement("tr"); //creates <tr>
    let row = new Hammer(roomrow);
    // listen to events...
    row.on("tap", function(ev) {
      roomHeader.toggle(company[site_id].rooms[room_id].room_id, 'room.js=>roomrow');
    });
    roomrow.className = "cursorStyle";
    let roomcell1 = document.createElement("td"); //1st <td>
    roomcell1.className = "roomExpandArrow ";
    let roomarrow = document.createElement("span");
    roomarrow.setAttributes({
      'id': "dvRooms_room_" + room_id + "_arrow",
    });
    let img = document.createElement("img");
    img.setAttributes({
      'id': "dvRooms_room_" + room_id + "arrow_img",
      'src': "img/room_arrow.png"
    });
    roomarrow.appendChild(img);
    roomcell1.appendChild(roomarrow);
    roomrow.appendChild(roomcell1);
    let roomcell2 = document.createElement("td"); //2nd <td>
    roomcell2.setAttributes({
      'id': "dvRooms_room_" + room_id + "_nameCell",
      'class': "roomTitle titleFont"
    });
    let roomspan = document.createElement("span");
    roomspan.setAttributes({
      'id': "dvRooms_room_" + room_id + "_name",
      'class': "fontFace"
    });
    let roomcellText = document.createTextNode("" + room_name);
    roomspan.appendChild(roomcellText);
    roomcell2.appendChild(roomspan);
    roomrow.appendChild(roomcell2);
    let roomcell3 = document.createElement("td") //3rd<td>
    roomcell3.className = "roomUserCount fontFace headingFont";
    let roomspan1 = document.createElement("span");
    roomspan1.setAttributes({
      'id': "dvRooms_room_" + room_id + "_userCount_" + room_id,
    });
    let roomcellText2 = document.createTextNode("0 ");
    roomspan1.appendChild(roomcellText2);
    roomcell3.appendChild(roomspan1);
    // let space=document.createTextNode(&nbsp&nbsp);
    // roomcell3.appendChild(space);
    let roomspan2 = document.createElement("span");
    roomspan2.setAttributes({
      'id': "dvRooms_room_" + room_id + "_userCountLabel_" + room_id,
      "data-i18n": "USER_48"
    });
    let roomcellText3 = document.createTextNode("    #user#");
    roomspan2.appendChild(roomcellText3);
    roomcell3.appendChild(roomspan2);
    roomrow.appendChild(roomcell3); //append <td> to <tr>
    roomtbl.appendChild(roomrow); //appends<tr> to <table>
    roomdv.appendChild(roomtbl); //appends <table> to <div>
    dv.appendChild(roomdv);
    //$("#dvRooms_container").append(dv);
    $(objGlobal.roomListBoxPath).append(dv);
  } catch (e) {
    console.log("Error Occured: room.js => " + "roomInfo.addRoom" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
roomInfo.addRoomObj = function(room, strCalledFrom) {
  //It adds room to the javascript object
  try {
    if (typeof(company[site_id].rooms[room.room_id]) == 'object') {} else {
      company[site_id].room_count++; //increment room count
      company[site_id].rooms[room.room_id] = {
        'room_id': room.room_id,
        'room_name': room.room_name,
        'room_desc': room.room_desc,
        'users': {},
        'user_count': 0,
        'display': 0,
        'description': ''
      };
      $(objGlobal.roomListHeaderPath).find("#dvRooms_roomcount").html("(" + company[site_id].room_count + ")"); //sets the rooms count in the header of the room list
      roomInfo.addRoom(room, 'room.js=>roomInfo.addRoomObj');
      roomHeader.create(room, 'room.js=>roomInfo.addRoomObj'); //creates room header
    }
  } catch (e) {
    console.log("Error Occured: room.js => " + "roomInfo.addRoomObj" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
roomInfo.updateRoomUserCount = function(user, iCount, strCalledFrom) {
  //It sets user-count label of room to user or users depending upon no. of users of that room
  //updateRoomUserCount
  try {
    let roomId, tmpElementName1;
    roomId = user.room_id;
    tmpElementName1 = "#dvRooms_room_" + roomId + "_userCountLabel_" + roomId;
    if (iCount > 1) {
      $(tmpElementName1).html("     #users#");
    } else {
      $(tmpElementName1).html("     #user#");
    }
  } catch (e) {
    console.log("Error Occured: room.js => " + "roomInfo.updateRoomUserCount" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
roomInfo.joinRoom = function(user_id, room_id, strCalledFrom) {
  // user will join a new room and get removed from previous room
  try {
    let old_room_id = company[site_id].users[user_id].room_id;
    if (user_id == current_user_id) {
      //its the logged in user
      if ((room_id == default_room_id) && room_id == old_room_id) {
        alert("#You are in the default room#. \n #You can jump to any other room#");
        return false;
      }
      $(objGlobal.chatWindowContainer).find("#dvchatHistory_msgs_box").html(''); // to make chatBox empty as user enters in new room
    } else {
      // console.log("other user is jumping room");
      //other users
    }
    //common code begin
    delete company[site_id].rooms[old_room_id].users[user_id]; // remove user object from old room
    $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + old_room_id + "_user_" + user_id).remove(); // removed from old room
    company[site_id].rooms[old_room_id].user_count--; // decrease usercount of old room 
    $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + old_room_id + "_userCount_" + old_room_id).html(company[site_id].rooms[old_room_id].user_count + " "); // change  usercount of old room
    roomInfo.updateRoomUserCount(company[site_id].users[user_id], company[site_id].rooms[old_room_id].user_count, 'room.js=>roomInfo.joinRoom');
    roomInfo.toggleJoinRoomLabel(old_room_id, '#Join#', 'room.js=>roomInfo.joinRoom'); // to change leave to join 
    $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + old_room_id + "_dvRoomdetails" + "_dvDesc" + "_joinRoomTxt").attr("jumpstatus", "join");
    company[site_id].users[user_id].room_id = room_id; //set room id 
    company[site_id].users[user_id].room_entry_time = Date(); //set entry time of user in room
    userInfo.addUserToRoomObj(company[site_id].users[user_id], room_id, 'room.js=>roomInfo.joinRoom '); //add user to new room
    roomInfo.updateRoomUserCount(company[site_id].users[user_id], company[site_id].rooms[room_id].user_count, 'room.js=>roomInfo.joinRoom'); //to change user count label of room from user to users and vice versa
    roomInfo.toggleJoinRoomLabel(room_id, '#Leave#', 'room.js=>roomInfo.joinRoom');
    $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDesc" + "_joinRoomTxt").attr("jumpstatus", "leave");
    $(objGlobal.chatWindowContainer).find("#spCurrentChatRoomName").html(company[site_id].rooms[company[site_id].users[user_id].room_id].room_name);
    company[site_id].users[user_id].old_room_id = old_room_id; //set  old_room id
    $(objGlobal.typeSpaceContainer).find("#txtChat").focus(); // to set focus in text box of the chat window
    $(objGlobal.typeSpaceContainer).find("#txtChat").val(""); // to set clear text box of the chat window
    return false;
  } catch (e) {
    console.log("Error Occured: room.js => " + "roomInfo.joinRoom" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
roomInfo.toggleJoinRoomLabel = function(room_id, strText, strCalledFrom) {
  // change join tab of room to leave and vice versa 
  try {
    $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDesc" + "_joinRoomTxt").html(strText);
  } catch (e) {
    console.log("Error Occured: room.js => " + "roomInfo.toggleJoinRoomLabel" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
roomInfo.updateTimeSpentInRoom = function(strCalledFrom) {
  //updates the time spent for each user
  let dtNow = Date();
  for (let i = 0; i < Object.keys(company[site_id].users).length; i++) {
    let user_id = Object.keys(company[site_id].users)[i];
    let room_id = company[site_id].users[user_id].room_id;
    let entry_time = company[site_id].users[user_id].room_entry_time;
    let time_diff = common.get_time_difference(entry_time, Date());
    let hours = common.pad(time_diff.hours, 2);
    let minutes = common.pad(time_diff.minutes, 2);
    $(objGlobal.chatroomsContainer).find("#dvRooms_room_" + room_id + "_user_" + user_id + "_timeIn").html(hours + ":" + minutes);
  }
}
setInterval(roomInfo.updateTimeSpentInRoom, 60000); //update user time in room every minute