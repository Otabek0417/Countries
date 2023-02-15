const cardsContainer = document.querySelector(".cards-container");
const spinner = document.querySelector(".spinner");
const toggle = document.querySelector(".dark-mode-btn");
const api = " https://restcountries.com/v3.1/all";
//
console.log(localStorage.getItem("mode"));

if (JSON.parse(localStorage.getItem("mode")) == true) {
  document.body.classList.add("dark-mode");
}
const request = new XMLHttpRequest();
request.addEventListener("readystatechange", () => {
  if (request.readyState == 4 && request.status == 200) {
    console.log(JSON.parse(request.responseText));
    spinner.classList.add("hidden");
    JSON.parse(request.responseText).forEach((item) => {
      Region(item);
    });
  }
});

request.open("GET", api);

request.send();

function Region(obj) {
  const {
    name: { common },
    capital,
    flags: { svg },
    region,
    population,
  } = obj;
  const div = document.createElement("div");

  div.classList.add("card");
  div.innerHTML = `
  <img src="${svg}" class="card-img" />
  <div class="card-body">
      <h5 class="card-title">${common}</h5>
      <p><b>Population: </b>${population}</p>
      <p><b>Region: </b>${region}</p>
      <p>
          <b>Capital:${capital} </b>
      </p>
  </div>
  `;
  cardsContainer.appendChild(div);
}

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  console.log(document.body.classList.contains("dark-mode"));
  localStorage.setItem("mode", document.body.classList.contains("dark-mode"));
  //   console.log();
});
