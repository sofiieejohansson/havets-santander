function renderCountries () {
    let countryName = COUNTRIES.filter((country) => country.name);
    let cityContainer = document.getElementById('destinations-container')
    for (let i = 0; i < countryName.length; i++) {
        cityContainer.innerHTML += `
        <div class="country-container">
            <h1>${countryName[i].name}</h1>
            ${renderCities()}
        </div>`
    }
    return countryName
}

