"use strict"
function renderCitiesPopup (cityName) {

    for(let i= 0; i < CITIES.length; i++ ) {
       let city = CITIES[i]
       
        if (city.name == cityName) {
            
           document.querySelector(`.container-top-destinations`).innerHTML += `
           <div class="destination-popup">
           <div class="close"></div>
     
           <div class="city-picture-popup" style="background-image:url(Images/${city.imagesBig[0]});">
            </div>
     
           <div class="div-container">
             <div class="left-container">
               <h2 class="popup-h2">${city.name}</h2>
               <div class="city-popup-text">${city.text}</div>
               <button class="left-button"><</button>
               <button class="right-button">></button>
               <div class="popup-comments">js fil comments</div>
             </div>
     
             <div class="right-container">

             <div class="sun-days">
             <p>Sunny days per year:</p>
             ${city.sun}
             </div>
               
               
               <div type="button" class="programs-in-city">View programs in ${city.name}<p class="arrow-city">></p></div>
             </div>
           </div>
         </div>
         <div class="background-white"></div>`
         popupCommentHandler(city.id)
         commentButtonHandler(city.id)
         sendToPrograms(city.id, city.countryID)
        }
    }
    closeButton();
    
}  

function sendToPrograms(cityID, cityCountry){
    document.querySelector(".programs-in-city").onclick = function() {
        sessionStorage.setItem("cityID", cityID);
        sessionStorage.setItem("cityCountry", cityCountry)
        location.href = "programs.html"
    }
}

function closeButton() {
    if (document.querySelector(".close") != null) {
        document.querySelector(".close").addEventListener("click", function () {
            document.querySelector(".destination-popup").remove();
            document.querySelector(".background-white").remove();
            setTopDestinationEvents()
        })
    }

    // if (document.querySelector(".close-button") != null){
    //     document.querySelector(".close-button").addEventListener("click", function(){
    //         document.querySelector(".destination-popup").remove();
    //     })
    // }
}

let index = 0;


function popupCommentHandler(cityID){
    let cityComments = COMMENTS_CITY.filter((comment) => {
        return comment.cityID == cityID
    })
    if(index < 0){
        index = cityComments.length - 1
    }
    if(index > cityComments.length - 1){
        index = 0
    }

    let comments = cityComments[index];
    console.log(cityComments);
    
    if(cityComments.length > 0){
        if(index == cityComments.length){
            index = 0
        }
        let comments = cityComments[index]
        document.querySelector(".popup-comments").innerHTML = `
        <h3 class="comment-alias">${comments.alias}, ${comments.date.year}-${comments.date.month}-${comments.date.day}</h3>
        <h3 class="comment-text">${comments.text}</h3>
        <div class="ratings">
            <h4 class="comment-ratings">Out: ${comments.stars.out}/5</h4>
            <h4 class="comment-ratings">Food: ${comments.stars.food}/5</h4>
            <h4 class="comment-ratings">Acomodation: ${comments.stars.accomodation}/5</h4>
        </div>    
        `
    }
    else {
        document.querySelector(".popup-comments").innerHTML = `
        <h3 class="no-comments">No comments found</h3>
        <div class="gubbe"></div>
        `

    }
}

function commentButtonHandler(cityID) {
    document.querySelector(".left-button").addEventListener("click", function() {
        index--; 
        popupCommentHandler(cityID)})
    document.querySelector(".right-button").addEventListener("click", function() {
        index++; 
        popupCommentHandler(cityID);})
}

function setTopDestinationEvents() {
    document.getElementById("madrid").addEventListener("click", function () { renderCitiesPopup("Madrid") })
    document.getElementById("sydney").addEventListener("click", function () { renderCitiesPopup("Sidney") })
    document.getElementById("london").addEventListener("click", function () { renderCitiesPopup("London") })
    document.getElementById("paris").addEventListener("click", function () { renderCitiesPopup("Paris") })
}

setTopDestinationEvents()