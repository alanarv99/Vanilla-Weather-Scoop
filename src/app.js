let apiKey = "260420cae416f4dteddo330fbd8c9c7b";
let city = "Portland";
let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

function showWeather(response) {
  let dataResponse = response.data;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = dataResponse.city;

  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = dataResponse.country;

  let date = new Date(dataResponse.time * 1000);
  let timeElement = document.querySelector("#time");

  function formatDate(date) {
    let hours = date.getHours();

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0$minutes`;
    }

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

    return `${day}, ${hours}:${minutes}`;
  }

  timeElement.innerHTML = formatDate(date);

  let temperature = dataResponse.temperature;
  let cToF = (temperature.current * 9) / 5 + 32;
  let feelsCToF = (temperature.feels_like * 9) / 5 + 32;

  let iconElement = document.querySelector("#todayIcon");
  iconElement.innerHTML = `<img src="${dataResponse.condition.icon_url}" class=""todayWeatherIcon alt="${dataResponse.condition.icon}">`;

  let temperatureFElement = document.querySelector("#todayTempF");
  temperatureFElement.innerHTML = Math.round(cToF);
  let temperatureCElement = document.querySelector("#todayTempC");
  temperatureCElement.innerHTML = Math.round(temperature.current);

  let todayFeelsLikeFElement = document.querySelector("#todayFeelsLikeF");
  todayFeelsLikeFElement.innerHTML = Math.round(feelsCToF);
  let todayFeelsLikeCElement = document.querySelector("#todayFeelsLikeC");
  todayFeelsLikeCElement.innerHTML = Math.round(temperature.feels_like);

  let humidityElement = document.querySelector("#todayHumidity");
  humidityElement.innerHTML = temperature.humidity;

  let windElement = document.querySelector("#todayWind");
  windElement.innerHTML = Math.round(dataResponse.wind.speed);
}

axios.get(url).then(showWeather);
