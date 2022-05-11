"use strict";

let filteredProgrammes = [];


let programmes = DB.PROGRAMMES

function showProgram(id) {
    let div = document.createElement("div");
    let programme = DB.PROGRAMMES[id]; 
    let field = showField(programme)
    div.classList = "programme-box";
    div.innerHTML = `
    <header>${programme.name} - CITY, COUNTRY</header>
    <div id="programme-info">
        <p>Local Students: ${programme.localStudents}</p>
        <p>Exchange Students: ${programme.exchangeStudents}</p>
        <p>
        ${field.name}
        </p>
        <p>kalla på showLanguage-funktionen</p>
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


    return "languageInfo"
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

function filterLanguage () {

}

function filterLevel () {

}

function filterCountry () {
    //if (country is filled) {
    //    enable filterCity
    //}
}

function filterCity () {
    // endast baserat på valt land
}

function onChange () {
    // eventlistener för klick och välj på dropdown
    // uppdaterar listan allt eftersom man väljer olika filtreringar
}

showProgrammes(filteredProgrammes);