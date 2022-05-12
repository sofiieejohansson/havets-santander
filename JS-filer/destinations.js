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



function test(){
   


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

  
