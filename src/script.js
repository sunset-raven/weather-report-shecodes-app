let currentPosition = document.querySelector("#current-position");
currentPosition.addEventListener("click", locateCurrentPosition);

let units = "metric";
let apiKey = "2ce2b223dde112d0e1db1a6bf0973e96";

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

function apiCitySearch(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#weather-description");
  let icon = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp; 
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;
  weatherDescription.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showCurrentLocalTemp(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector("h1");
  let windSpeed = document.querySelector("#wind-speed");
  let humidity = document.querySelector("#humidity");
  let weatherDescription = document.querySelector("#weather-description");
  let icon = document.querySelector("#icon");
  celsiusTemperature = response.data.main.temp;
  city.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = response.data.wind.speed;
  humidity.innerHTML = response.data.main.humidity;
  weatherDescription.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function locateCurrentPosition(event) {
  event.preventDefault();
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;

      axios
        .get(`${apiUrl}&appid=${apiKey}&units=${units}`)
        .then(showCurrentLocalTemp);
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

function changeToFar(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  let newTemperature = celsiusTemperature * 1.8 + 32;
  temperature.innerHTML = Math.round(newTemperature);
  clickFar.classList.add("active");
  clickCel.classList.remove("active");
}

let clickFar = document.querySelector("#submit-button-far1");
clickFar.addEventListener("click", changeToFar);

function changeToCel(event) {
  event.preventDefault();
  let temperature = document.querySelector("#current-temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
  clickCel.classList.add("active");
  clickFar.classList.remove("active");
}

let clickCel = document.querySelector("#submit-button-cel1");
clickCel.addEventListener("click", changeToCel);
