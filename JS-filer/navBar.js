"use strict";

let a = document.querySelector(".a");
let a2 = document.querySelector(".a2")
let body = document.querySelector("body")
let streck = document.querySelector(".tres")
let text = document.querySelector(".text-container")
streck.style.cursor = "pointer"
streck.addEventListener("click", function(){
    if (a.className == "a"){
    a.className = "b"
}
    else {
    a.className = "a";
}
if (a2.className == "a2"){
    a2.className = "b2"
}
    else {
    a2.className = "a2";
}
if (streck.className == "tres"){
    streck.className = "tres2"
}
    else {
    streck.className = "tres";
}

if (text.className == "text-container"){
    text.className = "text-container2"
}
    else {
    text.className = "text-container";
}
});