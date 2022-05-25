"use strict";

// Skapar en tom array för att hantera multifiltrering
let filteredProgrammes = [];
let comments = COMMENTS_PROGRAMME;
let programmes = DB.PROGRAMMES;
let universities = DB.UNIVERSITIES;
let countries = DB.COUNTRIES;
let cities = DB.CITIES;

// Funktionen skapar DOM-element och hanterar informationen
function showProgram(id) {
  let div = document.createElement("div");
  let programme = DB.PROGRAMMES[id];

  // Applicerar variabler på funktionerna för användningen i template literals nedan 
  let field = showField(programme);
  let language = showLanguage(programme);
  let level = showLevel(programme);
  let country = showCountry(programme);
  let city = showCity(programme);
  div.classList = "programme-box";
  div.setAttribute("id", `${programme.id}`);
  // Regigerar DOM-element
  div.innerHTML = `
    <header>${programme.name} - ${city.name}, ${country.name}</header>
    <div id="programme-info">
        <img class="icon2" src="Images/icon-users-29-grey.png" alt=""> 
        <p>Local Students: ${programme.localStudents}</p>
        <img class="icon2" src="Images/icon-users-29-grey.png" alt=""> 
        <p>Exchange Students: ${programme.exchangeStudents}</p>
        <p> | ${field.name}</p>
        <p> | ${language.name}</p>
        <p> | ${level}</p>
    </div>`;

  // Adderar en eventlyssnare som kallar på funktionen för rendering av vår pop-up  
  div.addEventListener("click", showProgrammePopup);

  return div;
}

// Funktion med loop för att vårt DOM-element ska renderas för varje program den hittar
function showProgrammes(programmes) {
  let programmesElement = document.getElementById("programme-container");
  for (let programme of programmes) {
    let programmeElement = showProgram(programme.id);
    programmesElement.appendChild(programmeElement);
  }
}

// Funtkion för att hämta information som används i andra funktioner 
function showField(programme) {
  let fields = DB.FIELDS;

  // Find returnerar det första elementet som uppnår kraven 
  return fields.find((field) => {
    return programme.subjectID == field.id;
  });
}

function showLanguage(programme) {
  let languages = DB.LANGUAGES;

  return languages.find((language) => {
    return programme.language == language.id;
  });
}

function showUniversity(programme) {
  let universities = DB.UNIVERSITIES;

  return universities.find((university) => {
    return programme.universityID == university.id;
  });
}

// At returnerar en plats i arrayn och dess värde baserat på ett nummer
function showLevel(programme) {
  return LEVELS.at(programme.level);
}

// 
function showCity(programme) {
  let cities = DB.CITIES;

  for (let university of DB.UNIVERSITIES) {
    if (programme.universityID == university.id) {
      for (let city of cities) {
        if (university.cityID == city.id) {
          return city;
        }
      }
    }
  }
}

function showCountry(programme) {
  let countries = DB.COUNTRIES;

  for (let university of DB.UNIVERSITIES) {
    if (programme.universityID == university.id) {
      for (let city of DB.CITIES) {
        if (university.cityID == city.id) {
          for (let country of countries) {
            if (city.countryID == country.id) {
              return country;
            }
          }
        }
      }
    }
  }
}

// Tömmer innehållet 
function emptyList() {
  document.querySelector("#programme-container").innerHTML = "";
}

// Tar bort placeholder för gubbe-div
function filterFeild(fieldOption) {
  document.querySelector(".gubbe-div").style.display = "none";

  // Om den hittar ett program som stämmer överens med värdet i select option
  if (
    filteredProgrammes.some(
      (programme) => programme.subjectID == fieldOption
    ) == true
  ) {
    filteredProgrammes = filteredProgrammes.filter((programme) => {
      return fieldOption == programme.subjectID;
    });
    // Om annars, gå igenom databasen
  } else {
    filteredProgrammes = DB.PROGRAMMES.filter((programme) => {
      return fieldOption == programme.subjectID;
    });

    // För att övriga filter ska bli inkluderade (-1 = default option value)
    if (languageSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return languageSelect.value == programme.language;
      });
    }
    if (levelSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return levelSelect.value == programme.level;
      });
    }
    if (countrySelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return countrySelect.value == showCountry(programme).id;
      });
    }
    if (citySelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return citySelect.value == showCity(programme).id;
      });
    }
  }
}

