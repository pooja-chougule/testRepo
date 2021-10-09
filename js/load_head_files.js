"use strict";
/*
    Coder: POCH
    File: load_head_files.js
    Lines:248
    Date: 4-5-2018
    Purpose:It loads third party as well as local files in order.
    List of functions:
    1.loadThirdParty_files(strCalledFrom)=>load third party script files
    2.load_script_files(strCalledFrom)=>load all  loacal js files
    3.load_css_files(strCalledFrom)=>load css files in head
    
    */

let loadThirdParty_files = function(strCalledFrom) {
  //load third party script files
  try {
    arrTPScripts.push({
      hammer: "//cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"
    }); //[Third Party] hammer  

    arrTPScripts.push({
      jquery_hammer: " //cdn.jsdelivr.net/npm/jquery-hammerjs@2.0.0/jquery.hammer.js"
    }); //[Third Party] jquery_hammer

    //arrScripts.push("js/tp/socketcluster.js");    //[Third Party] SocketCluster
    //arrScripts.push("js/tp/sc-codec-min-bin.js");     //[Third Party] Minimal binary codec for SC based on MessagePack
    arrScripts.push("js/tp/jquery.mobile-1.4.5.min.js"); //[Third Party] jquery mobile
    //arrScripts.push("js/tp/jquery-1.11.1.min.js");//for mobile swipe
    //   arrTPScripts.push({
    //     cssplugin: base_location + "js/tp/CSSPlugin.min.js"
    //   }); //[Third Party] animation for swipe image
    //   arrTPScripts.push({
    //     easepack: base_location + "js/tp/EasePack.min.js"
    //   }); //[Third Party]
    //   arrTPScripts.push({
    //     tweenlite: base_location + "js/tp/TweenLite.min.js"
    //   }); //[Third Party]
    //   arrTPScripts.push({
    //     tweenmax: base_location + "js/tp/TweenMax.min.js"
    //   }); //[Third Party]
    arrTPScripts.push({
      draggable: base_location + "js/tp/Draggable.min.js"
    }); //[Third Party]

    if (head.browser.ie && head.browser.version < 9) {
      //     code specific to IE but only if IE < 9 
      alert("this version is <9");
    }
  } catch (e) {
    console.log("Error Occured: load_head_files.js => " + "loadThirdPartyFiles" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let load_script_files = function(strCalledFrom) {
  //load all  loacal js files
  try {
    start();
    head.load({
      config: base_location + "js/config.js?" + genRandomNumbers()
    });
    head.ready("config", function() {
      head.load({
        data_sample: base_location + "js/data_sample.js?" + genRandomNumbers()
      });
    });
    head.ready("data_sample", function() {
      head.load({
        common: base_location + "js/common.js?" + genRandomNumbers()
      });
    });
    head.ready("common", function() {
      head.load({
        global: base_location + "js/global.js?" + genRandomNumbers()
      });
    });
    head.ready("global", function() {
      head.load({
        signupform: base_location + "js/signupform.js?" + genRandomNumbers()
      });
    });
    //arrScripts.push("js/socketevents.js?"+ Math.random().toString().slice(2,11));     //[Inhouse] SocketCluster Events
    head.ready("signupform", function() {
      head.load({
        room: base_location + "js/room.js?" + genRandomNumbers()
      });
    });
    head.ready("room", function() {
      head.load({
        room_header: base_location + "js/room_header.js?" + genRandomNumbers()
      });
    });
    head.ready("room_header", function() {
      head.load({
        dock: base_location + "js/dock.js?" + genRandomNumbers()
      });
    });
    head.ready("dock", function() {
      head.load({
        profile: base_location + "js/profile.js?" + genRandomNumbers()
      });
    });
    head.ready("profile", function() {
      head.load({
        user_info: base_location + "js/user_info.js?" + genRandomNumbers()
      });
    });
    head.ready("user_info", function() {
      head.load({
        bot: base_location + "js/bot.js?" + genRandomNumbers()
      });
    });
    head.ready("bot", function() {
      head.load({
        ui: base_location + "js/ui.js?" + genRandomNumbers()
      });
    });


    head.ready("ui", function() {
      head.load({
        test_users: base_location + "js/test_users.js?" + genRandomNumbers()
      });
    });
    head.ready("test_users", function() {
      head.load({
        templates: base_location + "js/templates.js?" + genRandomNumbers()
      });
    });
    head.ready("templates", function() {
      head.load({
        messaging: base_location + "js/messaging.js?" + genRandomNumbers()
      });
    });
    head.ready("messaging", function() {
      head.load({
        test: base_location + "js/test.js?" + genRandomNumbers()
      });
    });

    head.ready("test", function() {
      head.load({
        header: base_location + "js/header.js?" + genRandomNumbers()
      });
    });

    head.ready("header", function() {
      head.load({
        resize: base_location + "js/resize.js?" + genRandomNumbers()
      });
    });
    //   head.ready("resize", function() {
    //     head.load({
    //       swipe: base_location + "js/swipe.js?" + genRandomNumbers()
    //     });
    //   });
    //   head.ready("swipe", function() {
    head.ready("resize", function() {
      head.load({
        load_templates: base_location + "js/load_templates.js?" + genRandomNumbers()
      });
    });
    head.ready("load_templates", function() {
      head.load({
        mobile_messageui: base_location + "js/mobile_messageui.js?" + genRandomNumbers()
      });
    });
    head.ready("mobile_messageui", function() {
      head.load({
        socket_events: "//mk.astute.ws/tubely/socketevents.js"
      });
    });
    head.ready("socket_events", function() {
      console.log("all script files loaded");
      end();
      console.log("time to load own script files");
      start();
      load_css_files("load_head_files.js=>head.ready('load_templates')");
      head.load(arrLinks);
      end();
      console.log("time to load css files");
      console.log("css files loaded");

      head.ready(function() {
        console.log("head ready" + Date());
        start();
        loadHTMLTemplatesInMemory('load_head_files.js');
        end();
        console.log("time to load templates in memory");
        console.log("loadHTMLTemplatesInMemory get called");
      });
    });
  } catch (e) {
    console.log("Error Occured: load_head_files.js => " + "load_script_files" + " and called from " + strCalledFrom);
    console.log(e);
  }
}
let load_css_files = function(strCalledFrom) {
  try {
    //load css files in head
    //     arrLinks.push({
    //         bootstrap_css: "//netdna.bootstrapcdn.com/bootstrap/3.1.0/css/bootstrap.min.css"
    //     });//[Third Party] bootstrap_css
    //     arrLinks.push({
    //         font_awesome: "//formden.com/static/cdn/font-awesome/4.4.0/css/font-awesome.min.css"
    //     });//[Third Party] font_awesome css
    arrLinks.push({
      signup: base_location + "css/signup.css?" + genRandomNumbers()

    })
    arrLinks.push({
      chatroom: base_location + "css/chatroom.css?" + genRandomNumbers()
    }); //[Inhouse] css for chat_rooms.html and room.js
    arrLinks.push({
      chat_window: base_location + "css/chat_window.css?" + genRandomNumbers()
    }); //[Inhouse] css for chat_window.html
    arrLinks.push({
      dock: base_location + "css/dock.css?" + genRandomNumbers()
    }); //[Inhouse] css for dock.js
    arrLinks.push({
      index: base_location + "css/index.css?" + genRandomNumbers()
    }); //[Inhouse] css for chat.html
    arrLinks.push({
      main: base_location + "css/main.css?" + genRandomNumbers()
    }); //[Inhouse] css for template.html and tab_template.html
    arrLinks.push({
      me: base_location + "css/me.css?" + genRandomNumbers()
    }); //  [Inhouse] css for me.html
    arrLinks.push({
      user_details: base_location + "css/user_details.css?" + genRandomNumbers()
    }); //  [Inhouse] css for user_details.html
    arrLinks.push({
      chat_message: base_location + "css/chat_message.css?" + genRandomNumbers()
    }); //  [Inhouse] css for chat_message_template.html
    arrLinks.push({
      conversation: base_location + "css/conversation.css?" + genRandomNumbers()
    }); //[Inhouse]css for conversation.html
    arrLinks.push({
      im: base_location + "css/im.css?" + genRandomNumbers()
    }); //[Inhouse]css for convesation.html and conversation_message.html
    arrLinks.push({
      message: base_location + "css/message.css?" + genRandomNumbers()
    }); //[Inhouse]css for message.html 
    arrLinks.push({
      conversation_list: base_location + "css/conversation_list.css?" + genRandomNumbers()
    }); //[Inhouse]css for convo_list_item_demo.html 
    arrLinks.push({
      common: base_location + "css/common.css?" + genRandomNumbers()
    }); //[Inhouse]css for common css 
    //   arrLinks.push({
    //     swipe: base_location + "css/swipe.css?" + genRandomNumbers()
    //   }); //[Inhouse]css for swipe.html
    arrLinks.push({
      mobile_chat: base_location + "css/mobile_chat.css?" + genRandomNumbers()
    }); //[Inhouse]css 
  } catch (e) {
    console.log("Error Occured: load_head_files.js => " + "load_css_files" + " and called from " + strCalledFrom);
    console.log(e);
  }
}