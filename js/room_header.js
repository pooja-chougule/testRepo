"use strict";
/*
    Coder: POCH
    File: room_header.js
    Lines: 239
    Date: 21-12-2017
    Purpose:function for creating header for rooms and showing description of room. 
    file linked: template.html
    List of functions:
    1.roomHeader.create(room,strCalledFrom)=>creates header for rooms
    2.roomHeader.createDescription(room, strCalledFrom)=> shows  Description of room by clicking on room_name
    3.roomHeader.toggle(room_id, strCalledFrom)=>to toggle room_header div
    4.roomHeader.toggleDescription(room_id, strCalledFrom)=>to toggle description div
*/
let roomHeader = {};
roomHeader.create = function(room, strCalledFrom) {
  // creates header for rooms 
  try {
    let room_id = room.room_id;
    //code for adding description, leave/join section in room 
    //it creates a parent div of dvDesc and dvHeader
    let elemRoomDetailsDiv = document.createElement("div");
    elemRoomDetailsDiv.setAttributes({
      "id": "dvRooms_room_" + room_id + "_dvRoomdetails",
      "class": "roomheader  elementHeight elementWidth"
    });
    let roomBox = $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + room_id);
    $(roomBox).append(elemRoomDetailsDiv);
    let elemDescDiv = document.createElement("div");
    elemDescDiv.setAttributes({
      "id": "dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDesc",
      "class": "elementWidth roomBarHeight"
    });
    let elemDescTbl = document.createElement("table");
    elemDescTbl.setAttributes({
      "border": "1",
      "cellpadding": "0",
      "cellspacing": "0",
      "class": "roomDescTable",
      "width": "100%",
      "height": "100%"
    });
    let elemDescRow = document.createElement("tr");
    let elemDescTd = document.createElement("td");
    elemDescTd.setAttributes({
      "align": "center",
      "class": "roomDesc fontFace room_desc_tab cursorStyle headingFont"
    });
    let descTd = new Hammer(elemDescTd);
    // listen to events...
    descTd.on("tap", function(ev) {
      roomHeader.toggleDescription(company[site_id].rooms[room_id].room_id, 'room_header.js=>roomHeader.showDescription');
    });
    let elemDescSp = document.createElement("span");
    elemDescSp.setAttributes({
      "id": "dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDesc_arrow",
      "class": "descArrowSpan elementHeight"
    });
    let arrow_img = document.createElement("img");
    arrow_img.setAttributes({
      "id": "dvRooms_room_" + room_id + "_desc_arrow_img",
      "src": "img/desc_arrow.png"
    });
    let elemSp = document.createElement("span");
    elemSp.setAttributes({
      "data-i18n": "DESCRIPTION_49"
    });
    let sDesctxt = document.createTextNode("         #Description#");
    sDesctxt.className = "roomDesc headingFont fontFace";
    //$(elemSp).attr("data-i18n","DESCRIPTION_49");
    elemSp.appendChild(sDesctxt);
    elemDescSp.appendChild(arrow_img);
    elemDescTd.appendChild(elemDescSp);
    elemDescTd.appendChild(elemSp);
    elemDescRow.appendChild(elemDescTd);
    //code for join starts here
    let elemJoinTd = document.createElement("td");
    elemJoinTd.setAttributes({
      "align": "center",
      "class": "roomDesc  fontFace headingFont"
    });
    let elemJoinSp = document.createElement("span");
    elemJoinSp.setAttributes({
      "id": "dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDesc" + "_joinRoomTxt",
      "roomid": room_id,
      "class": "cursorStyle",
      "jumpstatus": "join",
      "data-i18n": "JOIN_50"
    });
    let sJoinTxt = document.createTextNode("#Join#");
    elemJoinSp.appendChild(sJoinTxt);
    elemJoinTd.appendChild(elemJoinSp);
    setTimeout(function() {
      $(roomBox).find("#dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDesc" + "_joinRoomTxt").hammer().on("tap", function($event) {
        // event.preventDefault(); 
        let roomId = event.srcElement.attributes['roomid'].value;
        let jumpstatus = event.srcElement.attributes['jumpstatus'].value;
        if (jumpstatus == "join") {
          roomInfo.joinRoom(current_user_id, roomId, 'room_header.js=>joinTab');
        } else {
          roomInfo.joinRoom(current_user_id, default_room_id, 'room.js=>leaveTab');
        }
      });
    });
    elemDescRow.appendChild(elemJoinTd);
    elemDescTbl.appendChild(elemDescRow);
    elemDescDiv.appendChild(elemDescTbl);
    $(elemRoomDetailsDiv).append(elemDescDiv);
    // code for addind Out ,Me,Name section in users area of room starts here
    let elemHeaderDiv = document.createElement("div");
    elemHeaderDiv.setAttributes({
      "id": "dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvHeader",
      "class": "roomheader roomBarHeight elementWidth"
    });
    let elemHeadTbl = document.createElement("table");
    elemHeadTbl.setAttributes({
      "border": "1",
      "cellpadding": "0",
      "cellspacing": "0",
      "class": "roomDescTable",
      "width": "100%",
      "height": "100%"
    });
    let elemHeadTr = document.createElement("tr");
    let elemHeadTd1 = document.createElement("td");
    elemHeadTd1.setAttributes({
      "colspan": "2",
      "class": "userStatusHeader fontFace roomUserOutCell roomBarHeight headingFont"
    });
    let elemHeadSp = document.createElement("span");
    elemHeadSp.setAttributes({
      "data-i18n": "OUT_51"
    });
    let sHeadTxt1 = document.createTextNode("#OUT#");
    elemHeadSp.appendChild(sHeadTxt1);
    elemHeadTd1.appendChild(elemHeadSp);
    elemHeadTr.appendChild(elemHeadTd1);
    let elemHeadTd2 = document.createElement("td");
    elemHeadTd2.setAttributes({
      "colspan": "2",
      "class": "userStatusHeader fontFace roomUserOutCell roomBarHeight headingFont"
    });
    let elemHeadSp2 = document.createElement("span");
    elemHeadSp2.setAttributes({
      "data-i18n": "ME_52"
    });
    let sHeadTxt2 = document.createTextNode("#ME#");
    elemHeadSp2.appendChild(sHeadTxt2);
    elemHeadTd2.appendChild(elemHeadSp2);
    elemHeadTr.appendChild(elemHeadTd2);
    let elemHeadTd3 = document.createElement("td");
    elemHeadTd3.setAttributes({
      "colspan": "2",
      "class": "userStatusHeader userStatusHeaderName fontFace roomBarHeight headingFont"
    });
    let elemHeadSp3 = document.createElement("span");
    elemHeadSp3.setAttributes({
      "data-i18n": "NAME_53"
    });
    let sHeadtxt3 = document.createTextNode("#NAME#");
    elemHeadSp3.appendChild(sHeadtxt3);
    elemHeadTd3.appendChild(elemHeadSp3);
    elemHeadTr.appendChild(elemHeadTd3);
    let elemHeadTd4 = document.createElement("td");
    elemHeadTd4.setAttributes({
      "colspan": "2",
      "class": "userStatusHeader userStatusHeaderTime roomUserTimeInCell fontFace roomBarHeight headingFont nowrap"
    });
    let elemHeadSp4 = document.createElement("span");
    let sHeadTxt4 = document.createTextNode("#TIME IN#");
    elemHeadSp4.appendChild(sHeadTxt4);
    elemHeadSp4.setAttributes({
      "data-i18n": "TIME_IN_54"
    });
    elemHeadTd4.appendChild(elemHeadSp4);
    elemHeadTr.appendChild(elemHeadTd4);
    elemHeadTbl.appendChild(elemHeadTr);
    elemHeaderDiv.appendChild(elemHeadTbl);
    $(elemRoomDetailsDiv).append(elemHeaderDiv);
    //it makes dvRoomdetails Div hidden
    $(roomBox).find("#dvRooms_room_" + room_id + "_dvRoomdetails").hide();
    company[site_id].rooms[room_id].display = 0;
    roomHeader.createDescription(room, "room_header.js=>roomHeader.create");
  } catch (e) {
    console.log("Error Occured: room_header.js => " + "roomHeader.create" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
roomHeader.createDescription = function(room, strCalledFrom) {
  //It creates description   
  try {
    let room_id, room_desc;
    room_id = room.room_id;
    room_desc = room.room_desc;
    let elemDv = document.createElement("div");
    elemDv.setAttributes({
      "id": "dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDisplayDesc",
      "class": "userStatusHeader borderThinStyle roomDescStyle headingFont roomBarHeight fontFace",
      // "data-i18n":"RULES_55"
    });
    let sText = document.createTextNode("#Rules#:" + room_desc);
    elemDv.appendChild(sText);
    let roomBoxPath = $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + room_id);
    $(elemDv).insertAfter("#dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDesc");
    //it hides the description div
    $(roomBoxPath).find("#dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDisplayDesc").hide();
    company[site_id].rooms[room_id].description = 0;
  } catch (e) {
    console.log("Error Occured: room_header.js => " + "roomHeader.createDescription" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
roomHeader.toggle = function(room_id, strCalledFrom) {
  //to toggle room_header div
  try {
    let roomBox = $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + room_id);
    if (company[site_id].rooms[room_id].display == 0) {
      //it makes room_header visible
      $(roomBox).find("#dvRooms_room_" + room_id + "_dvRoomdetails").show();
      $(roomBox).find("#dvRooms_room_" + room_id + "arrow_img").attr("src", "img/room_expansion_arrow.png");
      company[site_id].rooms[room_id].display = 1;
      document.getElementById("dvRooms_room_" + room_id + "_nameCell").className = "roomTitle fontColorGreen";
    } else {
      //it makes room_header hidden
      $(roomBox).find("#dvRooms_room_" + room_id + "_dvRoomdetails").hide();
      $(roomBox).find("#dvRooms_room_" + room_id + "arrow_img").attr("src", "img/room_arrow.png");
      company[site_id].rooms[room_id].display = 0;
      document.getElementById("dvRooms_room_" + room_id + "_nameCell").className = "roomTitle titleFont";
    }
  } catch (e) {
    console.log("Error Occured: room_header.js => " + "roomHeader.toggle" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
roomHeader.toggleDescription = function(room_id, strCalledFrom) {
  //to toggle description div
  try {
    let roomBox = $(objGlobal.roomListBoxPath).find("#dvRooms_room_" + room_id);
    if (company[site_id].rooms[room_id].description == 0) {
      //it makes room_Description visible
      $(roomBox).find("#dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDisplayDesc").show();
      $(roomBox).find("#dvRooms_room_" + room_id + "_desc_arrow_img").attr("src", "img/desc_expansion_arrow.png");
      company[site_id].rooms[room_id].description = 1;
    } else {
      //it makes room_Description hidden
      $(roomBox).find("#dvRooms_room_" + room_id + "_dvRoomdetails" + "_dvDisplayDesc").hide();
      $(roomBox).find("#dvRooms_room_" + room_id + "_desc_arrow_img").attr("src", "img/desc_arrow.png");
      company[site_id].rooms[room_id].description = 0;
    }
  } catch (e) {
    console.log("Error Occured: room_header.js => " + "roomHeader.toggleDescription" + " and called from " + strCalledFrom);
    console.log(e);
  }
}