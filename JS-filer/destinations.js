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
            <h1>${countryName[i].name}</h1>
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

renderCountries()
