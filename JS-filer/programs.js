"use strict";
let filteredProgrammes = [];
let comments = COMMENTS_PROGRAMME
let programmes = DB.PROGRAMMES
let universities = DB.UNIVERSITIES
let countries = DB.COUNTRIES
let cities = DB.CITIES

function showProgram(id) {
    let div = document.createElement("div");
    let programme = DB.PROGRAMMES[id]; 
    let field = showField(programme);
    let language = showLanguage(programme);
    let level = showLevel(programme);
    let country = showCountry(programme);
    let city = showCity(programme);
    div.classList = "programme-box";
    div.setAttribute("id", `${programme.id}`)
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
    </div>`

    div.addEventListener('click', showProgrammePopup); 

    return div;
}

function showProgrammes(programmes) {
    let programmesElement = document.getElementById("programme-container");
    for (let programme of programmes){
        let programmeElement = showProgram(programme.id);
        programmesElement.appendChild(programmeElement);
    }
}

function showField(programme) {
    let fields = DB.FIELDS;

    return fields.find(field => { 
        return programme.subjectID == field.id;
    });
}

// function showComments(programme) {
//     let comments = COMMENTS_PROGRAMME;

//     return comments.filter(comment => {
//         return programme.id == comment.programmeID;
//     })
// }

function showLanguage(programme) {
    let languages = DB.LANGUAGES

    return languages.find(language => {
        return programme.language == language.id;
    });
}

function showUniversity(programme) {
    let universities = DB.UNIVERSITIES;

    return universities.find(university => {
        return programme.universityID == university.id;
    });
}

function showLevel(programme) {
    return LEVELS.at(programme.level)
}

function showCity(programme) {
    let cities = DB.CITIES;

    for (let university of DB.UNIVERSITIES) {
        if (programme.universityID == university.id) {
            for (let city of cities) {
                if (university.cityID == city.id) {
                   return city                    
                }
            }
        }
    }
}

function showCountry(programme) {
    let countries = DB.COUNTRIES

    for (let university of DB.UNIVERSITIES) {
        if (programme.universityID == university.id) {

            for (let city of DB.CITIES) {
                if (university.cityID == city.id) {
                    
                    for (let country of countries) {
                        if (city.countryID == country.id) {
                            return country
                        }
                    }
                }
            }
        }
    }
}

function isFilteredEmpty () {
    return filteredProgrammes.length
}

function emptyList () {
    document.querySelector("#programme-container").innerHTML = ""
}

function filterFeild(fieldOption) {
    if (filteredProgrammes.some((programme) => programme.subjectID == fieldOption) == true) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            return fieldOption == programme.subjectID
        });
    } 
    else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            return fieldOption == programme.subjectID
        })

        if (languageSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return languageSelect.value == programme.language
            })
        }
        if (levelSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return levelSelect.value == programme.level
                });
        }
        if (countrySelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return countrySelect.value == showCountry(programme).id
            });
        }
        if (citySelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return citySelect.value == showCity(programme).id
            });
        }        
    }
}

const feildSelect = document.getElementById("field");
feildSelect.addEventListener("change", function(){
    emptyList();
    filterFeild(feildSelect.value);
    showProgrammes(filteredProgrammes);
});

function filterLanguage (languageOption) {
    if (filteredProgrammes.some((programme) => programme.language == languageOption) == true) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            return languageOption == programme.language
        });
    } 
    else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            return languageOption == programme.language
        })

        if (feildSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return feildSelect.value == programme.subjectID
            })
        }
        if (levelSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return levelSelect.value == programme.level
                });
        }
        if (countrySelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return countrySelect.value == showCountry(programme).id
            });
        }
        if (citySelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return citySelect.value == showCity(programme).id
            });
        }        
    }
}

const languageSelect = document.getElementById("language");
languageSelect.addEventListener("change", function() {
    emptyList();
    filterLanguage(languageSelect.value);
    showProgrammes(filteredProgrammes);
});


function filterLevel(levelOption) {
    if (filteredProgrammes.some((programme) => programme.level == levelOption) == true) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            return levelOption == programme.level
        });
    } 
    else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            return levelOption == programme.level
        })

        if (feildSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return feildSelect.value == programme.subjectID
            })
        }
        if (languageSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return languageSelect.value == programme.language
                });
        }
        if (countrySelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return countrySelect.value == showCountry(programme).id
            });
        }
        if (citySelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return citySelect.value == showCity(programme).id
            });
        }
    }
}

const levelSelect = document.getElementById("level");
levelSelect.addEventListener("change", function() {
    emptyList();
    filterLevel(levelSelect.value);
    showProgrammes(filteredProgrammes);
});

function filterCountry (countryOption) {
    if(filteredProgrammes.some((programme) => showCountry(programme).id == countryOption) == true){
        filteredProgrammes = filteredProgrammes.filter(programme => {
            return showCountry(programme).id == countryOption
        })
    } 
    else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            return showCountry(programme).id == countryOption
        })
    
        if (levelSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return levelSelect.value == programme.level
        })
        }

        if (feildSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return feildSelect.value == programme.subjectID
            })
        }

        if (languageSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return languageSelect.value == programme.language
                });
        }
    }
}

const countrySelect = document.getElementById("country");
countrySelect.addEventListener("change", function () {
    citySelect.disabled = false;
    emptyList();
    filterCountry(countrySelect.value);
    showProgrammes(filteredProgrammes);
    createOption(countrySelect.value)
})

function filterCity (cityOption) {
    if(filteredProgrammes.some((programme) => showCity(programme).id == cityOption) == true){
        filteredProgrammes = filteredProgrammes.filter(programme => {
            return showCity(programme).id == cityOption
        })
    } 
    else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            return showCity(programme).id == cityOption
        })
    
        if (levelSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return levelSelect.value == programme.level
        })
        }

        if (feildSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return feildSelect.value == programme.subjectID
            })
        }

        if (languageSelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return languageSelect.value == programme.language
                });
        }
        if (countrySelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return countrySelect.value == showCountry(programme).id
            });
        }
    }
}

const citySelect = document.getElementById("city");
citySelect.addEventListener("change", function () {
    emptyList();
    filterCity(citySelect.value);
    showProgrammes(filteredProgrammes);
})

function createOption (countryId = -1) {
    citySelect.innerHTML = "";
    let defaultOption = document.createElement("option");
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.hidden = true;
    defaultOption.value = -1;
    defaultOption.innerText = "City";
    citySelect.appendChild(defaultOption);
    if (countryId == -1) {
        //for (let i = 0; i < cities.length; i++) {
        //    let option = document.createElement("option");
        //    option.text = cities[i].name;
        //    option.value = i;
        //    citySelect.add(option); 
        //}
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
    console.log(event.target);
    for (let i = 0; i < PROGRAMMES.length; i++) {
        let programme = PROGRAMMES[i]


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
                    <div class="entry-grade">Entry Grade: ${programme.entryGrades[0]}</div>
                    <div class="success-rate">Success Rate: ${programme.successRate[0]}</div>
                    <div id="${showCity(programme).name}"class="info-city">
                        <div>${showCity(programme).name}</div> 
                        <div>&rang;</div>
                    </div>
                </div>
            </div>`
                
            programmeComments(programme.id)
            commentButton(programme.id)
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

            document.querySelector(`#${showCity(programme).name}`).addEventListener("click", function() {
                document.querySelector(`#popup`).style.display = "none";
                document.querySelector(`.seethrou`).style.display = "none";
            
                renderCitiesPopup(showCity(programme).name)
            })               
            return;
        }
    }
} 

