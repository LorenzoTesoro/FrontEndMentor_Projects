function drawCountryDetail(country) {
  const countryDetail = `<div class="country" data-name="Afghan">
          <div class="country__flag">
            <img
              src="https://flagcdn.com/af.svg"
              alt=""
              class="country__flag-img"
            />
          </div>
          <div class="country__info">
            <h2 class="country__name">Afghan</h2>
            <div class="country__details">
              <p class="country__detail">
                <span class="country__detail-label">Native Name:</span>
                <span class="country__detail-value">${country.nativeName}</span>
              </p>
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
                <span class="country__detail-label">Sub Region:</span>
                <span class="country__detail-value">${country.subregion}</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Capital:</span>
                <span class="country__detail-value">${country.capital}</span>
              </p>
            </div>
          </div>
          <div class="country__info">
            <div class="country__details">
              <p class="country__detail">
                <span class="country__detail-label">Top Level Domain:</span>
                <span class="country__detail-value">${
                  country.topLevelDomain
                }</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Currencies:</span>
                <span class="country__detail-value">${country.currencies.json()}</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Languages:</span>
                <span class="country__detail-value">${country.languages.json()}</span>
              </p>
            </div>
          </div>
          <div class="country__info">
            <h3 class="country__borders">Border Countries:</h3>
          </div>
        </div>`;
  return countryDetail;
}
function populateCountryDetail(country) {
  const container = document.querySelector(".main");
  container.innerHTML = "";
  const countryEl = drawCountry(country);
  container.insertAdjacentHTML("beforeend", countryEl);
}

const countryData = JSON.parse(localStorage.getItem("selectedCountry"));
const container = document.querySelector(".main .countries");
const backBtn = document.querySelector(".go-back button");
console.log(countryData);
if (countryData) {
  const countryDetail = `<div class="country" data-name="Afghan">
          <div class="country__flag">
            <img
              src="${countryData.flags.svg}"
              alt=""
              class="country__flag-img"
            />
          </div>
          <div class="country__info">
            <h2 class="country__name">${countryData.name.common}</h2>
            <div class="country__details">
              <p class="country__detail">
                <span class="country__detail-label">Native Name:</span>
                <span class="country__detail-value">${
                  countryData.name.official
                }</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Population:</span>
                <span class="country__detail-value">${new Intl.NumberFormat().format(
                  countryData.population
                )}</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Region:</span>
                <span class="country__detail-value">${countryData.region}</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Sub Region:</span>
                <span class="country__detail-value">${
                  countryData.subregion
                }</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Capital:</span>
                <span class="country__detail-value">${
                  countryData.capital
                }</span>
              </p>
            </div>
          </div>
          <div class="country__info">
            <div class="country__details">
              <p class="country__detail">
                <span class="country__detail-label">Currencies:</span>
                <span class="country__detail-value">${Object.values(
                  countryData.currencies || {}
                )
                  .map((curr) => `${curr.name} (${curr.symbol})`)
                  .join(", ")}</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Languages:</span>
                <span class="country__detail-value">${
                  Object.keys(countryData.languages)[0]
                }</span>
              </p>
            </div>
          </div>
          <div class="country__info">
            <h3 class="country__borders">Border Countries:</h3>
            <div class="country__borders-list">
                ${
                  countryData.borders
                    ? countryData.borders
                        .map(
                          (border) => `
          <button class="country__border-btn">${border}</button>
        `
                        )
                        .join("")
                    : '<span class="country__no-borders">No border countries</span>'
                }
            </div>
          </div>
        </div>`;
  container.innerHTML = "";
  container.insertAdjacentHTML("beforeend", countryDetail);
}

backBtn.addEventListener("click", function (e) {
  window.history.back();
});
