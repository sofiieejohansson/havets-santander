"use strict";

let navBar = document.querySelector(".navbar-container-closed");
let picture = document.querySelector(".picture-hidden")
let body = document.querySelector("body")
let line = document.querySelector(".hamburger-menu-closed")
let text = document.querySelector(".text-container-hidden")
line.style.cursor = "pointer"
line.addEventListener("click", function(){
    if (navBar.className == "navbar-container-closed"){
    navBar.className = "navbar-container-opened"
}
    else {
    navBar.className = "navbar-container-closed";
}
if (picture.className == "picture-hidden"){
    picture.className = "picture-visible"
}
    else {
    picture.className = "picture-hidden";
}
if (line.className == "hamburger-menu-closed"){
    line.className = "hamburger-menu-opened"
}
    else {
    line.className = "hamburger-menu-closed";
}

if (text.className == "text-container-visible"){
    text.className = "text-container-hidden"
}
    else {
    text.className = "text-container-visible";
}
});