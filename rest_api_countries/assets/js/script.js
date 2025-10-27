const searchInput = document.querySelector(".filters__search");
const searchWrapper = document.querySelector(".filters__search-wrapper");
const regionDropdown = document.querySelector(".filters__region-dropdown");
const regionButton = document.querySelector(".filters__region");
let data = [];

searchInput.addEventListener("input", updateIconVisibility);
searchInput.addEventListener("input", searchCountry);
//toggle semplice dropdown
regionButton.addEventListener("click", function (e) {
  e.stopPropagation();
  regionDropdown.classList.toggle("filters__region-wrapper--open");
});
// chiudo se clicco fuori
document.addEventListener("click", function (e) {
  if (!regionDropdown.contains(e.target)) {
    regionDropdown.classList.remove("filters__region-wrapper--open");
  }
});

getCountries();

function updateIconVisibility() {
  if (searchInput.value.length > 0) {
    searchWrapper.classList.add("filters__search-wrapper--has-value");
  } else {
    searchWrapper.classList.remove("filters__search-wrapper--has-value");
  }
}
async function getCountries() {
  data = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
  ).then((resp) => {
    return resp.json();
  });
  populateCountries(data);
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
function searchCountry() {
  const text = searchInput.value.toLowerCase().trim();
  console.log(text);
  const filteredCountries = data.filter((country) => {
    return country.name.common.substring(0, text.length).toLowerCase() === text;
  });
  console.log(filteredCountries);
  populateCountries(filteredCountries);
}