// Applicerar eventlyssnare på respektive select
const feildSelect = document.getElementById("field");
feildSelect.addEventListener("change", function () {
  emptyList();
  filterFeild(feildSelect.value);
  showProgrammes(filteredProgrammes);
});

function filterLanguage(languageOption) {
  document.querySelector(".gubbe-div").style.display = "none";

  if (
    filteredProgrammes.some(
      (programme) => programme.language == languageOption
    ) == true
  ) {
    filteredProgrammes = filteredProgrammes.filter((programme) => {
      return languageOption == programme.language;
    });
  } else {
    filteredProgrammes = DB.PROGRAMMES.filter((programme) => {
      return languageOption == programme.language;
    });

    if (feildSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return feildSelect.value == programme.subjectID;
      });
    }
    if (levelSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return levelSelect.value == programme.level;
      });
    }
    if (countrySelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return countrySelect.value == showCountry(programme).id;
      });
    }
    if (citySelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return citySelect.value == showCity(programme).id;
      });
    }
  }
}

const languageSelect = document.getElementById("language");
languageSelect.addEventListener("change", function () {
  emptyList();
  filterLanguage(languageSelect.value);
  showProgrammes(filteredProgrammes);
});

function filterLevel(levelOption) {
  document.querySelector(".gubbe-div").style.display = "none";

  if (
    filteredProgrammes.some((programme) => programme.level == levelOption) ==
    true
  ) {
    filteredProgrammes = filteredProgrammes.filter((programme) => {
      return levelOption == programme.level;
    });
  } else {
    filteredProgrammes = DB.PROGRAMMES.filter((programme) => {
      return levelOption == programme.level;
    });

    if (feildSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return feildSelect.value == programme.subjectID;
      });
    }
    if (languageSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return languageSelect.value == programme.language;
      });
    }
    if (countrySelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return countrySelect.value == showCountry(programme).id;
      });
    }
    if (citySelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return citySelect.value == showCity(programme).id;
      });
    }
  }
}

const levelSelect = document.getElementById("level");
levelSelect.addEventListener("change", function () {
  emptyList();
  filterLevel(levelSelect.value);
  showProgrammes(filteredProgrammes);
});

function filterCountry(countryOption) {
  document.querySelector(".gubbe-div").style.display = "none";

  if (
    filteredProgrammes.some(
      (programme) => showCountry(programme).id == countryOption
    ) == true
  ) {
    filteredProgrammes = filteredProgrammes.filter((programme) => {
      return showCountry(programme).id == countryOption;
    });
  } else {
    filteredProgrammes = DB.PROGRAMMES.filter((programme) => {
      return showCountry(programme).id == countryOption;
    });

    if (levelSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return levelSelect.value == programme.level;
      });
    }

    if (feildSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return feildSelect.value == programme.subjectID;
      });
    }

    if (languageSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return languageSelect.value == programme.language;
      });
    }
  }
}

// Kallar på createOption för att städer ska skapas baserat på landet man väljer (city är disabled sedan innan)
const countrySelect = document.getElementById("country");
countrySelect.addEventListener("change", function () {
  citySelect.disabled = false;
  emptyList();
  filterCountry(countrySelect.value);
  showProgrammes(filteredProgrammes);
  createOption(countrySelect.value);
});

function filterCity(cityOption) {
  document.querySelector(".gubbe-div").style.display = "none";

  if (
    filteredProgrammes.some(
      (programme) => showCity(programme).id == cityOption
    ) == true
  ) {
    filteredProgrammes = filteredProgrammes.filter((programme) => {
      return showCity(programme).id == cityOption;
    });
  } else {
    filteredProgrammes = DB.PROGRAMMES.filter((programme) => {
      return showCity(programme).id == cityOption;
    });

    if (levelSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return levelSelect.value == programme.level;
      });
    }

    if (feildSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return feildSelect.value == programme.subjectID;
      });
    }

    if (languageSelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return languageSelect.value == programme.language;
      });
    }
    if (countrySelect.value >= 0) {
      filteredProgrammes = filteredProgrammes.filter((programme) => {
        return countrySelect.value == showCountry(programme).id;
      });
    }
  }
}

