"use strict";
/*
    Coder: POCH
    File: signupform.js
    Lines: 36
    Date: 10-11-2018
    Purpose: signup form validations and other signup form functionalities
    file linked: signup.html
    List of functions:
    1.validatePassword(strCalledFrom)=>checks if password and confirm password values are same or not
    2.postSignupValues(strCalledFrom)=>It takes all values of signup form from signup.html
*/
let password, confirmPassword;
let validatePassword = function(strCalledFrom) {
  //checks if password and confirm password values are same or not
  try {

    if (password.value != confirmPassword.value) {
      confirmPassword.setCustomValidity("Passwords Don't Match");
    } else {
      confirmPassword.setCustomValidity('');
    }
  } catch (e) {
    console.log("Error Occured: signupform.js => " + "validatePassword" + " and called from " + strCalledFrom);
    console.log(e);
  }
}

let postSignupValues = function(strCalledFrom) {
  //It takes all values of signup form from signup.html
  try {
    let objUser = {};
    objUser.firstname = $("#txtFirstName").val();
    objUser.lastname = $("#txtLastName").val();
    objUser.email = $("#txtEmail").val();
    objUser.password = $("#txtPassWord").val();
    objUser.confirmPassword = $("#txtConfirmPassword").val();
    objUser.gender = $("input[name='gender']:checked").val();
    objUser.dob = $("#dtBirthDate").val();
    console.log(objUser);
    toggle_containers(1, 'load_templates.js=>loadParentContainers');
    return false;
  } catch (e) {
    console.log("Error Occured: signupform.js => " + "postSignupValues" + " and called from " + strCalledFrom);
    console.log(e);
  }
}