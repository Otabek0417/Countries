const cardsContainer = document.querySelector(".cards-container");
const spinner = document.querySelector(".spinner");

const form = document.querySelector("#search-form");
const filterSelect = document.querySelector("#filterSelect");
// XML function
const api = "https://restcountries.com/v3.1/all";

if (JSON.parse(localStorage.getItem("mode"))) {
  document.body.classList.add("dark-mode");
} else {
  document.body.classList.remove("dark-mode");
}

function getData(url) {
  const request = new XMLHttpRequest();
  request.addEventListener("readystatechange", () => {
    if (request.readyState == 4 && request.status == 200) {
      console.log(JSON.parse(request.responseText));
      cardsContainer.innerHTML = "";
      spinner.classList.add("hidden");
      JSON.parse(request.responseText).forEach((item) => {
        Region(item);
      });
    }
  });

  request.open("GET", url);
  request.send();
}

getData(api);

// search function
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let query = form.countryName.value;
  console.log(query);
  getData(`https://restcountries.com/v3.1/name/${query}`);
});

// filter select
filterSelect.addEventListener("change", () => {
  let region = filterSelect.value;
  if (region === "all") {
    getData(`https://restcountries.com/v3.1/all`);
  } else {
    getData(`https://restcountries.com/v3.1/region/${region}`);
  }
});

// region function
function Region(obj) {
  const {
    name: { common },
    capital,
    flags: { svg },
    region,
    population,
    fifa,
  } = obj;
  const a = document.createElement("a");
  a.setAttribute("href", `detail.html?q=${fifa}`);
  a.innerHTML = `
  <div class = "card">
  <img src="${svg}" class="card-img" />
  <div class="card-body">
      <h5 class="card-title">${common}</h5>
      <p><b>Population: </b>${population}</p>
      <p><b>Region: </b>${region}</p>
      <p>
          <b>Capital:${capital ? capital : " No capital"} </b>
      </p>
  </div>
  </div>
  
  `;
  cardsContainer.appendChild(a);
}