const citySelect = document.getElementById("city");
citySelect.addEventListener("change", function () {
  emptyList();
  filterCity(citySelect.value);
  showProgrammes(filteredProgrammes);
});

// Renderar city-options baserat på valt land 
function createOption(countryId = -1) {
  citySelect.innerHTML = "";
  let defaultOption = document.createElement("option");
  defaultOption.disabled = true;
  defaultOption.selected = true;
  defaultOption.hidden = true;
  defaultOption.value = -1;
  defaultOption.innerText = "City";
  citySelect.appendChild(defaultOption);
  if (countryId == -1) {

  } else {
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].countryID == countryId) {
        let option = document.createElement("option");
        option.text = cities[i].name;
        option.value = i;
        citySelect.add(option);
      }
    }
  }
}

function showProgrammePopup(event) {
  let level = showLevel(programmes);
  for (let i = 0; i < PROGRAMMES.length; i++) {
    let programme = PROGRAMMES[i];

    if (programme.id == event.target.id) {
      document.querySelector(`#popup`).innerHTML += `
            <div class="popup-color">
                <h2 class="programme-name">${programme.name}</h2>
            </div>
                
            <div class="university-info">
                <h4 class="university-name">${showUniversity(programme).name} - ${showField(programme).name}</h4>
                <div class="student-info">
                    <img class="icon" src="Images/icon-users-29-grey.png" alt="">
                    <p class="local-students">Local Students: ${programme.localStudents}</p>
                    <img class="icon" src="Images/icon-users-29-grey.png" alt="">
                    <p class="exchange-students">Exchange Students: ${programme.exchangeStudents}</p>
                </div>
            </div>

            <div class="div-container1">
                <div class="left-container1">
                    <div class="level">&cir; Level: ${level}</div>
                    <button class="left-button1">&larr;</button>
                    <button class="right-button1">&rarr;</button>
                    <div class="student-comments"></div>
                </div>
     
                <div class="right-container1">               
                    <div class="entry-grade">Last years entry grade: ${programme.entryGrades[0]}</div>
                    <div class="success-rate">Success Rate: ${programme.successRate[0]}%</div>
                    <div id="${showCity(programme).name}"class="info-city">
                        <div>${showCity(programme).name}</div> 
                        <div>&rang;</div>
                    </div>
                </div>
            </div>`;

      programmeComments(programme.id);
      commentButton(programme.id);
      document.querySelector(`#popup`).style.display = "flex";
      document.querySelector(`.close-button1`).style.display = "block";
      document.querySelector(`.background-white`).style.display = "block";
      document.querySelector(`.seethrou`).style.display = "block";

      document.querySelector(`.close-button1`).addEventListener("click", function () {
          document.querySelector(`.close-button1`).style.display = "none";
          document.querySelector(`.background-white`).style.display = "none";
          document.querySelector(`.seethrou`).style.display = "none";
          document.querySelector(`#popup`).style.display = "none";
          document.querySelector(`#popup`).innerHTML = "";
        });

      document.getElementById(`${showCity(programme).name}`).addEventListener("click", function () {
          document.querySelector(`#popup`).style.display = "none";
          document.querySelector(`.seethrou`).style.display = "none";

          renderCitiesPopup(showCity(programme).name);
        });
      return;
    }
  }
}

// Applicerar eventlyssnare efter "close" på stad-pop-up (bug?)
function setProgrammeEvents() {
  let programmeBoxes = document.querySelectorAll(".programme-box");

  for (let programmeBox of programmeBoxes) {
    programmeBox.addEventListener("click", showProgrammePopup);
  }
}

let index = 0;

