let currentTimeApp = document.querySelector("#time");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
currentTimeApp.innerHTML = `${hours}:${minutes}`;

let currentDateApp = document.querySelector("#currentDate");

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let dayIndex = currentTime.getDay();
let currentMonth = months[currentTime.getMonth()];
let currentDate = currentTime.getDate();
currentDateApp.innerHTML = `${days[dayIndex]} ${currentMonth} ${currentDate}`;

function search(city) {
  let apiKey = "70b07e42ffc1c269025339e21e7eedec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response.data.name);
  document.querySelector(`#city`).innerHTML = response.data.name;
  document.querySelector(`#temperature`).innerHTML = Math.round(
    response.data.main.temp
  );

  celsiusTemperature = response.data.main.temp;
  
  document.querySelector(`#humidity`).innerHTML = response.data.main.humidity;
  document.querySelector(`#wind`).innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(`#description`).innerHTML =
    response.data.weather[0].main;
    let iconElement=document.querySelector(`#icon`);
    iconElement.setAttribute(`src`,`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)

}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}

let celsiusTemperature=null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchCurrentLocation(position) {
  let apiKey = "70b07e42ffc1c269025339e21e7eedec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLocationButton = document.querySelector(`#clButtonId`);
currentLocationButton.addEventListener("click", getCurrentLocation);
search("Amsterdam");

function showWeatherNewYork(event) {
  let apiKey = "70b07e42ffc1c269025339e21e7eedec";
  let city = `New York`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}
&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
let weatherNewYork = document.querySelector(`#newYork`);
weatherNewYork.addEventListener("click", showWeatherNewYork);

function showWeatherLondon(event) {
  let apiKey = "70b07e42ffc1c269025339e21e7eedec";
  let city = `London`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}
&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let weatherLondon = document.querySelector(`#london`);
weatherLondon.addEventListener("click", showWeatherLondon);

function showWeatherBangkok(event) {
  let apiKey = "70b07e42ffc1c269025339e21e7eedec";
  let city = `Bangkok`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}
&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let weatherBangkok = document.querySelector(`#bangkok`);
weatherBangkok.addEventListener("click", showWeatherBangkok);

function displayFahrenheitTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector(`#temperature`)
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature=(celsiusTemperature*9)/5+32;
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

function displayCelsiusTemp(event){
  event.preventDefault();
  let temperatureElement=document.querySelector(`#temperature`)
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}
let fahrenheitLink=document.querySelector(`#fahrenheit-link`)
fahrenheitLink.addEventListener(`click`,displayFahrenheitTemp);

let celsiusLink=document.querySelector(`#celsius-link`)
celsiusLink.addEventListener(`click`,displayCelsiusTemp);
