"use strict";

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
    return countryName
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
            <div class="city-box">
                <img class="city-picture" src="Images/${city.imagesNormal[0]}" alt="">
                <h2 class="city-h2">${city.name}</h2>
            </div> `


            }
    }
    appendEventListeners();
}

function appendEventListeners() {
    const elements = document.querySelectorAll('.city-box');


    elements.forEach(element => {
        element.addEventListener('click', (e)=>{
            console.log('someone hit me');
        });
    });
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
                                <div class="city-box">
                                    <img class="city-picture" src="Images/${CITIES[i].imagesNormal[0]}" alt="">
                                    <h2 class="city-h2">${CITIES[i].name}</h2>
                                </div> 
                            </div>
                        </div>`

                    }
                }
            }
        } 
    }
    else {
        renderCountries();
    }
}



// document.querySelector(`#destinations-container > div:last-child`).scrollIntoView();
elementSelector("#search-input").addEventListener("keyup", getResults);
renderCountries()




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










  
