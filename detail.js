const siteTitle = document.querySelector("title");
const countryImg = document.querySelector(".country-img");
const introTitle = document.querySelector(".intro-title");
const nativeName = document.querySelector(".native-name");
const CountryPopulation = document.querySelector(".population");
const CountryRegion = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capitalCountry = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currency = document.querySelector(".currency");
const language = document.querySelector(".language");
const darkModeBtn = document.querySelector(".dark-mode-btn");
const btnImg = document.querySelector(".btn-img");

const searchParams = window.location.search;
const countryName = new URLSearchParams(searchParams).get("q");

console.log(countryName);

function getData(url) {
  const request = new XMLHttpRequest();
  request.addEventListener("readystatechange", () => {
    if (request.readyState == 4 && request.status == 200) {
      console.log(JSON.parse(request.responseText));
      showData(JSON.parse(request.responseText));
    }
  });

  request.open("GET", url);
  request.send();
}

getData(`https://restcountries.com/v3.1/alpha/${countryName}`);

function showData(country) {
  const {
    name,
    flags,
    population,
    region,
    capital,
    subregion,
    tld,
    currencies,
    languages,
    borders,
  } = country[0];
  siteTitle.textContent = name.common;
  countryImg.src = flags.svg;
  introTitle.textContent = name.common;
  nativeName.textContent = name.official;
  CountryPopulation.textContent = population;
  CountryRegion.textContent = region;
  subRegion.textContent = subregion;
  capitalCountry.textContent = capital ? capital : "No capital";
  domain.textContent = tld;
  currency.textContent = Object.keys(currencies);
  language.textContent = Object.values(languages);

  if (borders) {
    const bordersCountries = borders;
    const ul = document.createElement("ul");
    ul.classList.add("border-countries");
    ul.innerHTML += `
        <li>Border Countries:</li>
    `;

    bordersCountries.forEach((borderCountry) => {
      const li = document.createElement("li");
      li.innerHTML += `
      <a href="detail.html?q=${borderCountry}" class="border-country">${borderCountry}</a>
      `;
      ul.appendChild(li);
    });
    document.querySelector(".intro-content").appendChild(ul);
  }
}
