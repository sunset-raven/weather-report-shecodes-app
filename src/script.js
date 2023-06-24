let currentPosition = document.querySelector("#current-position");
currentPosition.addEventListener("click", locateCurrentPosition);

let units = "metric";
let apiKey = "9db3t643621b51990bco3eac83a0cf5a";

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchingCity);

let celsiusTemperature = null;

function searchingCity(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let inputCity = document.querySelector("#input-city");
  inputCity.value = inputCity.value.trim().toLowerCase();
  city.innerHTML = inputCity.value;
  apiCitySearch(inputCity.value);
  inputCity.value = "";
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return day;
}

function showForecastTemp(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-card");
  let dayCount = null;

  let forecastHTML = `<div class="row g-0 justify-content-center">`;
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 text-center">
          <span id="forecast-day">${formatDay(day.time)}</span>
          <br />
          <img
            src="${day.condition.icon_url}"
            alt="${day.condition.description}"
            id="forecast-img"
          />
          <br />
          <span id="forecast-temp-max">${Math.round(
            day.temperature.maximum
          )}°C</span>
          <span id="forecast-temp-min">${Math.round(
            day.temperature.minimum
          )}°C</span>
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showForecastLocalTemp(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-card");
  let dayCount = null;

  let forecastHTML = `<div class="row g-0 justify-content-center">`;
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 text-center">
          <span id="forecast-day">${formatDay(day.time)}</span>
          <br />
          <img
            src="${day.condition.icon_url}"
            alt="${day.condition.description}"
            id="forecast-img"
          />
          <br />
          <span id="forecast-temp-max">${Math.round(
            day.temperature.maximum
          )}°C</span>
          <span id="forecast-temp-min">${Math.round(
            day.temperature.minimum
          )}°C</span>
        </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function apiCitySearch(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(forecastApiUrl).then(showForecastTemp);
  axios.get(apiUrl).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#weather-description");
  let icon = document.querySelector("#icon");
  celsiusTemperature = response.data.temperature.current;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  windSpeed.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.temperature.humidity;
  weatherDescription.innerHTML = response.data.condition.description;
  icon.setAttribute("src", `${response.data.condition.icon_url}`);
}

function showCurrentLocalTemp(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector("h1");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#weather-description");
  let icon = document.querySelector("#icon");
  celsiusTemperature = response.data.temperature.current;
  city.innerHTML = response.data.city;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  windSpeed.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.temperature.humidity;
  weatherDescription.innerHTML = response.data.condition.description;
  icon.setAttribute("src", `${response.data.condition.icon_url}`);
}

function locateCurrentPosition(event) {
  event.preventDefault();
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
      let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${latitude}&lon=${longitude}&key=${apiKey}`;

      axios.get(`${forecastApiUrl}`).then(showForecastLocalTemp);
      axios.get(`${apiUrl}`).then(showCurrentLocalTemp);
    });
  } else {
    console.error("Error getting user location:", error);
  }
}

function showDate() {
  let date = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }

  let currentDate = document.querySelector("#current-date");
  return (currentDate.innerHTML = `Today is ${day}, ${hour}:${minute}.`);
}

showDate();

function displayForecast() {
  let forecast = document.querySelector("#forecast-card");

  let forecastHTML = `<div class="row g-0 justify-content-center">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2 text-center">
          <span id="forecast-day">${day}</span>
          <br />
          <img
            src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
            alt=""
            id="forecast-img"
          />
          <br />
          <span id="forecast-temp-max">Max</span>
          <span id="forecast-temp-min">Min</span>
        </div>
      `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

displayForecast();
