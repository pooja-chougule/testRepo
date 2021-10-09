"use strict";
/*
    Coder: POCH
    File: socketevents.js
    Lines: 101
    Date: 14-12-2017
    Purpose:It includes all functions related to socket events- it connects to server and receive and send message from server 
    file linked: template.html
    List of functions:
    1.sendMessage(strCalledFrom)=>sends message and publish message to lobby
   
    
*/
//let username="pooja";
let username = common.getParameterByName("username", null, "common.js=>getParameterByName");
if (!username) {
    username = prompt("Enter a username", "pooja");
}
let options = {
    port: config.socket_server.port,
    hostname: config.socket_server.hostname,
    autoConnect: config.socket_server.autoConnect
};
let socket;
// socket connect to the server
socket = socketCluster.connect(options, function() {
    console.log("yhooooo");
});
socket.on('connect', function(s) {
    console.log(s); //it prints {id: "W9PRBLRyVJ7mjLz_AAAE", pingTimeout: 20000, isAuthenticated: false, authToken: null}
    console.log('CONNECTED - LETS DO A HANDSHAKE');
});
socket.on('subscribe', function(channelname) {
    //When the subscription suceeds
    console.log("subscribed to channel:" + channelname);
});
socket.on('subscribeFail', function(channelname) {
    //When the subscription fails
    console.log('subscribeFail:' + channelname);
});
socket.on('unsubscribe', function(channelname) {
    //to unsubscribe
    console.log('unsubscribe:' + channelname);
});
socket.on('subscribeStateChange', function(data) {
    //when subscription State Change
    console.log('subscribeStateChange:' + JSON.stringify(data));
});
socket.on('message', function(data) {
    //publish meassage and append it in chatwindow
    if (data == "#1") {
        return false;
    }
    let obj = JSON.parse(data);
    if (obj.hasOwnProperty("event")) //checking for publish event
    {
        console.log("checking for publish");
        if (obj.event == "#publish") {
            console.log("caught publish event");
            let payload = obj.data.data.payload;
            let msg = obj.data.data.payload.msg;
            let username = obj.data.data.payload.username;
            console.log(payload);
            if (payload.username == "rutu") {
                let strClass = "defaultUserChat chatRed";
                console.log('font changed');
            } else {
                strClass = "defaultUserChat";
            }
            let msg = "<div id='chatHistory_room_9_user_1_999999' style='margin-top:5px;height:40px;'><span class='messageBoxUserName fontFace'>" + payload.username + "</span>:<span id='msg' class='" + strClass + " chatMsgBoxborder' >" + payload.msg + "</span></div>"
            //999999 is the number which represents timestamp.
            //appending
            $("#dvchatHistory_msgs_box").append(msg);
            $("#dvchatHistory_msgs_box").animate({
                scrollTop: $('#dvchatHistory_msgs_box')[0].scrollHeight - $('#dvchatHistory_msgs_box')[0].clientHeight
            }, 1000); //scroll div to bottom
            $("#txtChat").val('');
            $("#txtChat").focus(); //to get cursor in text box
            console.log('message aaya:');
        }
    }
    return false;
});
//when message appends in chatwindow it will return this
let lobby = socket.subscribe('lobby');
lobby.watch(function(data) {
    console.log("lobby got a message");
});

function sendMessage(strCalledFrom) {
    //sends message
    let payload = {};
    payload.msg = $("#txtChat").val();
    payload.username = username;
    let data = {};
    data.event = 'message';
    data.payload = payload;
    socket.publish('lobby', data, function(err, ackData) {
        console.log(err);
        console.log(ackData);
    });
    console.log("tried to publish to lobby");
}