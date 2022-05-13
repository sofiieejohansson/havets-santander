"use strict";

let filteredProgrammes = [];

let programmes = DB.PROGRAMMES
let universities = DB.UNIVERSITIES
let countries = DB.COUNTRIES

function showProgram(id) {
    let div = document.createElement("div");
    let programme = DB.PROGRAMMES[id]; 
    let field = showField(programme);
    let language = showLanguage(programme);
    let level = showLevel(programme);
    let country = showCountry(programme);
    let city = showCity(country);
    div.classList = "programme-box";
    div.innerHTML = `
    <header>${programme.name} - ${city.name}, ${country.name}</header>
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
    return LEVELS.at(programme.level)
}

function showCity(country) {
    let cities = DB.CITIES;

    return cities.find(city => {
        return country.id == city.countryID
    });

}

function showCountry(programme) {
    let countries = DB.COUNTRIES

    return countries.find(country => {
        return programme.language == country.languageID;
    });
}

const feildSelect = document.getElementById("field");
feildSelect.addEventListener("change", function(){
    emptyList();
    filterFeild(feildSelect.value);
    showProgrammes(filteredProgrammes);
});

// > 0 && filteredProgrammes.some((programme) => programme.subjectID == fieldOption) == true

function filterFeild (fieldOption) {
    if (isFilteredEmpty() && filteredProgrammes.some((programme) => programme.subjectID == fieldOption) == true) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            return fieldOption == programme.subjectID
        });
    } else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            return fieldOption == programme.subjectID
        });
    }
}

function isFilteredEmpty () {
    return filteredProgrammes.length
}

function emptyList () {
    document.querySelector("#programme-container").innerHTML = ""

}

// > 0 && filteredProgrammes.some((programme) => programme.language == languageOption) == true

function filterLanguage (languageOption) {
    if (isFilteredEmpty() && filteredProgrammes.some((programme) => programme.language == languageOption) == true) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            return languageOption == programme.language
        });
    } else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            return languageOption == programme.language
        });
    }
}

const languageSelect = document.getElementById("language");
languageSelect.addEventListener("change", function() {
    emptyList();
    filterLanguage(languageSelect.value);
    showProgrammes(filteredProgrammes);
});

// > 0 && filteredProgrammes.some((programme) => programme.level == levelOption) == true

function filterLevel (levelOption) {
    if (isFilteredEmpty() && filteredProgrammes.some((programme) => programme.level == levelOption) == true) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            return levelOption == programme.level            
        });
    }
    else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            return levelOption == programme.level
        });
    }
}

const levelSelect = document.getElementById("level");
levelSelect.addEventListener("change", function() {
    emptyList();
    filterLevel(levelSelect.value);
    showProgrammes(filteredProgrammes);
});

function filterCountry (countryOption) {
    if (isFilteredEmpty() && filteredProgrammes.some((programme) => programme.language == countryOption) == true) {
        filteredProgrammes = filteredProgrammes.filter(programme => {
            return countryOption == programme.language
        });
    } else {
        filteredProgrammes = DB.PROGRAMMES.filter(programme => {
            return countryOption == programme.language
        });
    }
}

const countrySelect = document.getElementById("country");
countrySelect.addEventListener("change", function () {
    emptyList();
    filterCountry(countrySelect.value);
    showProgrammes(filteredProgrammes);
})

function filterCity () {
    // endast baserat på valt land
}


showProgrammes(filteredProgrammes);