function setProgrammeEvents() {
    let programmeBoxes = document.querySelectorAll(".programme-box")

    for (let programmeBox of programmeBoxes) {
        programmeBox.addEventListener("click", showProgrammePopup)
    }
}
    
let index = 0;

function programmeComments (programmeID) {
    let programmeComments = COMMENTS_PROGRAMME.filter((comment) => {
        return comment.programmeID == programmeID
    })

    if (index < 0) {
        index = programmeComments.length - 1
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
            <p>Teachers: ${comments.stars.teachers}/5</p> 
            <p>Students: ${comments.stars.students}/5</p>
            <p>Courses: ${comments.stars.courses}/5<p>
        </div>`
    } else {
        document.querySelector(".student-comments").innerHTML = 
        `<h3 class="no-comments">No comments found</h3>
        <div class="gubbe"></div>`
    }
}

function commentButton (programmeID) {
    document.querySelector(".left-button1").addEventListener("click", function(){
        index--;
        programmeComments(programmeID)
    })
    document.querySelector(".right-button1").addEventListener("click", function() {
        index++;
        programmeComments(programmeID)
    })
}

function preFilterFromDesti() {
    console.log(sessionStorage);
    if(sessionStorage.length > 0){
    let cityId = sessionStorage.getItem("cityID");
    filterCity(cityId);
    sessionStorage.clear()
    }
}

function renderCitiesPopup (cityName) {

    for(let i= 0; i < CITIES.length; i++ ) {
       let city = CITIES[i]
       
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
         </div>`
         popupCommentHandler(city.id)
         commentButtonHandler(city.id)
        }
    }
    closeButton();
    
}  

function closeButton() {

    document.querySelector(".close").addEventListener("click", function () {
        document.querySelector(".destination-popup").remove()
        document.querySelector("#popup").style.display = "flex";
        document.querySelector(`.seethrou`).style.display = "block";
        setProgrammeEvents()
    })
    // if (document.querySelector(".close-button") != null){
    //     document.querySelector(".close-button").addEventListener("click", function(){
    //         document.querySelector(".destination-popup").remove();
    //     })
    // }
}

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

// function setEventHandler() {
//     for(let city of DB.CITIES) {
//         let cityBox = document.getElementById(`${showCity(programme).name}`);
//         if (cityBox != null) {
//             cityBox.addEventListener("click", function(){renderCitiesPopup(city.name)})
//         }
//     }
// }

/*
const programmeBox = document.querySelectorAll(".programme-box");

programmeBox.addEventListener('click', e => {
    console.log(e);
}) 


closeButton.addEventListener("click", function () {
    programmePopUp.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == programmePopUp) {
        programmePopUp.style.display = "none";
    }
}); 
*/

preFilterFromDesti()

createOption()

showProgrammes(filteredProgrammes);


/*
let countryChoice = window.localStorage.getItem("countryChoice");
if (countryChoice != null) {
    console.log(countryChoice);
}
*/

/*
function setEventHandler() {
    for (let programme of programmes) {
        let programmeBox = document.getElementById(`${programme.name}`)
        if (programmeBox != null) {
            programmeBox.addEventListener("click", function() {
                renderProgrammePopup(programme.name)
            })
        }
    }
}
*/