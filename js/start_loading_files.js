"use strict";
/*
    Coder: POCH
    File: start_loading_files.js
    Lines: 46
    Date: 11-5-2018
    Purpose:it starts loading  files using start_loadFiles()
    List of functions:
    1.start_loadFiles(strCalledFrom)=>start loading files
    2.translate(strCalledFrom))=>It loads dictionary to the i18n and translates text
    3.genRandomNumbers()=>generate random number
    
    */
// let platform;
let objGlobal = {};

let genRandomNumbers = function() { // generate random number
  return Math.random().toString().slice(2, 11);
  // return 4;
}
let start_loadFiles = function(strCalledFrom) {
  // start loading files
  if (head.browser.name === "safari" && head.desktop) {

    head.load({
      jquery: "js/tp/jquery-2.2.4.min.js"
    });
  } else {

    head.load({
      jquery: "js/tp/jquery-3.3.1.min.js"
    });
  }


  head.ready("jquery", function() {
    // execute this function, only when label1 has finished loading

    head.load([{
      label1: "js/tp/jquery.i18n.js"
    }, {
      label2: "js/tp/jquery.i18n.messagestore.js"
    }, {
      label3: "js/i8n.js"
    }], function() {
      $.when(translate('template.html=>head.load(jquery.i18n)')).then(function() {
        $("#spPleaseWait").show();
        head.load({
          mobile_global: "js/mobile_global.js?" + genRandomNumbers()
        });
      });
    });
  });

  head.ready("mobile_global", function() {

    head.load({
      head_files: "js/load_head_files.js?" + genRandomNumbers()
    });
  });

  head.ready("head_files", function() {
    start();
    loadThirdParty_files("head.ready('head_files')");
    head.load(arrTPScripts, function() {
      end();
      console.log("this is the time to load third party files");
      console.log("third party files loaded");

      load_script_files("head.ready('head_files')");

    });

  });
}

let translate = function(strCalledFrom) {
  // It loads dictionary to the i18n and translates text
  $.i18n().locale = 'hi';
  $.i18n().load(i8);
  $('body').i18n(); //can be any elem
}

let onBackKeyDown = function(strCalledFrom) {

  // to get back  button working
  alert("get back");
  console.log("onBackKeyDown get called");
  if (usersList == true) {
    // exit from app
    exitFromApp('start_loading_files.js=>onBackKeyDown');
  } else {
    //show users list
    showTabWindow("dvConversationListUsers", 'start_loading_files.js=>onBackKeyDown');
  }


  console.log("changes showing");
}

let exitFromApp = function(strCalledFrom) {
  // to exit from app
  navigator.app.exitApp();
}
console.log("start_loading_files.js  get loaded ");