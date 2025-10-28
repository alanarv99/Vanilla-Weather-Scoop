function showWeather(response) {
  let dataResponse = response.data;

  let cityElement = document.querySelector("#city");
  let countryElement = document.querySelector("#country");
  let date = new Date(dataResponse.time * 1000);
  let timeElement = document.querySelector("#time");
  let temp = dataResponse.temperature.current;
  let feelLikeTemp = dataResponse.temperature.feels_like;
  let cToF = (temp * 9) / 5 + 32;
  let feelsCToF = (feelLikeTemp * 9) / 5 + 32;
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
  temperatureCElement.innerHTML = Math.round(temp);
  todayFeelsLikeFElement.innerHTML = Math.round(feelsCToF);
  todayFeelsLikeCElement.innerHTML = Math.round(feelLikeTemp);
  humidityElement.innerHTML = dataResponse.temperature.humidity;
  windElement.innerHTML = Math.round(dataResponse.wind.speed);

  showForecast(dataResponse.city);
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
  searchInputElement.addEventListener(
    "submit",
    searchCity(searchInputElement.value)
  );
}

function formatForecastDay(timestamp) {
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
  return days[date.getDay()];
}
function searchForecastCity(city) {
  let apiKey = "260420cae416f4dteddo330fbd8c9c7b";
  let url = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(url).then(showForecast);
}

function showForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    let maxTemp = day.temperature.maximum;
    let minTemp = day.temperature.minimum;
    let maxCToF = Math.round((maxTemp * 9) / 5 + 32);
    let minCToF = Math.round((minTemp * 9) / 5 + 32);
    let forecastdisplay = `${maxCToF}°F | ${minCToF}°F`;

    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="forecastInfo"> <div class="row forecastDay">${formatForecastDay(
          day.time
        )}</div>
                  <div class="row forecastIcon">
                  <img class="forecastIcon" src="${day.condition.icon_url}" />
                  </div>
                  <div class="row minMax">
                    ${forecastdisplay}
                    </div>
                    </div>
                    `;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function showPosition(position) {
  let apiKey = "260420cae416f4dteddo330fbd8c9c7b";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#currentLocation");
currentButton.addEventListener("click", getPosition);

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("New York");
searchForecastCity("New York");
