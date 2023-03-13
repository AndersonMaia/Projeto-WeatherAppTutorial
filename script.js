const api = {
  key: "024aa483e6a916a32ff0ea962181a68b",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".search-box");
searchbox.addEventListener("keypress", setQuery);

function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let hiLow = document.querySelector(".current .hi-low");
  hiLow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(
    weather.main.temp_max
  )}°C`;

  let weatherEl = document.querySelector(".current .weather");
  weatherEl.innerText = weather.weather[0].main;

  let currentWeather = weatherEl.innerText;

  switch (currentWeather) {
    case "Clouds":
      document.body.style.backgroundImage = "url(imgs/cloudyBG.png)";
      weatherEl.innerText = "Nublado";
      break;
    case "Clear":
      document.body.style.backgroundImage = "url(imgs/sunnyBG.png)";
      weatherEl.innerText = "Ensolarado";
      break;
    case "Rain":
      document.body.style.backgroundImage = "url(imgs/rainyBG.png)";
      weatherEl.innerText = "Chuvoso";
      break;
    case "Thunderstorm":
      document.body.style.backgroundImage = "url(imgs/stormyBG.png)";
      weatherEl.innerText = "Tempestade";
      break;
    case "Drizzle":
      document.body.style.backgroundImage = "url(imgs/rainyBG.png)";
      weatherEl.innerText = "Chuvoso";
      break;
    case "Snow":
      document.body.style.backgroundImage = "url(imgs/snowyBG.png)";
      weatherEl.innerText = "Nevando";
      break;
    default:
      document.body.style.backgroundImage = "url(imgs/stormyBG.png)";
      weatherEl.innerText = "Tempestade";
  }
}

function dateBuilder(d) {
  let months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  let days = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
