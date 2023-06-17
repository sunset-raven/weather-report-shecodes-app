function showCurrentTemp(response) {
  console.log(response);
  let currentTemperature = document.querySelector("#current-temperature");
  let iconElement = document.querySelector("#icon");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function apiCitySearch(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

// function handleCurrentPosition(position) {}

function logCurrentTemp(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector("h1");
  let icon = document.querySelector("#icon");
  city.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
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
        .then(logCurrentTemp);
    });
  } else {
    console.error("Error getting user location:", error);
  }
}

let currentPosition = document.querySelector("#current-position");
currentPosition.addEventListener("click", locateCurrentPosition);

let units = "metric";
let apiKey = "2ce2b223dde112d0e1db1a6bf0973e96";

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

function searchingCity(event) {
  event.preventDefault();
  let city = document.querySelector("h1");
  let inputCity = document.querySelector("#input-city");
  inputCity.value = inputCity.value.trim().toLowerCase();
  city.innerHTML = inputCity.value;
  apiCitySearch(inputCity.value);
  inputCity.value = "";
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", searchingCity);

// function changeToFar(event) {
//   event.preventDefault();
//   let change = document.querySelector("#current-temperature");
//   let temperature = document.querySelector("#current-temperature").innerHTML;
//   temperature = +temperature;
//   let newTemperature = temperature * 1.8 + 32;
//   change.innerHTML = Math.round(newTemperature);
//   clickFar.disabled = true;
// }

// let clickFar = document.querySelector("#submit-button-far1");
// clickFar.addEventListener("click", changeToFar);

// function changeToCel(event) {
//   event.preventDefault();
//   let temperature = document.querySelector("#current-temperature");
//   temperature.innerHTML = 28;
//   clickFar.disabled = false;
// }

// let clickCel = document.querySelector("#submit-button-cel1");
// clickCel.addEventListener("click", changeToCel);
