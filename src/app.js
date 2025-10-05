function showWeather(response) {
  let dataResponse = response.data;

  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let date = new Date(dataResponse.time * 1000);
  let timeElement = document.querySelector("#time");
  let temperature = dataResponse.temperature;
  let cToF = (temperature.current * 9) / 5 + 32;
  let feelsCToF = (temperature.feels_like * 9) / 5 + 32;
  let iconElement = document.querySelector("#todayWeatherIcon");
  let iconUrl = dataResponse.condition.icon_url;
  let temperatureFElement = document.querySelector("#todayTempF");
  let temperatureCElement = document.querySelector("#todayTempC");
  let todayFeelsLikeFElement = document.querySelector("#todayFeelsLikeF");
  let todayFeelsLikeCElement = document.querySelector("#todayFeelsLikeC");
  let humidityElement = document.querySelector("#todayHumidity");
  let windElement = document.querySelector("#todayWind");

  cityElement.innerHTML = dataResponse.city;
  countryElement.innerHTML = dataResponse.country;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${iconUrl}" class="todayWeatherIcon" />`;
  temperatureFElement.innerHTML = Math.round(cToF);
  temperatureCElement.innerHTML = Math.round(temperature.current);
  todayFeelsLikeFElement.innerHTML = Math.round(feelsCToF);
  todayFeelsLikeCElement.innerHTML = Math.round(temperature.feels_like);
  humidityElement.innerHTML = temperature.humidity;
  windElement.innerHTML = Math.round(dataResponse.wind.speed);
}

function formatDate(date) {
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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let dayOfMonth = date.getDate();
  let year = date.getFullYear();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day}, ${month} ${dayOfMonth}, ${year} at ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "260420cae416f4dteddo330fbd8c9c7b";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#searchInput");

  searchCity(searchInputElement.value);
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("New York");
