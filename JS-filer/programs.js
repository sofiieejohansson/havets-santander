"use strict";

let filteredProgrammes = [];


let programmes = DB.PROGRAMMES
let universities = DB.UNIVERSITIES

function showProgram(id) {
    let div = document.createElement("div");
    let programme = DB.PROGRAMMES[id]; 
    let field = showField(programme)
    let language = showLanguage(programme)
    let level = showLevel(programme)
    div.classList = "programme-box";
    div.innerHTML = `
    <header>${programme.name} - CITY, COUNTRY</header>
    <div id="programme-info">
        <p>Local Students: ${programme.localStudents}</p>
        <p>Exchange Students: ${programme.exchangeStudents}</p>
        <p>
        ${field.name}
        </p>
        <p>
        ${language.name}
        </p>
        <p>
        ${level}
        </p>
    </div>`

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

function showLanguage(programme) {
    let languages = DB.LANGUAGES

    return languages.find(language => {
        return programme.language == language.id;
    });
}

function showLevel(programme) {

}

function showCity(programme, universities) {
    let cities = DB.CITIES;

    return cities.find(city => {
        return universities.cityID == city.id;
    });

}

const feildSelect = document.getElementById("field");
feildSelect.addEventListener("change", function(){
    filterFeild(feildSelect.value);
    showProgrammes(filteredProgrammes)
});

function filterFeild (fieldOption) {
    if (isFilteredEmpty()) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            if (fieldOption == programme.subjectID) {
                return programme;
            } 
        });
    } else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            if (fieldOption == programme.subjectID) {
                return programme;
            } 
        });
    }
}

function isFilteredEmpty () {
    return filteredProgrammes.length
}

function filterLanguage (languageOption) {
    if (isFilteredEmpty()) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            if (languageOption == programme.language) {
                return programme;
            }
        });
    } else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            if (languageOption == programme.language) {
                return programme;
            }
        });
    }
}

const languageSelect = document.getElementById("language");
languageSelect.addEventListener("change", function() {
    filterLanguage(languageSelect.value);
    showProgrammes(filteredProgrammes);
});

function filterLevel (levelOption) {
    if (isFilteredEmpty()) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            if (levelOption == programme.level) {
                return programme;
            }
        });
    } else {
        filteredProgrammes == DB.PROGRAMMES.filter(programme => {
            if (levelOption == programme.level) {
                return programme;
            }
        });
    }
}

const levelSelect = document.getElementById("level");
levelSelect.addEventListener("change", function() {
    filterLevel(levelSelect.value);
    showProgrammes(filteredProgrammes);
});

function filterCountry () {
    //if (country is filled) {
    //    enable filterCity
    //}
}

function filterCity () {
    // endast baserat på valt land
}


showProgrammes(filteredProgrammes);