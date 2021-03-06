"use strict";

let index = 0;
// tömmer sessionStorage för att få nya värden
sessionStorage.clear();

// Renderar länder och städer(med hjälp av renderCities)
function renderCountries() {
  // Filtrerar samt sorterar ut länderna från databas
  let countryName = COUNTRIES.filter((country) => country).sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  // Renderar varje land utifrån countryName
  let countryContainer = document.getElementById("destinations-container");
  for (let i = 0; i < countryName.length; i++) {
    countryContainer.innerHTML += `
        <div class="country-container">
            <h1 class= "country-h1">${countryName[i].name}</h1>
            <div class="cities-container" id="${countryName[i].name}"></div>
        </div>`;
    // Här applicerar vi städerna
    renderCities(i, countryName);
  }
  setEventHandler();
  squareAdHandler();
}

// Renderar städerna för varje land
function renderCities(counter, array) {
  // Filtrerar samt sorterar ut städerna från databas
  let cities = CITIES.filter((city) => city).sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  // Loopar genom städerna och skapar stad-div om landets id från renderCountries matchar stadens country-id
  for (let city of cities) {
    if (array[counter].id == city.countryID) {
      document.querySelector(
        `#destinations-container > div:last-child > div`
      ).innerHTML += `
            <div class="city-box" id="${city.name}">
                <img class="city-picture" src="Images/${city.imagesNormal[0]}" alt="">
                <h2 class="city-h2">${city.name}</h2>
            </div> `;
    }
  }
}
// Hanterar reklamen och applicerar den till samtliga städer
function squareAdHandler() {
  let squareAd1 = document.createElement("div");
  let squareAd2 = document.createElement("div");
  let squareAd3 = document.createElement("div");
  squareAd1.className = "square-Ad";
  squareAd2.className = "square-Ad";
  squareAd3.className = "square-Ad";
  document.querySelector("#Chile").appendChild(squareAd1);
  document.querySelector("#Spain").appendChild(squareAd2);
  document.getElementById("United Kingdom").appendChild(squareAd3);
}
// Sätter eventListeners för popup på städer
function setEventHandler() {
  for (let city of DB.CITIES) {
    let cityBox = document.getElementById(`${city.name}`);
    // Om staden finns renderad så appliceras event, annars inte för att alla städer inte finns när du söker
    if (cityBox != null) {
      cityBox.addEventListener("click", function () {
        renderCitiesPopup(city.name);
      });
    }
  }
}
// Renderar länder och städer efter sökning
function getCitiesAfterSearch() {
  let input = document.querySelector("#search-input").value;
  document.querySelector("#destinations-container").innerHTML = "";
  // Eftersom användaren söker på stad loopas stad sen land för att undvika länder med tomma städer
  if (input.length > 0) {
    for (let i = 0; i < CITIES.length; i++) {
      // Om staden börjar med bokstäverna i sökning
      if (CITIES[i].name.toLocaleLowerCase().startsWith(input.toLocaleLowerCase())) {
        for (let country of COUNTRIES) {
          if (country.id == CITIES[i].countryID && document.getElementById(`${country.name}`) == null) {
            document.querySelector(`#destinations-container`).innerHTML += `
                <div class="country-container" id="${country.name}">
                  <h1 class="country-h1">${country.name}</h1>
                  <div class="cities-container">
                    <div class="city-box" id="${CITIES[i].name}">
                        <img class="city-picture" src="Images/${CITIES[i].imagesNormal[0]}" alt="">
                        <h2 class="city-h2">${CITIES[i].name}</h2>
                    </div> 
                  </div>
                </div>`;
          }
          else if(country.id == CITIES[i].countryID) {
            document.querySelector(`#${country.name} > div`).innerHTML += `
              <div class="city-box" id="${CITIES[i].name}">
                <img class="city-picture" src="Images/${CITIES[i].imagesNormal[0]}" alt="">
                <h2 class="city-h2">${CITIES[i].name}</h2>
              </div>`
          }
        }
      }
    }
    setEventHandler();
  } else {
    renderCountries();
  }
}
// Renderar hela stad-popup
function renderCitiesPopup(cityName) {
  for (let i = 0; i < CITIES.length; i++) {
    let city = CITIES[i];
    // Tar emot parametern cityName och matchar detta med stad i databas
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
                        <button class="left-button">&larr;</button>
                        <button class="right-button">&rarr;</button>
                        <div class="popup-comments">js fil comments</div>
                    </div>
     
                    <div class="right-container">
                        <div class="sun-days">
                            <p>Sunny days per year:</p>
                            ${city.sun}
                        </div>
               
                        <div type="button" class="programs-in-city"><div class="view-programs-text">Programmes in ${city.name}</div><div class="arrow-city">&rang;</div></div>
                    </div>
                </div>
            </div>
            <div class="background-white"></div>`;
      // Applicerar kommentarer, knappar och så användaren kommer vidare till rätt kurser i programmes
      popupCommentHandler(city.id);
      commentButtonHandler(city.id);
      sendToPrograms(city.id, city.countryID);
    }
  }
  closeButton();
}
// Skickar med cityID och stadens land när användare skickas till programs via popup
function sendToPrograms(cityID, cityCountry) {
  document.querySelector(".programs-in-city").onclick = function () {
    sessionStorage.setItem("cityID", cityID);
    sessionStorage.setItem("cityCountry", cityCountry);
    location.href = "programs.html";
  };
}
// Hanterar stäng-knapp för popup
function closeButton() {
  document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".destination-popup").remove();
    setEventHandler();
    document.querySelector(".background-white").remove();
  });
}
// Hanterar kommentarerna till popup
function popupCommentHandler(cityID) {
  // Filtrerar ut kommentarer som matchar cityID
  let cityComments = COMMENTS_CITY.filter((comment) => {
    return comment.cityID == cityID;
  });
  // if-satser för att återställa index om index går under eller över antalet kommentarer i array
  if (index < 0) {
    index = cityComments.length - 1;
  }
  if (index > cityComments.length - 1) {
    index = 0;
  }

  let comments = cityComments[index];
  // Om där finns kommentarer så skapas kommentar 
  if (cityComments.length > 0) {
    if (index == cityComments.length) {
      index = 0;
    }
    let comments = cityComments[index];
    document.querySelector(".popup-comments").innerHTML = `
        <h3 class="comment-alias">${comments.alias}, ${comments.date.year}-${comments.date.month}-${comments.date.day}</h3>
        <h3 class="comment-text">${comments.text}</h3>
        <div class="ratings">
            <h4 class="comment-ratings">Out: ${comments.stars.out}/5 <img class="star-icon" src="Images/star-icon.png" alt="" /></h4>
            <h4 class="comment-ratings">Food: ${comments.stars.food}/5 <img class="star-icon" src="Images/star-icon.png" alt="" /></h4>
            <h4 class="comment-ratings">Acomodation: ${comments.stars.accomodation}/5 <img class="star-icon" src="Images/star-icon.png" alt="" /></h4>
        </div>    
        `;
  } else {
    document.querySelector(".popup-comments").innerHTML = `
        <h3 class="no-comments">No comments found</h3>
        <div class="gubbe"></div>
        `;
  }
}
// Hanterar knapparna för kommentarkarusellen
function commentButtonHandler(cityID) {
  // Minskar index och kör popupCommentHandler för att rendera ny kommentar
  document.querySelector(".left-button").addEventListener("click", function () {
    index--;
    popupCommentHandler(cityID);
  });
  // Ökar index -||- 
  document.querySelector(".right-button").addEventListener("click", function () {
      index++;
      popupCommentHandler(cityID);
    });
}
// Samlingsfunktion för hantering av pins till kartan
function setPinHandlers() {
  // Scrollar till land beroende på klickad pin
  let ukPin = document.querySelector(".uk-pin");
  ukPin.style.cursor = "pointer";

  ukPin.addEventListener("click", function () {
    ukPin.style.cursor = "pointer";
    document
      .querySelector(`#destinations-container > div:last-child`)
      .scrollIntoView();
  });

  let usaPin = document.querySelector(".usa-pin");
  usaPin.style.cursor = "pointer";

  usaPin.addEventListener("click", function () {
    usaPin.style.cursor = "pointer";
    document
      .querySelector(`#destinations-container > div:nth-child(8)`)
      .scrollIntoView();
  });

  let swePin = document.querySelector(".sweden-pin");
  swePin.style.cursor = "pointer";

  swePin.addEventListener("click", function () {
    swePin.style.cursor = "pointer";
    document
      .querySelector(`#destinations-container > div:nth-child(7)`)
      .scrollIntoView();
  });

  let spaPin = document.querySelector(".spain-pin");
  spaPin.style.cursor = "pointer";

  spaPin.addEventListener("click", function () {
    spaPin.style.cursor = "pointer";
    document
      .querySelector(`#destinations-container > div:nth-child(6)`)
      .scrollIntoView();
  });

  let mexPin = document.querySelector(".mexico-pin");
  mexPin.style.cursor = "pointer";

  mexPin.addEventListener("click", function () {
    mexPin.style.cursor = "pointer";
    document
      .querySelector(`#destinations-container > div:nth-child(5)`)
      .scrollIntoView();
  });

  let fraPin = document.querySelector(".france-pin");
  fraPin.style.cursor = "pointer";

  fraPin.addEventListener("click", function () {
    fraPin.style.cursor = "pointer";
    document
      .querySelector(`#destinations-container > div:nth-child(4)`)
      .scrollIntoView();
  });

  let chiPin = document.querySelector(".chile-pin");
  chiPin.style.cursor = "pointer";

  chiPin.addEventListener("click", function () {
    chiPin.style.cursor = "pointer";
    document
      .querySelector(`#destinations-container > div:nth-child(3)`)
      .scrollIntoView();
  });

  let ausPin = document.querySelector(".australia-pin");
  ausPin.style.cursor = "pointer";

  ausPin.addEventListener("click", function () {
    ausPin.style.cursor = "pointer";
    document
      .querySelector(`#destinations-container > div:nth-child(2)`)
      .scrollIntoView();
  });

  let argPin = document.querySelector(".argentina-pin");
  argPin.style.cursor = "pointer";

  argPin.addEventListener("click", function () {
    argPin.style.cursor = "pointer";
    document
      .querySelector(`#destinations-container > div:nth-child(1)`)
      .scrollIntoView();
  });
}

// Lägger till event varje gång nånting läggs till i sök
document
  .querySelector("#search-input")
  .addEventListener("keyup", getCitiesAfterSearch);
setPinHandlers();
renderCountries();
