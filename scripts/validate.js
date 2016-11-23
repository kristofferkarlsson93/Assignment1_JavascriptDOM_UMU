/*
Kristoffer Karlsson krka0050
JavaScript DOM 2016-11-22.
*/

"use strict";
window.onload = function() {
  var form = document.getElementsByTagName("form")[0];
  form.onsubmit = validate;
}


function validate() {
  //Validates the input according to the specifications in the assignment.
  if(isEmptyField()) {
    return false;
  }else {
    if(notCorrectEmail()){
      return false;
    }
    if(!(notSet("field_message"))) {  //If field_message is set.
      if(toLongMessage()) {
        return false;
      }
    }
    if(lectureOrSeminar()) {
      if(notSetSubject()) {
        return false;
      }
    }
  }return true;
}


function isEmptyField() {
  //If a required field is empty the function set error messeges and
  //returns true.
  var result = false;
  var errorMessage = "Obligatoriskt fält";
  var fields = ["field_firstname", "field_lastname", "field_organisation",
  "field_email"];
  for(var i = 0; i < fields.length; i++) {
    if(notSet(fields[i])) {
      setError(fields[i], errorMessage);
      result = true;
    }
  }
  return result
}


function notSet(objectName) {
  //Checks if a fiels is empty.
  var object = document.getElementById(objectName).value;
  if (object.length == 0) {
    return true;
  }return false;
}


function setError(objectName, errorMessage = "Ogiltigt") {
  //Indikates an error to the user.
  var color = "#ffb3b3";
  var field = document.getElementById(objectName);
  field.placeholder = errorMessage;
  field.style.background = color;
}


function notCorrectEmail() {
  //Checks if the email is in correct format.
  var email = document.getElementById("field_email").value;
  var errorMessage = "Ej giltig email";
  var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
  var isValid = pattern.test(email);
  if(isValid) {
    return false;
  }else {
    setError("field_email");
    alert(errorMessage);
    return true;
  }
}


function toLongMessage() {
  //Checks if the message is not to long.
  var message = document.getElementById("field_message").value;
  if (message.length <= 200) {
    return false;
  }else {
    setError("field_message");
    alert("För långt meddelande. Max 200 tecken");
    return true;
  }
}


function lectureOrSeminar() {
  //Checks if the user tries to assign to a lecture or seminar.
  var lecture = document.getElementById("pres_type_1").checked;
  var seminar = document.getElementById("pres_type_2").checked;
  if(lecture || seminar) {
    return true;
  }return false;
}


function notSetSubject() {
  //Checks if the dubject is set.
  var errorMessage = "Ange titel";
  if(notSet("field_pres_title")) {
    setError("field_pres_title", errorMessage);
    return true;
  }return false;
}
