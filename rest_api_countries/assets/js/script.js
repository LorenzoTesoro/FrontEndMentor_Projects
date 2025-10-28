const searchInput = document.querySelector(".filters__search");
const searchWrapper = document.querySelector(".filters__search-wrapper");
const regionDropdown = document.querySelector(".filters__region-dropdown");
const regionButton = document.querySelector(".filters__region");
const countries = document.querySelector(".countries");
let data = [];

searchInput.addEventListener("input", updateIconVisibility);
searchInput.addEventListener("input", filterCountries);
regionDropdown.addEventListener("click", function (e) {
  if (
    e.target.tagName === "BUTTON" &&
    e.target.classList.contains("filters__region-option")
  ) {
    const selectedRegion = document.querySelector(
      ".filters__region-option.selected"
    );
    if (selectedRegion) selectedRegion.classList.remove("selected"); // remove previous selection
    e.target.classList.add("selected");
    const region = e.target.dataset.value;
    filterCountries();
    //chiudo il dropdown e aggiorno la option selected
    regionDropdown.classList.toggle("filters__region-wrapper--open");
    document.querySelector(".filters__region-text").textContent =
      region.charAt(0).toUpperCase() + region.slice(1);
  }
});
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
//redirect on detail page
countries.addEventListener("click", function (e) {
  const country = e.target.closest(".country");
  if (country) {
    const countryName = country.getAttribute("data-name");
    const countryData = data.find((country) => {
      return country.name.common.toLowerCase() === countryName.toLowerCase();
    });

    localStorage.setItem("selectedCountry", JSON.stringify(countryData));

    window.location.href = "detail.html";
  }
});

getCountries(); // on dom load

function updateIconVisibility() {
  if (searchInput.value.length > 0) {
    searchWrapper.classList.add("filters__search-wrapper--has-value");
  } else {
    searchWrapper.classList.remove("filters__search-wrapper--has-value");
  }
}
async function getCountries() {
  data = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,topLevelDomain,currencies,languages,borders"
  ).then((resp) => {
    return resp.json();
  });
  populateCountries(data);
}
function drawCountry(country) {
  const countryEl = `<div class="country" data-name="${country.name.common}">
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
function filterCountries() {
  const filter_text = searchInput.value.toLowerCase().trim();
  const filter_region = regionDropdown.querySelector(".selected")
    ? regionDropdown
        .querySelector(".selected")
        .getAttribute("data-value")
        .trim()
    : "";
  const filteredCountries = data.filter((country) => {
    let matchText = true;
    let matchRegion = true;

    if (filter_text != "") {
      matchText = country.name.common.toLowerCase().startsWith(filter_text);
    }
    if (filter_region != "") {
      matchRegion =
        country.region.toLowerCase() === filter_region.toLowerCase();
    }
    return matchText && matchRegion;
  });
  populateCountries(filteredCountries);
}
