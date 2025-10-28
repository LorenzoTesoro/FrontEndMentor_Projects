let country = JSON.parse(localStorage.getItem("selectedCountry"));
let countryBorders = JSON.parse(localStorage.getItem("borders"));
const container = document.querySelector(".main .countries");
const backBtn = document.querySelector(".go-back button");

populateCountryDetail();

backBtn.addEventListener("click", function (e) {
  window.history.back();
});
document.addEventListener("click", async function (e) {
  const borderBtn = e.target.closest(".country__border-btn");
  if (borderBtn) {
    const countryName = borderBtn.dataset.name;
    const data = await getCountry(countryName);
    if (data) {
      country = data;

      if (data.borders && data.borders.length > 0) {
        countryBorders = await getCountryBorders(data.borders);
      } else {
        countryBorders = null;
      }

      localStorage.setItem("selectedCountry", JSON.stringify(country));
      localStorage.setItem("borders", JSON.stringify(countryBorders));

      populateCountryDetail();
    }
  }
});

function drawCountryDetail(country, borders) {
  if (!country) return;
  const countryDetail = `
        <div class="country" data-name="Afghan">
          <div class="country__flag">
            <img
              src="${country.flags.svg}"
              alt=""
              class="country__flag-img"
            />
          </div>
          <div class="country__info-wrapper">
          <div class="country__info">
            <h2 class="country__name">${country.name.common}</h2>
          </div>
          <div class="country__info">
            <div class="country__details">
              <p class="country__detail">
                <span class="country__detail-label">Native Name:</span>
                <span class="country__detail-value">${
                  country.name.official
                }</span>
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
                <span class="country__detail-label">Currencies:</span>
                <span class="country__detail-value">${Object.values(
                  country.currencies || {}
                )
                  .map((curr) => `${curr.name} (${curr.symbol})`)
                  .join(", ")}</span>
              </p>
              <p class="country__detail">
                <span class="country__detail-label">Languages:</span>
                <span class="country__detail-value">${
                  Object.keys(country.languages)[0]
                }</span>
              </p>
            </div>
          </div>
          <div class="country__info">
            <h3 class="country__borders">Border Countries:</h3>
            <div class="country__borders-list">
                ${
                  borders
                    ? borders
                        .map(
                          (border) => `
          <button class="country__border-btn" data-name="${border.name.common}">${border.name.common}</button>
        `
                        )
                        .join("")
                    : '<span class="country__no-borders">No border countries</span>'
                }
            </div>
          </div>
          </div>
        </div>`;
  return countryDetail;
}
function populateCountryDetail() {
  container.innerHTML = "";
  const countryEl = drawCountryDetail(country, countryBorders);
  container.insertAdjacentHTML("beforeend", countryEl);
}
async function getCountry(countryName) {
  try {
    const url =
      "https://restcountries.com/v3.1/name/" + countryName + "?fullText=true";
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Country not found: ${response.status}`);

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
}
async function getCountryBorders(borderCodes) {
  try {
    const codes = borderCodes.join(",");
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${codes}`
    );

    if (!response.ok) {
      throw new Error("Error fetching borders");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching borders:", error);
    return null;
  }
}
