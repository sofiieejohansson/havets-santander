function renderCountries () {
    let countryName = COUNTRIES.filter((country) => country.name);
    let countryContainer = document.getElementById('destinations-container');
    for (let i = 0; i < countryName.length; i++) {
        countryContainer.innerHTML += `
        <div class="country-container">
            <h1>${countryName[i].name}</h1>
            <div class="cities-container">

            </div>
        </div>`;
        renderCities(i)
    }
    return countryName
}

function renderCities (counter) {
    for(let city of CITIES) {

        if(COUNTRIES[counter].id == city.countryID) {

            document.querySelector(`#destinations-container > div:last-child > div`).innerHTML += `
            <div class="city-box">
                <img class="city-picture" src="Images/${city.imagesNormal[0]}" alt="">
                <h2 class="city-h2">${city.name}</h2>
            </div> `


            }
        }
}

renderCountries()