function programmeComments(programmeID) {
  let programmeComments = COMMENTS_PROGRAMME.filter((comment) => {
    return comment.programmeID == programmeID;
  });

  // Återställer index om man går under eller över längden på arrayen 
  if (index < 0) {
    index = programmeComments.length - 1;
  }
  if (index > programmeComments.length - 1) {
    index = 0;
  }

  if (programmeComments.length > 0) {
    if (index == programmeComments.length) {
      index = 0;
    }
    let comments = programmeComments[index];
    document.querySelector(".student-comments").innerHTML = 
    `<div>${comments.alias}, ${comments.date.year}-${comments.date.month}-${comments.date.day}:</div>
        <div class ="comment-container">
            
            <div>${comments.text}</div>
            
        </div>
        <div class="stars"> 
            <p>Teachers: ${comments.stars.teachers}/5 <img class="star-icon" src="Images/star-icon.png" alt="" /></p> 
            <p>Students: ${comments.stars.students}/5 <img class="star-icon" src="Images/star-icon.png" alt="" /></p>
            <p>Courses: ${comments.stars.courses}/5 <img class="star-icon" src="Images/star-icon.png" alt="" /><p>
        </div>`;
  } else {
    document.querySelector(".student-comments").innerHTML = `<h3 class="no-comments">No comments found</h3>
        <div class="gubbe"></div>`;
  }
}

function commentButton(programmeID) {
  document.querySelector(".left-button1").addEventListener("click", function () {
      index--;
      programmeComments(programmeID);
    });
  document.querySelector(".right-button1").addEventListener("click", function () {
      index++;
      programmeComments(programmeID);
    });
}

function preFilterFromDesti() {
  // Dubbelkollar sessionstorage och tar emot/tar med stadens id från destinations 
  if (sessionStorage.length > 0) {
    let cityId = sessionStorage.getItem("cityID");
    // Tar med och filtrerat baserat på det Id den fått med sig och tömmer sedan session storage
    filterCity(cityId);
    sessionStorage.clear();
  }
}

function renderCitiesPopup(cityName) {
  for (let i = 0; i < CITIES.length; i++) {
    let city = CITIES[i];

    if (city.name == cityName) {
      document.querySelector(`#programme-container`).innerHTML += `
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
               
               
               <div type="button" class="programs-in-city1">Hope to see you here!<p class="arrow-city"></p></div>
             </div>
           </div>
         </div>`;
      popupCommentHandler(city.id);
      commentButtonHandler(city.id);
    }
  }
  closeButton();
}

// Funktionen både stänger en pop-up och visar en annan "igen"
function closeButton() {
  document.querySelector(".close").addEventListener("click", function () {
    document.querySelector(".destination-popup").remove();
    document.querySelector("#popup").style.display = "flex";
    document.querySelector(`.seethrou`).style.display = "block";
    setProgrammeEvents();
  });
}

// 
function popupCommentHandler(cityID) {
  let cityComments = COMMENTS_CITY.filter((comment) => {
    return comment.cityID == cityID;
  });
  if (index < 0) {
    index = cityComments.length - 1;
  }
  if (index > cityComments.length - 1) {
    index = 0;
  }

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

function commentButtonHandler(cityID) {
  document.querySelector(".left-button").addEventListener("click", function () {
    index--;
    popupCommentHandler(cityID);
  });
  document.querySelector(".right-button").addEventListener("click", function () {
      index++;
      popupCommentHandler(cityID);
    });
}

// Tömmer programm-div, sedan tömmer den array, applicerar default value på alla filter
// Visar gubben
function resetFilters() {
  document.getElementById("programme-container").innerHTML = ""
  filteredProgrammes = [];
  feildSelect.value = -1;
  languageSelect.value = -1;
  levelSelect.value = -1;
  countrySelect.value = -1;
  citySelect.innerHTML = "";
  // Skapar endast defaultvalue
  createOption()
  citySelect.disabled = true
  document.querySelector(".gubbe-div").style.display = "flex";
}

document.getElementById("clear").addEventListener("click", resetFilters);

preFilterFromDesti();

createOption();

showProgrammes(filteredProgrammes);