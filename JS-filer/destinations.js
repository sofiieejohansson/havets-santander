"use strict";
localStorage.clear()

function renderCountries () {
    let countryName = COUNTRIES.filter((country) => country)
    .sort((a, b) => {
        if(a.name > b.name) {
            return 1;
        }

        else if (a.name < b.name) {
            return -1;
        }
        return 0;

    });

    let countryContainer = document.getElementById('destinations-container');
    for (let i = 0; i < countryName.length; i++) {
        countryContainer.innerHTML += `
        <div class="country-container">
            <h1 class= "country-h1">${countryName[i].name}</h1>
            <div class="cities-container">

            </div>
        </div>`;
        renderCities(i, countryName)
    }

    setEventHandler()
}

function renderCities (counter, array) {

    let cities = CITIES.filter((city) => city).sort((a, b) => {
        if(a.name > b.name) {
            return 1;
        }

        else if (a.name < b.name) {
            return -1;
        }
        return 0;

    });

    for(let city of cities) {

        if(array[counter].id == city.countryID) {

            document.querySelector(`#destinations-container > div:last-child > div`).innerHTML += `
            <div class="city-box" id="${city.name}">
                <img class="city-picture" src="Images/${city.imagesNormal[0]}" alt="">
                <h2 class="city-h2">${city.name}</h2>
            </div> `
        }
        
    }    
}

function setEventHandler() {
    for(let city of DB.CITIES) {
        let cityBox = document.getElementById(`${city.name}`);
        if (cityBox != null) {
            cityBox.addEventListener("click", function(){renderCitiesPopup(city.name)})
        }
    }
}


let elementSelector = (select) => {
    return document.querySelector(select);
}

function getResults (){
    

    let input = elementSelector("#search-input").value;

    elementSelector("#destinations-container").innerHTML = ""

    if (input.length > 0) {

        for(let i = 0; i < CITIES.length; i++) {
            if (CITIES[i].name.toLocaleLowerCase().startsWith(input)) {
                
                for (let country of COUNTRIES) {
                    if (country.id == CITIES[i].countryID) {
                        document.querySelector(`#destinations-container`).innerHTML += `
                        
                        
                        <div class="country-container">
                            <h1 class="country-h1">${country.name}</h1>
                            <div class="cities-container">
                                <div class="city-box" id="${CITIES[i].name}">
                                    <img class="city-picture" src="Images/${CITIES[i].imagesNormal[0]}" alt="">
                                    <h2 class="city-h2">${CITIES[i].name}</h2>
                                </div> 
                            </div>
                        </div>`;
                        

                    }
                }
            }
        } 
    setEventHandler()
    }
    else {
        renderCountries();
    }
}



// document.querySelector(`#destinations-container > div:last-child`).scrollIntoView();
elementSelector("#search-input").addEventListener("keyup", getResults);
renderCountries()




function renderCitiesPopup (cityName) {

    for(let i= 0; i < CITIES.length; i++ ) {
       let city = CITIES[i]
       
        if (city.name == cityName) {
            
           document.querySelector(`#destinations-container`).innerHTML += `
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
               
               
               <button type="button" class="programs-in-city">View programs in ${city.name}</button>
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
        window.localStorage.setItem("cityID", cityID);
        window.localStorage.setItem("cityCountry", cityCountry)
        window.location.href = "programs.html"
    }
}

function closeButton() {

    document.querySelector(".close").addEventListener("click", function () {
        document.querySelector(".destination-popup").remove();
        setEventHandler()
        document.querySelector(".background-white").remove();
    })

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
        <h4 class="comment-ratings">Out: ${comments.stars.out}/5</h4>
        <h4 class="comment-ratings">Food: ${comments.stars.food}/5</h4>
        <h4 class="comment-ratings">Acomodation: ${comments.stars.accomodation}/5</h4>`
    }
    else {
        document.querySelector(".popup-comments").innerHTML = `
        <h3 class="no-comments">Inga kommentarer</h3>`

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







let ukPin = document.querySelector(".uk-pin")
ukPin.style.cursor="pointer"

ukPin.addEventListener("click", function(){
    ukPin.style.cursor ="pointer"
    document.querySelector(`#destinations-container > div:last-child`).scrollIntoView();
})



let usaPin = document.querySelector(".usa-pin")
usaPin.style.cursor="pointer"

usaPin.addEventListener("click", function(){
    usaPin.style.cursor ="pointer"
    document.querySelector(`#destinations-container > div:nth-child(8)`).scrollIntoView();
})



let swePin = document.querySelector(".sweden-pin")
swePin.style.cursor="pointer"

swePin.addEventListener("click", function(){
    swePin.style.cursor ="pointer"
    document.querySelector(`#destinations-container > div:nth-child(7)`).scrollIntoView();
})



let spaPin = document.querySelector(".spain-pin")
spaPin.style.cursor="pointer"

spaPin.addEventListener("click", function(){
    spaPin.style.cursor ="pointer"
    document.querySelector(`#destinations-container > div:nth-child(6)`).scrollIntoView();
})



let mexPin = document.querySelector(".mexico-pin")
mexPin.style.cursor="pointer"

mexPin.addEventListener("click", function(){
    mexPin.style.cursor ="pointer"
    document.querySelector(`#destinations-container > div:nth-child(5)`).scrollIntoView();
})



let fraPin = document.querySelector(".france-pin")
fraPin.style.cursor="pointer"

fraPin.addEventListener("click", function(){
    fraPin.style.cursor ="pointer"
    document.querySelector(`#destinations-container > div:nth-child(4)`).scrollIntoView();
})



let chiPin = document.querySelector(".chile-pin")
chiPin.style.cursor="pointer"

chiPin.addEventListener("click", function(){
    chiPin.style.cursor ="pointer"
    document.querySelector(`#destinations-container > div:nth-child(3)`).scrollIntoView();
})



let ausPin = document.querySelector(".australia-pin")
ausPin.style.cursor="pointer"

ausPin.addEventListener("click", function(){
    ausPin.style.cursor ="pointer"
    document.querySelector(`#destinations-container > div:nth-child(2)`).scrollIntoView();
})



let argPin = document.querySelector(".argentina-pin")
argPin.style.cursor="pointer"

argPin.addEventListener("click", function(){
    argPin.style.cursor ="pointer"
    document.querySelector(`#destinations-container > div:nth-child(1)`).scrollIntoView();
})
   

function test() {
    for(let i = 0; i < CITIES.length; i++) { 
            
        
    }
}








  
