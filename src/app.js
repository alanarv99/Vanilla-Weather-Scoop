import axios from "axios";

let apiKey = "260420cae416f4dteddo330fbd8c9c7b";
let city = "New York";
let units = "metric";
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

function showWeather() {}

alert(axios.get(url).then(showWeather));
