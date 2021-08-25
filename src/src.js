function currentDate(dateInfo) {
  let date = dateInfo.getDate();

  let weekDays = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let day = weekDays[dateInfo.getDay()];

  let hours = dateInfo.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = dateInfo.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${hours}:${minutes}`;
}

let now = new Date();
let todayDate = document.querySelector(".today-date");
todayDate.innerHTML = currentDate(now);

function showCurrentTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let todayCelsius = document.querySelector("#today-celsius");
  todayCelsius.innerHTML = `${currentTemp}°C`;
  let currentFahrenheit = Math.round((currentTemp * 9) / 5 + 32);
  let todayFahrenheit = document.querySelector("#today-fahrenheit");
  todayFahrenheit.innerHTML = `${currentFahrenheit}°F`;
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#today-description");
  description.innerHTML = `${weatherDescription}`;
  let cityDisplay = document.querySelector("#city-name");
  let cityName = response.data.name;
  cityDisplay.innerHTML = cityName;
}
function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = document.querySelector("#city-name");
  city.innerHTML = `${cityInput.value}`;
  let apiKey = `f9898d0a6fe4e5b3cd4f83deb5f888c1`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentTemp);
}

let form = document.querySelector("#form-input");
form.addEventListener("submit", searchCity);

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `f9898d0a6fe4e5b3cd4f83deb5f888c1`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentTemp);
}

function findLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", findLocation);
