/* 
   - nascondere icona search fintanto che c'è testo nell'input
   - gestire dropdown con javascript nascondi/mostra e seleziona option
*/
const searchInput = document.querySelector(".filters__search");
const searchWrapper = document.querySelector(".filters__search-wrapper");

getCountries();

searchInput.addEventListener("input", updateIconVisibility);

function updateIconVisibility() {
  if (searchInput.value.length > 0) {
    searchWrapper.classList.add("filters__search-wrapper--has-value");
  } else {
    searchWrapper.classList.remove("filters__search-wrapper--has-value");
  }
}

async function getCountries() {
  const countries = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
  ).then((resp) => {
    return resp.json();
  });
  populateCountries(countries);
}

function drawCountry(country) {
  const countryEl = `<div class="country">
          <div class="country__flag">
            <img
              src="${country.flags.svg}"
              alt=""
              class="country__flag-img"
            />
          </div>
          <div class="country__info">
            <h2 class="country__name">${country.name.common}</h2>
            <div class="country__details">
              <p class="country__detail">
                <span class="country__detail-label">Population:</span>
                <span class="country__detail-value">${new Intl.NumberFormat().format(
                  country.population
                )}</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Region:</span>
                <span class="country__detail-value">${country.region}</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Capital:</span>
                <span class="country__detail-value">${country.capital}</span>
              </p>
            </div>
          </div>
        </div>`;
  return countryEl;
}
function populateCountries(countries) {
  const container = document.querySelector(".main .countries");
  container.innerHTML = "";

  countries.forEach((country) => {
    const countryEl = drawCountry(country);
    container.insertAdjacentHTML("beforeend", countryEl);
  });
}
