"use strict";

let filteredProgrammes = [];
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
        if (citySelect.value >= 0) {
            filteredProgrammes = filteredProgrammes.filter(programme => {
                return citySelect.value == showCity(programme).id
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

createOption()

showProgrammes(filteredProgrammes);

let countryChoice = window.localStorage.getItem("countryChoice");
if (countryChoice != null) {
    console.log(countryChoice);
}